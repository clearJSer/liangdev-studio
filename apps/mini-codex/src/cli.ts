#!/usr/bin/env node
/**
 * 启动 Mini Codex 交互式 CLI，并默认把当前目录作为目标仓库。
 */

import { createInterface } from "node:readline";
import { stdin as input, stdout as output } from "node:process";

import {
  type TraceWriter,
  createAgentEvent,
  createRunId,
  createTraceWriter,
  resolveWorkspace,
} from "@repo/agent-core";

/** 第一版 CLI 支持的命令行参数解析结果。 */
type CliOptions = {
  readonly repoPath: string;
};

/** 处理一行用户输入后的控制结果。 */
type UserMessageResult = "continue" | "exit";

/**
 * 解析第一版 Mini Codex CLI 需要的最小参数。
 *
 * 日常使用路径要尽量简单：在目标仓库里执行 `mini-codex`。
 * `--repo` 主要用于 fixture 调试和后续 benchmark 自动化。
 *
 * @param argv - 去掉 Node 可执行文件和脚本路径后的原始命令行参数。
 * @returns 本次会话要使用的目标仓库路径。
 */
function parseCliOptions(argv: readonly string[]): CliOptions {
  const normalizedArgv = argv.filter((value) => value !== "--");
  const repoFlagIndex = normalizedArgv.indexOf("--repo");
  const repoFlagValue =
    repoFlagIndex >= 0 ? normalizedArgv[repoFlagIndex + 1] : undefined;
  const repoPath = repoFlagValue ?? process.cwd();

  return { repoPath };
}

/**
 * 判断用户输入是否表示要结束交互会话。
 *
 * @param message - 用户在提示符里输入的原始文本。
 * @returns 如果 CLI 应该正常退出，则返回 true。
 */
function isExitMessage(message: string): boolean {
  const normalized = message.trim().toLowerCase();

  return normalized === "exit" || normalized === "quit";
}

/**
 * 处理一条用户消息，并写入对应的 trace 事件。
 *
 * 第一个里程碑故意保持得很小。后续这里会把消息交给 LangGraph；
 * 现在它只负责验证 CLI 会话和 trace 管线已经跑通。
 *
 * @param message - 用户输入的任务文本。
 * @param runId - 当前运行的 runId，用于关联同一次 trace。
 * @param traceWriter - 当前 JSONL trace 文件的写入器。
 * @returns 外层会话循环应该继续还是退出。
 */
async function handleUserMessage(
  message: string,
  runId: string,
  traceWriter: TraceWriter,
): Promise<UserMessageResult> {
  if (isExitMessage(message)) {
    await traceWriter.writeEvent(
      createAgentEvent(runId, {
        type: "session_ended",
        reason: "user_exit",
      }),
    );

    return "exit";
  }

  if (message.trim().length === 0) {
    return "continue";
  }

  await traceWriter.writeEvent(
    createAgentEvent(runId, {
      type: "user_message",
      content: message,
    }),
  );

  const response =
    "收到任务。当前版本先记录会话和 trace，下一步会接入只读工具。";

  console.log(response);
  console.log(`trace: ${traceWriter.tracePath}`);

  await traceWriter.writeEvent(
    createAgentEvent(runId, {
      type: "assistant_message",
      content: response,
    }),
  );

  return "continue";
}

/**
 * 当用户没有显式输入 exit，但输入流已经关闭时，补写会话结束事件。
 *
 * @param didWriteEndEvent - 其他路径是否已经写过会话结束事件。
 * @param runId - 当前运行的 runId，用于关联同一次 trace。
 * @param traceWriter - 当前 JSONL trace 文件的写入器。
 */
async function writeInputClosedEvent(
  didWriteEndEvent: boolean,
  runId: string,
  traceWriter: TraceWriter,
): Promise<void> {
  if (didWriteEndEvent) {
    return;
  }

  await traceWriter.writeEvent(
    createAgentEvent(runId, {
      type: "session_ended",
      reason: "input_closed",
    }),
  );
}

/**
 * 读取非交互场景下通过管道传入的全部 stdin 内容。
 *
 * 正常产品形态是 TTY readline 交互会话。这个辅助函数让 CLI 可以用
 * shell 管道做自动化验证，而不依赖 readline 提示符的时序。
 *
 * @returns 按 UTF-8 解码后的完整 stdin 文本。
 */
async function readPipedInput(): Promise<string> {
  const chunks: Buffer[] = [];

  for await (const chunk of input) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks).toString("utf8");
}

/**
 * 运行第一版 Mini Codex 交互式外壳。
 *
 * 这个里程碑故意停在模型调用之前。它先验证产品形态：
 * 当前目录作为目标仓库、会话循环、runId，以及 trace 持久化。
 * 后续 LangGraph 节点会继续往同一条 trace 流里追加更丰富的事件。
 *
 * @param argv - 去掉 Node 可执行文件和脚本路径后的原始命令行参数。
 */
async function runCli(argv: readonly string[]): Promise<void> {
  const options = parseCliOptions(argv);
  const workspace = await resolveWorkspace(options.repoPath);
  const runId = createRunId();
  const traceWriter = await createTraceWriter({ runId });

  console.log("Mini Codex");
  console.log(`repo: ${workspace.repoPath}`);
  console.log(`run: ${runId}`);
  console.log("Type a task, or type exit to quit.");
  console.log("");

  await traceWriter.writeEvent(
    createAgentEvent(runId, {
      type: "session_started",
      repoPath: workspace.repoPath,
    }),
  );

  let didWriteEndEvent = false;

  if (!input.isTTY) {
    const pipedInput = await readPipedInput();

    try {
      for (const message of pipedInput.split(/\r?\n/)) {
        const result = await handleUserMessage(message, runId, traceWriter);

        if (result === "exit") {
          didWriteEndEvent = true;
          break;
        }
      }

      await writeInputClosedEvent(didWriteEndEvent, runId, traceWriter);
    } finally {
      console.log("");
      console.log(`Trace saved: ${traceWriter.tracePath}`);
    }

    return;
  }

  const reader = createInterface({ input, output, prompt: "> " });

  try {
    reader.prompt();

    for await (const message of reader) {
      const result = await handleUserMessage(message, runId, traceWriter);

      if (result === "exit") {
        didWriteEndEvent = true;
        break;
      }

      reader.prompt();
    }

    await writeInputClosedEvent(didWriteEndEvent, runId, traceWriter);
  } finally {
    reader.close();
    console.log("");
    console.log(`Trace saved: ${traceWriter.tracePath}`);
  }
}

runCli(process.argv.slice(2)).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);

  console.error(`Mini Codex failed: ${message}`);
  process.exitCode = 1;
});
