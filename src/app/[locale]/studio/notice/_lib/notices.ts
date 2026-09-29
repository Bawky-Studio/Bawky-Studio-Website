import { promises as fs } from "node:fs";
import path from "node:path";

const NOTICE_ROOT = path.join(process.cwd(), "src/content/notices");
const FALLBACK_THUMBNAIL = "/images/coming-soon.png";
const DEFAULT_CATEGORY = "General";
const DEFAULT_WRITER = "Bawky Studio";

type SupportedLocale = "en" | "ko";

type NoticeFrontmatter = {
  title: string;
  category: string;
  writer: string;
  publishedAt: string;
  thumbnail: string;
};

export type NoticeSummary = NoticeFrontmatter & {
  slug: string;
};

export type NoticeBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "unorderedList"; items: string[] }
  | { type: "orderedList"; items: string[] };

export type Notice = NoticeSummary & {
  body: string;
  blocks: NoticeBlock[];
};

function normalizeLocale(locale: string): SupportedLocale {
  return locale === "ko" ? "ko" : "en";
}

function parseFrontmatter(content: string) {
  if (!content.startsWith("---\n")) {
    return { frontmatter: {} as Record<string, string>, body: content.trim() };
  }

  const frontmatterEndIndex = content.indexOf("\n---\n", 4);
  if (frontmatterEndIndex === -1) {
    return { frontmatter: {} as Record<string, string>, body: content.trim() };
  }

  const rawFrontmatter = content.slice(4, frontmatterEndIndex).trim();
  const body = content.slice(frontmatterEndIndex + 5).trim();
  const frontmatter: Record<string, string> = {};

  for (const line of rawFrontmatter.split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }
    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();
    const isWrappedWithQuotes =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));
    if (isWrappedWithQuotes && value.length >= 2) {
      value = value.slice(1, -1);
    }
    frontmatter[key] = value;
  }

  return { frontmatter, body };
}

function normalizeFrontmatter(slug: string, frontmatter: Record<string, string>): NoticeSummary {
  return {
    slug,
    title: frontmatter.title || slug.replace(/-/g, " "),
    category: frontmatter.category || DEFAULT_CATEGORY,
    writer: frontmatter.writer || DEFAULT_WRITER,
    publishedAt: frontmatter.date || "",
    thumbnail: frontmatter.thumbnail || FALLBACK_THUMBNAIL,
  };
}

function toSortableTimestamp(date: string) {
  const time = Date.parse(date);
  return Number.isFinite(time) ? time : 0;
}

function parseMarkdownBlocks(markdown: string): NoticeBlock[] {
  const blocks: NoticeBlock[] = [];
  const lines = markdown.split("\n");
  let paragraphBuffer: string[] = [];
  let unorderedListBuffer: string[] = [];
  let orderedListBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) {
      return;
    }
    blocks.push({ type: "paragraph", text: paragraphBuffer.join(" ").trim() });
    paragraphBuffer = [];
  };

  const flushUnorderedList = () => {
    if (unorderedListBuffer.length === 0) {
      return;
    }
    blocks.push({ type: "unorderedList", items: unorderedListBuffer });
    unorderedListBuffer = [];
  };

  const flushOrderedList = () => {
    if (orderedListBuffer.length === 0) {
      return;
    }
    blocks.push({ type: "orderedList", items: orderedListBuffer });
    orderedListBuffer = [];
  };

  const flushAll = () => {
    flushParagraph();
    flushUnorderedList();
    flushOrderedList();
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushAll();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushAll();
      blocks.push({ type: "heading", level: 2, text: trimmed.slice(3).trim() });
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushAll();
      blocks.push({ type: "heading", level: 3, text: trimmed.slice(4).trim() });
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      flushOrderedList();
      unorderedListBuffer.push(trimmed.slice(2).trim());
      continue;
    }

    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      flushUnorderedList();
      orderedListBuffer.push(orderedMatch[2].trim());
      continue;
    }

    flushUnorderedList();
    flushOrderedList();
    paragraphBuffer.push(trimmed);
  }

  flushAll();
  return blocks;
}

async function readNoticeFile(filePath: string) {
  const fileContent = await fs.readFile(filePath, "utf-8");
  const slug = path.basename(filePath, ".md");
  const { frontmatter, body } = parseFrontmatter(fileContent);
  const summary = normalizeFrontmatter(slug, frontmatter);

  return {
    ...summary,
    body,
    blocks: parseMarkdownBlocks(body),
  } satisfies Notice;
}

async function readLocaleNoticeFiles(locale: SupportedLocale) {
  const localeDirPath = path.join(NOTICE_ROOT, locale);
  let fileNames: string[] = [];
  try {
    fileNames = await fs.readdir(localeDirPath);
  } catch {
    return [];
  }

  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => path.join(localeDirPath, fileName));
}

export async function getNoticeSummaries(locale: string): Promise<NoticeSummary[]> {
  const normalizedLocale = normalizeLocale(locale);
  const noticeFilePaths = await readLocaleNoticeFiles(normalizedLocale);
  const notices = await Promise.all(noticeFilePaths.map(readNoticeFile));

  return notices
    .sort((a, b) => toSortableTimestamp(b.publishedAt) - toSortableTimestamp(a.publishedAt))
    .map(({ body: _body, blocks: _blocks, ...summary }) => summary);
}

export async function getNoticeBySlug(locale: string, slug: string): Promise<Notice | null> {
  const normalizedLocale = normalizeLocale(locale);
  const filePath = path.join(NOTICE_ROOT, normalizedLocale, `${slug}.md`);

  try {
    return await readNoticeFile(filePath);
  } catch {
    return null;
  }
}
