"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { easeOut } from "framer-motion";

interface GameCard {
  key: string;
  image: string;
  slug: string;
}

const mainProjects: GameCard[] = [
  { key: "fataldraw", image: "/images/betdown_quickdraw.png", slug: "fataldraw" },
  { key: "betdown_duel", image: "/images/betdown_duel.png", slug: "duel" },
];

const sideProjects: GameCard[] = [];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
  },
};

export default function GamesPage() {
  const t = useTranslations("games");

  return (
    <section className="min-h-screen bg-neutral-950 text-white flex flex-col items-center py-24 px-6">
      {/* 제목 */}
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-bold mb-16 tracking-tight"
      >
      {t("title")}
      </motion.h2>

      {/* MAIN PROJECTS */}
      <div className="w-full max-w-6xl mb-24 text-center mx-auto">
        <motion.h3
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          className="text-3xl font-semibold mb-8 text-yellow-400"
        >
          {t("main")}
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
          {mainProjects.map((game) => (
            <motion.div
              key={game.key}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              whileHover={{
                scale: 1.04,
                rotate: 0.3,
                boxShadow:
                  "0 0 25px rgba(250, 204, 21, 0.6), 0 0 50px rgba(250, 204, 21, 0.3)",
                transition: { duration: 0.08, ease: "easeOut" },
              }}
              className="relative bg-neutral-800/80 transform-gpu will-change-transform backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg w-full max-w-[280px] group border border-neutral-700 hover:border-yellow-400 transition-all duration-100"
            >
              {/* 이미지 */}
              <div className="overflow-hidden">
                <Image
                  src={game.image}
                  alt={t(`projects.${game.key}.title`)}
                  width={600}
                  height={400}
                  className="object-cover w-full h-48 transition-all duration-200 group-hover:opacity-95"
                />
              </div>

              {/* 텍스트 (transform 영향 제거) */}
              <div className="p-5 will-change-auto transform-none">
                <h4 className="text-xl font-bold mb-2 text-white">
                  {t(`projects.${game.key}.title`)}
                </h4>
                <p className="text-sm text-neutral-300 mb-4 line-clamp-2">
                  {t(`projects.${game.key}.description`)}
                </p>
                <Link
                  href={`/games/${game.slug}`}
                  className="inline-block px-4 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-300 transition-colors"
                >
                  {t("viewDetails")}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SIDE PROJECTS */}
      <div className="w-full max-w-6xl text-center mx-auto">
        <motion.h3
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          className="text-3xl font-semibold mb-8 text-blue-400"
        >
          {t("side")}
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
          {sideProjects.map((game) => (
            <motion.div
              key={game.key}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              whileHover={{
                  scale: 1.04,
                  rotate: 0.3,
                  boxShadow:
                      "0 0 25px rgba(96,165,250,0.6), 0 0 50px rgba(96,165,250,0.3)",
                  transition: { duration: 0.08, ease: "easeOut" },
              }}
              className="relative bg-neutral-800/80 transform-gpu will-change-transform backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg w-full max-w-[280px] group border border-neutral-700 hover:border-blue-400 transition-all duration-100"
            >
              <div className="overflow-hidden">
                <Image
                  src={game.image}
                  alt={t(`projects.${game.key}.title`)}
                  width={500}
                  height={300}
                  className="object-cover w-full h-48 transition-all duration-200 group-hover:opacity-95"
                />
              </div>

              <div className="p-5 will-change-auto transform-none">
                <h4 className="text-xl font-bold mb-2 text-white">
                  {t(`projects.${game.key}.title`)}
                </h4>
                <p className="text-sm text-neutral-300 mb-4 line-clamp-2">
                  {t(`projects.${game.key}.description`)}
                </p>
                <Link
                  href={`/games/${game.slug}`}
                  className="inline-block px-4 py-2 bg-blue-400 text-black font-semibold rounded-md hover:bg-blue-300 transition-colors"
                >
                  {t("viewDetails")}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
