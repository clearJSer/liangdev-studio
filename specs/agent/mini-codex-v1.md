# Mini Codex v1 精简技术方案

> 状态：技术方案讨论中。
> 目标：先跑通一个低成本、本地 CLI、面向外部目标仓库的 Mini Codex 编程 Agent 闭环。

---

## 1. 目标

做 YiForge Studio 第一个 Agent：Mini Codex，一个本地命令行编程 Agent。

v1 只要求它能在一个外部目标仓库里完成最小闭环。目标仓库不放在本项目源码内，而是在任意目录下打开后启动 CLI，使用方式类似在当前命令行运行 Claude Code。

1. 接收自然语言任务。
2. 搜索和读取目标仓库代码。
3. 生成修改计划。
4. 请求用户确认后编辑文件。
5. 请求用户确认后运行命令。
6. 根据测试或类型检查结果继续修复。
7. 输出总结，并保存 trace。

v1 的学习重点不是模型效果，而是编程 Agent 的基础架构：模型决策、工具调用、权限确认、上下文组织、trace、失败恢复。

---

## 2. 不做什么

- 不默认修改当前真实工作室仓库；v1 建议先在任意目录下准备一个可丢弃的练习仓库作为目标仓库。
- 不接 Claude Code 技术栈和 Claude 专属工具。
- 不做多 Agent。
- 不做 RAG、长期 Memory、MCP、网页回放。
- 不做 Docker 沙箱。
- 不追求一次性达到真实生产 Coding Agent 的效果。

---

## 3. 推荐技术栈

### 语言与工程

- TypeScript。
- pnpm workspace。
- Turborepo 纳管 `build`、`lint`、`check-types`。

### 模型 SDK

v1 使用 OpenAI-compatible API 作为统一模型入口：

- 默认模型：智谱 Z.AI `GLM-4.7-Flash`。
- 对照模型：DeepSeek `deepseek-v4-flash`。
- 接入方式：通过 LangChain / LangGraph 兼容的 OpenAI Chat Model 配置 `baseURL`、`apiKey`、`model`。
- 原因：智谱免费模型适合高频跑通流程；DeepSeek 适合在同一套 Agent 架构下做 coding 能力对照。

### Agent 框架

v1 固定使用 LangGraph 作为 Agent 编排框架。

使用边界：

- 使用 LangGraph 表达 Agent 状态、节点、边、循环和停止条件。
- 使用 LangChain 的 model / tool / schema 抽象，承接 LangGraph 生态。
- 不直接使用 LangChain `createAgent` 托管整个 Mini Codex。
- 关键节点仍显式写在代码里，方便学习和调试：计划、工具选择、权限确认、工具执行、结果回填、完成判断。
- trace 先自己落 JSONL；后续再考虑接 LangSmith。

---

## 4. 目录结构

```txt
packages/agent-core/
  src/
    events.ts          # AgentEvent 类型，供 CLI、trace、eval 共用
    graph.ts           # LangGraph 状态图定义
    state.ts           # AgentState 类型与状态更新规则
    model.ts           # 模型适配层，隐藏具体 provider
    permissions.ts     # 写文件、跑命令前的用户确认
    trace.ts           # JSONL trace 写入
    workspace.ts       # 限定目标仓库根目录，防止越界
    tools/
      index.ts         # 工具注册表
      list-files.ts    # 列文件
      search.ts        # 搜索文本
      read-file.ts     # 读取文件
      edit-file.ts     # 修改文件
      run-command.ts   # 运行命令

apps/mini-codex/
  src/
    cli.ts             # CLI 入口，默认以当前工作目录作为目标仓库并进入交互会话
  fixtures/
    ts-bugs/           # 开发期可丢弃练习仓库
  tasks/
    ts-bugs.json       # benchmark 任务清单，不包含目标仓库源码
```

---

## 5. CLI 交互形态

v1 的默认使用方式是交互式会话，而不是每次任务都执行一条完整命令。

```bash
cd ~/code/some-project
mini-codex
```

启动后进入对话模式：

```txt
Mini Codex
repo: /Users/me/code/some-project

> 修复当前项目里的 TypeScript 类型错误
```

默认规则：

- 启动目录就是目标仓库。
- 会话内可以连续输入多个任务。
- 每个任务共享当前会话的目标仓库上下文。
- 写文件、运行命令时在会话内询问用户确认。
- `--repo <path>` 只作为调试和 benchmark 的高级参数，不是日常主入口。

---

## 6. 核心流程

```txt
启动 CLI
  -> 解析目标仓库根目录，默认使用当前工作目录
  -> 初始化目标仓库上下文
  -> 进入交互式会话
用户输入任务
  -> 进入 LangGraph 状态图
  -> planner 节点生成下一步计划
  -> model 节点选择工具或输出最终答案
  -> 执行只读工具，直接返回结果
  -> 如需写文件，先询问用户
  -> 如需跑命令，先询问用户
  -> 把工具结果放回上下文
  -> LangGraph 根据状态决定继续循环或结束
```

循环边界：

- `maxSteps` 默认 12。
- `maxToolCalls` 默认 40。
- `maxCommandMs` 默认 30 秒。
- 只能访问目标仓库目录。
- 命令只允许在目标仓库内运行。

---

## 7. 权限策略

默认使用严格交互模式：

- 读文件：自动允许。
- 搜索文件：自动允许。
- 写文件：每次询问用户。
- 运行命令：每次询问用户。
- 安装依赖：每次询问用户，并在 v1 默认不推荐。

后续可以增加：

- `--auto-read`：默认模式，本来就自动读。
- `--auto-write`：benchmark 时自动写。
- `--auto-command`：benchmark 时自动运行测试命令。

---

## 8. 目标仓库与验收

v1 先由用户准备一个可丢弃的 TypeScript 练习仓库，例如本工程内的 `apps/mini-codex/fixtures/ts-bugs`。Mini Codex CLI 可以在该目录下启动；真实使用时也可以在任意外部仓库目录下启动。

benchmark 任务清单只记录任务描述和验证命令，不把练习仓库源码放进本项目。

1. 修复 TypeScript 类型错误。
2. 修复一个单元测试失败。
3. 根据 lint 或 check-types 输出修改代码。

验收标准：

- CLI 可以在目标仓库目录下启动交互会话，并接收任务驱动完整循环。
- 至少 1 个练习仓库任务能自动修复并通过验证命令。
- 每次写文件和跑命令前都会询问用户。
- trace 会保存完整事件，且不写入目标仓库。
- `pnpm check-types` 和 `pnpm lint` 通过。

---

## 9. 后续扩展

v1 跑通后，再逐步加入：

- 更丰富的 mock benchmark。
- LangSmith trace。
- Memory：从历史 trace 中总结经验。
- RAG：面向大型仓库的代码检索。
- MCP：把工具层暴露给外部 Agent。
- 多模型：便宜模型执行，强模型规划或 review。
- 多 Agent：planner / coder / reviewer 分工。

---

## 10. 待确认问题

已确认：

- 默认模型：智谱 Z.AI `GLM-4.7-Flash`。
- 对照模型：DeepSeek `deepseek-v4-flash`。
- Agent 框架：LangGraph。
- 模型接入：OpenAI-compatible API。
- 操作对象：外部目标仓库；v1 建议先用可丢弃的练习仓库，不直接修改当前真实工作室仓库。
- CLI 命令名：`mini-codex`。
- CLI 形态：默认在目标仓库目录执行 `mini-codex` 并进入交互式会话；`--repo` 仅作为高级参数。
- 权限模式：写文件和运行命令前都询问用户。

还需要讨论：

1. 练习仓库第一版是否只做 TypeScript 项目？
2. v1 是否要实现 benchmark 自动模式，还是先只做交互模式？
3. 工具编辑文件采用整文件覆写、字符串替换，还是 patch/diff 方式？
4. trace 目录放在开发期目录 `apps/mini-codex/.agent-runs/`，还是放到用户级目录 `~/.mini-codex/runs/`？
