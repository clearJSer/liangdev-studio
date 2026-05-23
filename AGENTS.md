# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## 常用命令

```bash
# 安装依赖
pnpm install

# 开发（所有 app 并行启动）
pnpm dev

# 构建
pnpm build

# 类型检查
pnpm check-types

# Lint
pnpm lint

# 格式化
pnpm format

# 单独运行某个 app 或 package
turbo dev --filter=web
turbo build --filter=web
turbo lint --filter=@repo/ui
```

> 包管理器：**pnpm 9**，Node >= 18

## 架构概览

Turborepo monorepo，pnpm workspace。

```
apps/
  web/          # Next.js 16 应用，端口 3000
docs/
  development/ # 开发流程、AI 协作、工程实践文档
packages/
  ui/           # 共享 React 组件库，直接导出 src/*.tsx（无构建步骤）
  eslint-config/  # 共享 ESLint 配置（base / next / react-internal）
  typescript-config/  # 共享 tsconfig（base / nextjs / react-library）
specs/
  web/          # 官网相关需求、页面规划、内容规格
```

**关键设计：**

- `@repo/ui` 通过 `"exports": { "./*": "./src/*.tsx" }` 直接暴露源码，消费方（如 `apps/web`）直接引用 `@repo/ui/button`，无需构建。
- Turbo 任务依赖：`build` / `lint` / `check-types` 都声明了 `"dependsOn": ["^build"]`，保证 packages 先于 apps 执行。
- `apps/web` 的 `check-types` 会先运行 `next typegen` 再执行 `tsc --noEmit`。
- `docs/` 放长期维护的工程文档；`specs/` 放产品需求、页面规划、业务规则和设计规格。

## 代码规范

- 使用 TypeScript，不允许 `any`
- 每个函数必须有 JSDoc 注释
- 新增文件必须说明它的职责

## 协作规范

- 修改现有文件前，先告诉我你打算改什么，为什么
- 如果有多种方案，列出来让我选，不要自作主张
- 遇到不确定的地方，问我，不要猜
