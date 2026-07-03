/**
 * 解析并校验 Mini Codex 当前要操作的目标仓库路径。
 */

import { realpath } from "node:fs/promises";
import { resolve } from "node:path";

/** CLI 会话解析目标仓库后的上下文。 */
export type WorkspaceContext = {
  readonly repoPath: string;
};

/**
 * 把目标仓库路径解析成稳定的真实路径。
 *
 * @param candidatePath - CLI 传入的候选路径，通常是当前工作目录。
 * @returns 后续工具和 trace 事件都会使用的工作区上下文。
 */
export async function resolveWorkspace(
  candidatePath: string,
): Promise<WorkspaceContext> {
  const repoPath = await realpath(resolve(candidatePath));

  return { repoPath };
}
