import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { getNoticeSummaries } from "./_lib/notices";

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

export default async function NoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "studio" });
  const notices = await getNoticeSummaries(locale);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900" data-nav-theme="light">
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32 md:px-10 md:pt-36">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">{t("notice.title")}</h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg">
            {t("notice.description")}
          </p>
        </header>

        {notices.length === 0 ? (
          <p className="mt-14 border-t border-neutral-200 py-8 text-sm text-neutral-500">
            {t("notice.empty")}
          </p>
        ) : (
          <ul className="mt-14 divide-y divide-neutral-200 border-y border-neutral-200">
            {notices.map((notice) => (
              <li key={notice.slug}>
                <Link
                  href={`/studio/notice/${notice.slug}`}
                  className="grid gap-6 py-6 transition-colors hover:bg-neutral-100/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sandy-brown-500 md:grid-cols-[240px_1fr] md:gap-8 md:py-8"
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-neutral-200 bg-neutral-200">
                    <Image
                      src={notice.thumbnail}
                      alt={notice.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 240px"
                    />
                  </div>

                  <div className="flex min-w-0 flex-col justify-center gap-4">
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{notice.title}</h2>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
                      <span className="inline-flex items-center rounded-full border border-neutral-300 px-3 py-1 text-xs uppercase tracking-[0.08em] text-neutral-700">
                        {notice.category}
                      </span>
                      <span>
                        {t("notice.writerLabel")}: {notice.writer}
                      </span>
                      <span>
                        {t("notice.publishedLabel")}: {formatPublishDate(notice.publishedAt, locale)}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
