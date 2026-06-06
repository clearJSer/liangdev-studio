/**
 * 职责：读取构建记录 Markdown 文件，解析元信息和正文块，并提供静态页面数据。
 */

import fs from "node:fs";
import path from "node:path";

export type WritingFrontmatter = {
  title: string;
  date: string;
  summary: string;
  projectSlug: string;
  tags: string[];
};

export type MarkdownBlock =
  | {
      level: 2 | 3;
      text: string;
      type: "heading";
    }
  | {
      text: string;
      type: "paragraph";
    }
  | {
      items: string[];
      ordered: boolean;
      type: "list";
    }
  | {
      text: string;
      type: "quote";
    };

export type Writing = WritingFrontmatter & {
  blocks: MarkdownBlock[];
  slug: string;
};

export type WritingSummary = WritingFrontmatter & {
  slug: string;
};

type FrontmatterValue = string | string[];

const writingsDirectory = path.join(process.cwd(), "content", "writings");

/**
 * 获取所有 Markdown 构建记录文件名对应的 slug。
 */
export function getAllWritingSlugs() {
  return fs
    .readdirSync(writingsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

/**
 * 获取所有构建记录摘要，并按发布日期倒序排列。
 */
export function getAllWritingSummaries() {
  return getAllWritings().map((writing) => ({
    date: writing.date,
    projectSlug: writing.projectSlug,
    slug: writing.slug,
    summary: writing.summary,
    tags: writing.tags,
    title: writing.title,
  }));
}

/**
 * 获取指定项目关联的构建记录摘要。
 */
export function getWritingSummariesByProject(projectSlug: string) {
  return getAllWritingSummaries().filter(
    (writing) => writing.projectSlug === projectSlug,
  );
}

/**
 * 根据 slug 读取一篇构建记录。
 */
export function getWritingBySlug(slug: string) {
  const filePath = path.join(writingsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseWritingFile(slug, fs.readFileSync(filePath, "utf8"));
}

/**
 * 读取全部构建记录正文。
 */
function getAllWritings() {
  return getAllWritingSlugs()
    .map((slug) => getWritingBySlug(slug))
    .filter((writing): writing is Writing => writing !== null)
    .sort((left, right) => right.date.localeCompare(left.date));
}

/**
 * 解析一篇 Markdown 文件为构建记录对象。
 */
function parseWritingFile(slug: string, fileContent: string): Writing {
  const { content, frontmatter } = parseFrontmatter(fileContent);

  return {
    slug,
    title: readRequiredString(frontmatter, "title"),
    date: readRequiredString(frontmatter, "date"),
    summary: readRequiredString(frontmatter, "summary"),
    projectSlug: readRequiredString(frontmatter, "projectSlug"),
    tags: readRequiredStringArray(frontmatter, "tags"),
    blocks: parseMarkdownBlocks(content),
  };
}

/**
 * 解析 Markdown 文件顶部 frontmatter。
 */
function parseFrontmatter(fileContent: string) {
  const lines = fileContent.split(/\r?\n/);

  if (lines[0] !== "---") {
    return {
      content: fileContent,
      frontmatter: new Map<string, FrontmatterValue>(),
    };
  }

  const frontmatter = new Map<string, FrontmatterValue>();
  let currentArrayKey: string | null = null;
  let contentStartIndex = 0;

  for (let index = 1; index < lines.length; index += 1) {
    const line = lines[index] ?? "";

    if (line === "---") {
      contentStartIndex = index + 1;
      break;
    }

    if (currentArrayKey && line.trim().startsWith("- ")) {
      const currentValue = frontmatter.get(currentArrayKey);
      const item = line.trim().replace(/^- /, "");

      if (Array.isArray(currentValue)) {
        currentValue.push(item);
      }

      continue;
    }

    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      currentArrayKey = null;
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (value === "") {
      frontmatter.set(key, []);
      currentArrayKey = key;
    } else {
      frontmatter.set(key, value);
      currentArrayKey = null;
    }
  }

  return {
    content: lines.slice(contentStartIndex).join("\n").trim(),
    frontmatter,
  };
}

/**
 * 从 frontmatter 中读取必填字符串字段。
 */
function readRequiredString(
  frontmatter: Map<string, FrontmatterValue>,
  key: keyof WritingFrontmatter,
) {
  const value = frontmatter.get(key);

  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Missing writing frontmatter field: ${key}`);
  }

  return value;
}

/**
 * 从 frontmatter 中读取必填字符串数组字段。
 */
function readRequiredStringArray(
  frontmatter: Map<string, FrontmatterValue>,
  key: keyof WritingFrontmatter,
) {
  const value = frontmatter.get(key);

  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`Missing writing frontmatter list field: ${key}`);
  }

  return value;
}

/**
 * 解析受控 Markdown 子集为页面可渲染的块结构。
 */
function parseMarkdownBlocks(content: string) {
  const blocks: MarkdownBlock[] = [];
  const lines = content.split(/\r?\n/);
  let index = 0;

  while (index < lines.length) {
    const line = lines[index]?.trim() ?? "";

    if (line === "") {
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({
        level: 3,
        text: line.replace(/^### /, ""),
        type: "heading",
      });
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({
        level: 2,
        text: line.replace(/^## /, ""),
        type: "heading",
      });
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const { nextIndex, text } = collectQuote(lines, index);
      blocks.push({
        text,
        type: "quote",
      });
      index = nextIndex;
      continue;
    }

    if (/^- /.test(line) || /^\d+\. /.test(line)) {
      const { items, nextIndex, ordered } = collectList(lines, index);
      blocks.push({
        items,
        ordered,
        type: "list",
      });
      index = nextIndex;
      continue;
    }

    const { nextIndex, text } = collectParagraph(lines, index);
    blocks.push({
      text,
      type: "paragraph",
    });
    index = nextIndex;
  }

  return blocks;
}

/**
 * 收集连续引用行。
 */
function collectQuote(lines: string[], startIndex: number) {
  const quoteLines: string[] = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index]?.trim() ?? "";

    if (!line.startsWith("> ")) {
      break;
    }

    quoteLines.push(line.replace(/^> /, ""));
    index += 1;
  }

  return {
    nextIndex: index,
    text: quoteLines.join(" "),
  };
}

/**
 * 收集连续列表行。
 */
function collectList(lines: string[], startIndex: number) {
  const items: string[] = [];
  const firstLine = lines[startIndex]?.trim() ?? "";
  const ordered = /^\d+\. /.test(firstLine);
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index]?.trim() ?? "";
    const isCurrentListType = ordered ? /^\d+\. /.test(line) : /^- /.test(line);

    if (!isCurrentListType) {
      break;
    }

    items.push(line.replace(/^(?:- |\d+\. )/, ""));
    index += 1;
  }

  return {
    items,
    nextIndex: index,
    ordered,
  };
}

/**
 * 收集连续自然段行。
 */
function collectParagraph(lines: string[], startIndex: number) {
  const paragraphLines: string[] = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index]?.trim() ?? "";

    if (
      line === "" ||
      line.startsWith("## ") ||
      line.startsWith("### ") ||
      line.startsWith("> ") ||
      /^- /.test(line) ||
      /^\d+\. /.test(line)
    ) {
      break;
    }

    paragraphLines.push(line);
    index += 1;
  }

  return {
    nextIndex: index,
    text: paragraphLines.join(" "),
  };
}
