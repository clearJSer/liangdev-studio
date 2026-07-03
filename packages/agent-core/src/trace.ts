/**
 * 提供本地 JSONL trace 能力，让 Mini Codex 不依赖外部观测服务也能记录运行过程。
 */

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

import type { AgentEvent } from "./events.js";

/** 负责把结构化事件追加写入某一次运行 trace 的写入器。 */
export type TraceWriter = {
  readonly runId: string;
  readonly runDir: string;
  readonly tracePath: string;
  writeEvent: (event: AgentEvent) => Promise<void>;
};

/** 创建 trace 写入器时需要的配置。 */
export type CreateTraceWriterOptions = {
  readonly runId: string;
  readonly baseDir?: string;
};

/**
 * 创建一个包含时间戳的 runId，便于在文件系统里按时间排查运行记录。
 *
 * @returns 类似 `20260703T143500-a1b2c3d4` 的紧凑运行标识。
 */
export function createRunId(): string {
  const timestamp = new Date()
    .toISOString()
    .replaceAll("-", "")
    .replaceAll(":", "")
    .replace(/\.\d{3}Z$/, "");
  const suffix = randomUUID().slice(0, 8);

  return `${timestamp}-${suffix}`;
}

/**
 * 获取默认 trace 根目录；该目录位于用户目录下，不放进目标仓库。
 *
 * @returns 默认存放 Mini Codex 运行记录的用户级目录。
 */
export function getDefaultTraceBaseDir(): string {
  return join(homedir(), ".mini-codex", "runs");
}

/**
 * 为一次 Mini Codex 运行创建 JSONL trace 写入器。
 *
 * trace 文件刻意放在目标仓库外面。这样 Agent 可以读取或修改用户项目，
 * 但不会把自己的观测日志留在用户项目目录里。
 *
 * @param options - runId 和可选的 trace 根目录。
 * @returns 一个按行追加 JSON 对象的 trace 写入器。
 */
export async function createTraceWriter(
  options: CreateTraceWriterOptions,
): Promise<TraceWriter> {
  const baseDir = options.baseDir ?? getDefaultTraceBaseDir();
  const runDir = join(baseDir, options.runId);
  const tracePath = join(runDir, "trace.jsonl");

  await mkdir(runDir, { recursive: true });

  return {
    runId: options.runId,
    runDir,
    tracePath,
    writeEvent: async (event: AgentEvent): Promise<void> => {
      await writeFile(tracePath, `${JSON.stringify(event)}\n`, {
        flag: "a",
      });
    },
  };
}
