"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("studio");

  // 👥 팀 멤버 정보
  const teamMembers = [
    {
      name: t("teamMembers.bawky.name"),
      role: t("teamMembers.bawky.role"),
      desc: t("team.BawkZilla"),
      image: "/images/team-bawkzilla.png",
      socials: [
        { label: t("teamMembers.bawky.socials.github"), href: "https://github.com/bawky" },
        { label: t("teamMembers.bawky.socials.x"), href: "https://x.com/bawky" },
      ],
    },
    {
      name: t("teamMembers.lilHyuki.name"),
      role: t("teamMembers.lilHyuki.role"),
      desc: t("team.Hyuki"),
      image: "/images/team-hyuki.jpg",
      socials: [
        { label: t("teamMembers.lilHyuki.socials.instagram"), href: "https://instagram.com/lilhyuki" },
      ],
    },
    {
      name: t("teamMembers.chickenTriceps.name"),
      role: t("teamMembers.chickenTriceps.role"),
      desc: t("team.Triceps"),
      image: "/images/team-triceps.png",
      socials: [
        { label: t("teamMembers.chickenTriceps.socials.github"), href: "https://github.com/chicken-triceps" },
      ],
    },
    {
      name: t("teamMembers.ika.name"),
      role: t("teamMembers.ika.role"),
      desc: t("team.Ika"),
      image: "/images/team-mootan.png",
      socials: [
        { label: t("teamMembers.ika.socials.instagram"), href: "https://instagram.com/ika" },
        { label: t("teamMembers.ika.socials.youtube"), href: "https://youtube.com/@ika" },
      ],
    },
    {
      name: t("teamMembers.littleBread.name"),
      role: t("teamMembers.littleBread.role"),
      desc: t("team.LittleBread"),
      image: "/images/team-bread.png",
      socials: [
        { label: t("teamMembers.littleBread.socials.github"), href: "https://github.com/littlebread" },
        { label: t("teamMembers.littleBread.socials.portfolio"), href: "https://example.com" },
      ],
    },
  ];

  return (
    <div className="bg-neutral-50 text-neutral-900 overflow-x-hidden" data-nav-theme="light">
      {/* 🎬 Hero Section */}
      <section className="relative w-full min-h-[70vh] md:min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-neutral-100" />
        <div className="relative z-10 max-w-4xl text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-semibold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            {t("heroTitle")}
          </motion.h1>
          <motion.p
            className="mt-6 text-base md:text-lg text-neutral-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t.raw("intro.text") }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          />
        </div>
      </section>

      {/* 👥 Team Section */}
      <section className="py-16 md:py-24 flex flex-col items-center px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-10 text-center"
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
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border border-neutral-200"
                whileHover={{ scale: 1.02 }}
              />
              <div className="text-center md:text-left max-w-md">
                <h3 className="text-xl md:text-2xl font-semibold text-neutral-900">
                  {member.name}
                </h3>
                <p className="text-neutral-600 mt-1 mb-3 text-sm md:text-base">
                  {member.role}
                </p>
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                  {member.desc}
                </p>
                {member.socials && member.socials.length > 0 && (
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-neutral-500">
                    {member.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
                        aria-label={`${member.name} ${social.label}`}
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
