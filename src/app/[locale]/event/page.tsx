"use client";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

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
  active: "text-[#00FFFF] border-[#00FFFF]/40 bg-[#00FFFF]/10",
  closed: "text-gray-400 border-gray-600 bg-gray-800/40",
  upcoming: "text-yellow-400 border-yellow-500/40 bg-yellow-500/10",
};

export default function LeaderboardEvents() {
  const t = useTranslations("events");
  const locale = useLocale();

  const rawCards = t.raw("cards") as Record<string, Omit<EventItem, "key">>;
  const events: EventItem[] = Object.entries(rawCards).map(([key, value]) => ({
    key,
    ...value,
  }));


  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-24 px-6">
      {/* 🏁 Hero Section */}
      <motion.h1
        className="text-5xl md:text-6xl font-press text-accent drop-shadow-[0_0_15px_#FBBF24] mb-6 animate-neonPulse text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {t("title")}
      </motion.h1>

      <motion.p
        className="text-gray-300 font-outfit text-center max-w-2xl mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        dangerouslySetInnerHTML={{ __html: t.raw("intro") }}
      />

      {/* 🧩 이벤트 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
        {events.map((ev, index) => (
          <motion.div
            key={ev.key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.15, ease: "easeOut" },
            }}
            className="relative bg-[#0F172A]/80 border border-[#5B21B6]/40 rounded-2xl overflow-hidden shadow-neon hover:shadow-accent/30 w-full max-w-md group"
          >
            {/* 썸네일 */}
            <motion.div
              className="w-full h-56 overflow-hidden"
              whileHover={{ opacity: 0.85 }}
              transition={{ duration: 0.15 }}
            >
              <Image
                src={ev.image}
                alt={ev.title}
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </motion.div>

            {/* 내용 */}
            <div className="p-6 h-[260px] flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <h3
                  className="font-press text-accent"
                  style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 1rem)", // 제목 자동 크기 조정
                  }}
                >
                  {ev.title}
                </h3>

                <p
                  className="text-gray-300 font-outfit leading-relaxed"
                  style={{
                    fontSize: "clamp(0.8rem, 1.6vw, .1rem)", // 설명 자동 크기 조정
                  }}
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
                <div className="h-[42px] flex items-center">
                  {ev.status !== "upcoming" ? (
                    <Link
                      href={ev.link}
                      locale={locale}
                      className="block w-full text-center px-4 py-2 border border-accent/40 text-accent font-semibold rounded-lg hover:text-yellow-300 hover:border-yellow-300 hover:bg-[#FBBF24]/10 transition-all duration-200"
                    >
                      View Event
                    </Link>
                  ) : (
                    <div className="opacity-0 select-none w-full">View Event</div>
                  )}
                </div>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

      {/* ⬅ 뒤로가기 */}
      <div className="mt-16">
        <Link
          href={`/`}
          className="block w-full text-center px-4 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-accent hover:text-yellow-300 transition-all duration-200"
        >
          {t("back")}
        </Link>
      </div>
    </div>
  );
}
