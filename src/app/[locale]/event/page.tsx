"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ButtonLink } from "../../../../components/ui/Button";

// 🎯 타입 정의
type EventStatus = "active" | "closed" | "upcoming";

interface EventItem {
  key: string;
  title: string;
  desc: string;
  image: string;
  status: EventStatus;
  link: string;
}

// 🎨 상태 색상 맵핑
const statusColor: Record<EventStatus, string> = {
  active: "text-neutral-700 border-neutral-200 bg-neutral-100",
  closed: "text-neutral-500 border-neutral-200 bg-neutral-100",
  upcoming: "text-neutral-500 border-neutral-200 bg-neutral-100",
};

export default function LeaderboardEvents() {
  const t = useTranslations("event");
  const locale = useLocale();

  const rawCards = t.raw("cards") as Record<string, Omit<EventItem, "key">>;
  const events: EventItem[] = Object.entries(rawCards).map(([key, value]) => ({
    key,
    ...value,
  }));


  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center px-6 py-24">
      {/* 🏁 Hero Section */}
      <div className="w-full max-w-5xl text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900">
          {t("title")}
        </h1>
        <p
          className="mt-6 text-base md:text-lg text-neutral-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t.raw("intro") }}
        />
      </div>

      {/* 🧩 이벤트 카드 리스트 */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {events.map((ev) => (
          <div
            key={ev.key}
            className="relative bg-white/80 border border-neutral-200 rounded-2xl overflow-hidden w-full max-w-md group transition-colors"
          >
            {/* 썸네일 */}
            <div className="w-full h-56 overflow-hidden">
              <Image
                src={ev.image}
                alt={ev.title}
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>

            {/* 내용 */}
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg md:text-xl font-semibold text-neutral-900">
                  {ev.title}
                </h2>
                <p
                  className="text-sm md:text-base text-neutral-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: ev.desc }}
                />
              </div>

              <div className="flex flex-col gap-3">
                <span
                  className={`inline-block w-fit px-4 py-1 text-xs font-bold uppercase rounded-full border ${
                    statusColor[ev.status]
                  }`}
                >
                  {ev.status === "active"
                    ? "ACTIVE"
                    : ev.status === "closed"
                    ? "CLOSED"
                    : "COMING SOON"}
                </span>
                <div className="h-10 flex items-center">
                  {ev.status !== "upcoming" ? (
                    <ButtonLink
                      href={ev.link}
                      locale={locale}
                      size="sm"
                      className="border-neutral-300 text-neutral-900 hover:border-orange-300"
                    >
                      View Event
                    </ButtonLink>
                  ) : (
                    <div className="opacity-0 select-none">View Event</div>
                  )}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ⬅ 뒤로가기 */}
      <div className="mt-16">
        <ButtonLink href="/" locale={locale} size="sm" className="border-neutral-300 text-neutral-900 hover:border-orange-300">
          {t("back")}
        </ButtonLink>
      </div>
    </div>
  );
}
