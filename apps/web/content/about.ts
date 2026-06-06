/**
 * 职责：维护关于页的结构化内容，表达工作室初心、边界和 AI Native 构建方式。
 */

export type AboutFact = {
  label: string;
  value: string;
};

export type AboutKeyword = {
  description: string;
  title: string;
};

export type AboutWorkflowStep = {
  description: string;
  title: string;
};

export const aboutContent = {
  hero: {
    eyebrow: "About YiForge",
    title: "YiForge Studio，是我在 AI 时代建立的个人工作室。",
    description:
      "它不是传统公司，也不是单纯博客，而是我用来持续构建产品、记录实践、表达思考的长期容器。",
  },
  facts: [
    {
      label: "Studio",
      value: "YiForge Studio",
    },
    {
      label: "Role",
      value: "主理人 / Builder",
    },
    {
      label: "Mode",
      value: "AI Native",
    },
    {
      label: "Status",
      value: "持续构建中",
    },
  ] satisfies AboutFact[],
  origin: {
    eyebrow: "Origin",
    title: "为什么开始做这个工作室",
    body: [
      "AI 时代到来以后，我越来越强烈地感受到，个人开发者的能力边界正在被重新打开。过去很多需要团队经验、跨岗位协作和大量试错才能完成的事情，现在可以通过 AI 对话、AI 编程和 AI 辅助决策一步步推进。",
      "YiForge Studio 是我对这个时代变化的回应。它代表我想抓住 AI 带来的新机会，不再只把自己限定在一个前端岗位里，而是开始完整地思考产品、技术、内容、部署和长期表达。",
      "这个工作室不是为了把自己包装成一家成熟公司，而是为了给持续构建留下一个稳定容器。想法可以放进来，项目可以放进来，构建记录可以放进来，未来真正解决问题的工具和产品也会继续放进来。",
    ],
  },
  keywords: [
    {
      title: "AI 时代",
      description: "AI 不是附加工具，而是改变个人构建方式的新环境。",
    },
    {
      title: "个人构建",
      description: "从单点开发走向完整产品，把想法推进到真实上线。",
    },
    {
      title: "长期创造",
      description: "用项目、文章和工具持续积累，而不是只做一次性展示。",
    },
  ] satisfies AboutKeyword[],
  definition: {
    eyebrow: "Definition",
    title: "这个工作室是什么",
    body: [
      "YiForge Studio 代表我，但它也比“我个人”更稳定。它是一个个人 AI Native 工作室，用来承载我在 AI 开发、自动化工具、产品构建和内容沉淀上的长期探索。",
      "它不是成熟公司，不是外包团队，也不是普通个人博客。它更像一个正在生长的构建容器：每个项目都是真实实践，每篇构建记录都沉淀一次经验，每一次迭代都让工作室变得更清晰。",
    ],
    contrasts: ["不是成熟公司", "不是外包团队", "不是普通个人博客", "是个人 AI Native 工作室"],
  },
  workflow: {
    eyebrow: "AI Native Development",
    title: "工作室的 AI Native 开发范式",
    description:
      "在 YiForge Studio 里，AI Native 开发不是把需求丢给模型生成代码，而是把问题定义、上下文、工具调用、工程实现、评测验收和持续迭代组织成一套完整的软件开发流程。",
    steps: [
      {
        title: "问题定义",
        description: "先确认真实场景、目标用户、成功标准和技术约束，再判断 AI 应该参与哪里。",
      },
      {
        title: "上下文工程",
        description: "用 spec、资料、代码、案例和问题列表组织事实依据，让模型基于上下文工作。",
      },
      {
        title: "流程编排",
        description: "把任务拆成模型、工具、代码执行、人工判断和安全边界都清楚的协作流程。",
      },
      {
        title: "协同实现",
        description: "AI 参与代码、样式、文档和调试，人持续提供反馈并控制实现方向。",
      },
      {
        title: "评测验收",
        description: "用类型检查、构建、页面验证和人工审阅衡量质量，而不是只看模型输出。",
      },
      {
        title: "上线迭代",
        description: "通过版本管理、静态部署、构建记录和反馈复盘，持续改进产品和工作流。",
      },
    ] satisfies AboutWorkflowStep[],
  },
  directions: {
    eyebrow: "Long-term Direction",
    title: "长期构建方向",
    description:
      "YiForge Studio 会保持小步上线、持续记录和长期迭代，把真实问题逐步变成可使用的产品与工作流。",
    items: [
      {
        title: "真实产品",
      },
      {
        title: "构建记录",
      },
      {
        title: "工具与工作流",
      },
      {
        title: "可上线结果",
      },
    ],
  },
  ledger: {
    eyebrow: "Studio Ledger",
    title: "工作室账本",
    description: "YiForge Studio 目前保持轻量运营，第一阶段主要投入来自域名和开发设备。",
    items: [
      {
        label: "liucodex.com 域名",
        value: "$10 / 年",
        year: "2026",
      },
      {
        label: "本地开发设备 Mac mini M4",
        value: "¥3800",
        year: "2026",
      },
    ],
  },
  contact: {
    text: "如果你想进一步了解 YiForge Studio，可以从联系页面找到我。",
    href: "/contact",
    label: "前往联系页面",
  },
} as const;
