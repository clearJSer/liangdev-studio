/**
 * 定义 Mini Codex 运行时事件，供 CLI、trace 写入器和未来 eval 工具共用。
 */

/** 第一版 Mini Codex CLI 会话会发出的事件名称。 */
export type AgentEventType =
  | "session_started"
  | "user_message"
  | "assistant_message"
  | "session_ended";

/** 每条 trace 事件都会携带的公共元数据。 */
export type AgentEventBase = {
  readonly type: AgentEventType;
  readonly runId: string;
  readonly timestamp: string;
};

/** Mini Codex 会话启动时写入的事件。 */
export type SessionStartedEvent = AgentEventBase & {
  readonly type: "session_started";
  readonly repoPath: string;
};

/** 用户在交互会话里输入一条消息时写入的事件。 */
export type UserMessageEvent = AgentEventBase & {
  readonly type: "user_message";
  readonly content: string;
};

/** Mini Codex 给用户返回响应时写入的事件。 */
export type AssistantMessageEvent = AgentEventBase & {
  readonly type: "assistant_message";
  readonly content: string;
};

/** 交互会话退出时写入的事件。 */
export type SessionEndedEvent = AgentEventBase & {
  readonly type: "session_ended";
  readonly reason: "user_exit" | "input_closed";
};

/** 最终持久化到 JSONL trace 文件中的结构化事件。 */
export type AgentEvent =
  | SessionStartedEvent
  | UserMessageEvent
  | AssistantMessageEvent
  | SessionEndedEvent;

/** 创建事件时的输入；runId 和 timestamp 由统一入口补齐。 */
export type CreateEventInput =
  | Omit<SessionStartedEvent, "runId" | "timestamp">
  | Omit<UserMessageEvent, "runId" | "timestamp">
  | Omit<AssistantMessageEvent, "runId" | "timestamp">
  | Omit<SessionEndedEvent, "runId" | "timestamp">;

/**
 * 创建一条带有统一运行元数据的 trace 事件。
 *
 * @param runId - 当前 Mini Codex 运行的唯一标识。
 * @param input - 不包含公共元数据的事件业务字段。
 * @returns 可以直接写入 trace 文件的完整事件。
 */
export function createAgentEvent(
  runId: string,
  input: CreateEventInput,
): AgentEvent {
  return {
    ...input,
    runId,
    timestamp: new Date().toISOString(),
  };
}
