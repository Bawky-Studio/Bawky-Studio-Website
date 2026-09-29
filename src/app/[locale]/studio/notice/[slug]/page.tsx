import Image from "next/image";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { Link } from "@/i18n/navigation";

import { getNoticeBySlug, type NoticeBlock } from "../_lib/notices";

function formatPublishDate(date: string, locale: string) {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(parsedDate);
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const inlineTokenPattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
  const segments = text.split(inlineTokenPattern).filter(Boolean);

  return segments.map((segment, index) => {
    const linkMatch = segment.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const label = linkMatch[1];
      const href = linkMatch[2];
      return (
        <a
          key={`${segment}-${index}`}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="underline decoration-neutral-400 underline-offset-4 hover:decoration-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sandy-brown-500"
        >
          {label}
        </a>
      );
    }

    const boldMatch = segment.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return <strong key={`${segment}-${index}`}>{boldMatch[1]}</strong>;
    }

    const codeMatch = segment.match(/^`([^`]+)`$/);
    if (codeMatch) {
      return (
        <code key={`${segment}-${index}`} className="rounded bg-neutral-200 px-1.5 py-0.5 text-sm">
          {codeMatch[1]}
        </code>
      );
    }

    return <span key={`${segment}-${index}`}>{segment}</span>;
  });
}

function renderBlock(block: NoticeBlock, blockIndex: number) {
  if (block.type === "heading") {
    if (block.level === 2) {
      return (
        <h2 key={blockIndex} className="mt-10 text-2xl font-semibold tracking-tight md:text-3xl">
          {renderInlineMarkdown(block.text)}
        </h2>
      );
    }

    return (
      <h3 key={blockIndex} className="mt-8 text-xl font-semibold tracking-tight md:text-2xl">
        {renderInlineMarkdown(block.text)}
      </h3>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p key={blockIndex} className="text-base leading-8 text-neutral-700 md:text-lg">
        {renderInlineMarkdown(block.text)}
      </p>
    );
  }

  if (block.type === "unorderedList") {
    return (
      <ul key={blockIndex} className="list-disc space-y-3 pl-6 text-base leading-8 text-neutral-700 md:text-lg">
        {block.items.map((item, itemIndex) => (
          <li key={`${item}-${itemIndex}`}>{renderInlineMarkdown(item)}</li>
        ))}
      </ul>
    );
  }

  return (
    <ol key={blockIndex} className="list-decimal space-y-3 pl-6 text-base leading-8 text-neutral-700 md:text-lg">
      {block.items.map((item, itemIndex) => (
        <li key={`${item}-${itemIndex}`}>{renderInlineMarkdown(item)}</li>
      ))}
    </ol>
  );
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const notice = await getNoticeBySlug(locale, slug);
  const t = await getTranslations({ locale, namespace: "studio" });

  if (!notice) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900" data-nav-theme="light">
      <article className="mx-auto w-full max-w-4xl px-6 pb-24 pt-32 md:px-10 md:pt-36">
        <Link
          href="/studio/notice"
          className="inline-flex items-center text-sm text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sandy-brown-500"
        >
          {t("notice.backToList")}
        </Link>

        <header className="mt-8 border-b border-neutral-200 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">
            {notice.category}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{notice.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-600">
            <span>
              {t("notice.writerLabel")}: {notice.writer}
            </span>
            <span>
              {t("notice.publishedLabel")}: {formatPublishDate(notice.publishedAt, locale)}
            </span>
          </div>
        </header>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-md border border-neutral-200 bg-neutral-200">
          <Image src={notice.thumbnail} alt={notice.title} fill className="object-cover" priority />
        </div>

        <section className="mt-10 space-y-6">
          {notice.blocks.map((block, blockIndex) => renderBlock(block, blockIndex))}
        </section>
      </article>
    </div>
  );
}
