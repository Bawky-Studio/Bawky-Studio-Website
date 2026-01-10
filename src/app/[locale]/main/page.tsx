"use client";
import { motion } from "framer-motion";
import { NeonButton } from "../../../../components/NeonButton";
import { useLocale } from "next-intl";

export default function Home() {
  const locale = useLocale();

  return (
    <div className="relative flex flex-col items-center justify-center h-[100vh] text-center overflow-hidden">
      {/* 🎥 배경 비디오 */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.3] z-0"
        src="/videos/intro-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* 🔮 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          className="text-4xl md:text-6xl font-press text-primary drop-shadow-[0_0_10px_#5B21B6] animate-neonPulse animate-glitch"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          BAWKY STUDIO
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          We make games
        </motion.p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <NeonButton label="About Us" href="/about" locale={locale} />
          <NeonButton label="Games" href="/games" locale={locale} />
          <NeonButton label="Softwares" href="/programs" locale={locale} />
          <NeonButton label="Events" href="/events" locale={locale} />
        </div>
      </div>

      {/* 🎬 어두운 오버레이 (영상 위 가독성 향상용) */}
      <div className="absolute inset-0 bg-black/40 z-5 pointer-events-none" />
    </div>
  );
}
