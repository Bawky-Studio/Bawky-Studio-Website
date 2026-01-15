"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

export default function About() {
  const t = useTranslations("about");
  const locale = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);

  // 🎬 비디오 배속 설정
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1; // 0.7배속으로 느리게 재생
    }
  }, []);

  // 💡 철학 섹션 카드 데이터
  const philosophy = [
    {
      title: t("philosophy.title"),
      text: t("philosophy.text"),
      direction: -80,
    },
    {
      title: t("focus.title"),
      text: t("focus.text"),
      direction: 80,
    },
    {
      title: t("identity.title"),
      text: t("identity.text"),
      direction: -80,
    },
  ];

  // 👥 팀 멤버 정보
  const teamMembers = [
    {
      name: "Bawky",
      role: "Game Designer",
      desc: t("team.BawkZilla"),
      image: "/images/team-bawkzilla.png",
    },
    {
      name: "LilHyuki",
      role: "3D Modeler",
      desc: t("team.Hyuki"),
      image: "/images/team-hyuki.jpg",
    },
    {
      name: "Chicken_Triceps",
      role: "Client Programmer",
      desc: t("team.Triceps"),
      image: "/images/team-triceps.png",
    },    {
      name: "Ika",
      role: "Marketer",
      desc: t("team.Ika"),
      image: "/images/team-mootan.png",
    },
    {
      name: "LittleBread",
      role: "Web Developer",
      desc: t("team.LittleBread"),
      image: "/images/team-bread.png",
    }
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* 🎬 Hero Section */}
      <section className="relative w-full h-[70vh] md:h-screen flex items-center justify-center">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/studio-trailer.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.h1
          className="relative z-10 text-4xl md:text-6xl font-press text-accent drop-shadow-[0_0_15px_#FBBF24] px-4 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          {t("heroTitle")}
        </motion.h1>
      </section>

      {/* 🧠 Intro Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-24">
        <motion.p
          className="max-w-xl text-gray-300 leading-relaxed font-outfit text-base md:text-lg"
          dangerouslySetInnerHTML={{ __html: t.raw("intro.text") }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* 🧩 Philosophy Section */}
      <section className="py-16 md:py-24 bg-[#1E293B]/40">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-6">
          {philosophy.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl shadow-neon bg-[#0F172A]/60 border border-[#5B21B6]/30 text-center md:text-left"
              initial={{ opacity: 0, x: item.direction }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <h2 className="text-lg md:text-xl font-press text-accent mb-3">
                {item.title}
              </h2>
              <p className="text-gray-400 font-outfit text-sm md:text-base leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 👥 Team Section */}
      <section className="py-16 md:py-24 flex flex-col items-center px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-press text-accent mb-10 drop-shadow-[0_0_10px_#FBBF24] text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {t("team.title")}
        </motion.h2>

        <div className="max-w-5xl w-full flex flex-col gap-12 md:gap-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className={`flex flex-col items-center md:items-start gap-6 md:gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -100 : 100,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full shadow-neon border-2 border-accent"
                whileHover={{ scale: 1.05 }}
              />
              <div className="text-center md:text-left max-w-md">
                <h3 className="text-xl md:text-2xl font-press text-secondary">
                  {member.name}
                </h3>
                <p className="text-accent font-outfit mt-1 mb-3 text-sm md:text-base">
                  {member.role}
                </p>
                <p className="text-gray-300 font-outfit text-sm md:text-base leading-relaxed">
                  {member.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🤝 Our Promise Section */}
      <section className="h-[50vh] md:h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <motion.h2
          className="text-2xl md:text-4xl font-press text-accent drop-shadow-[0_0_15px_#FBBF24]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2 }}
        >
          {t("promise.title")}
        </motion.h2>
        <motion.p
          className="mt-4 md:mt-6 text-base md:text-2xl text-gray-300 font-outfit italic leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.4, duration: 1.5 }}
        >
          {t("promise.text")}
        </motion.p>
      </section>
 
      {/* ⬅ Back to Home */}
      <div className="text-center py-10 md:py-12">
        <Link
          href="/"
          locale={locale}
          className="text-secondary underline underline-offset-4 hover:text-accent transition-colors text-sm md:text-base"
        >
          {t("back")}
        </Link>
      </div>
    </div>
  );
}
