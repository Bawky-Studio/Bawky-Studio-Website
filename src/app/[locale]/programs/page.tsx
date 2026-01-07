"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Download, Github } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface Program {
  key: string;
  downloadUrl: string;
  githubUrl?: string;
  external?: boolean;
  logoPath?: string; // 로고 이미지 경로
  screenshotPath?: string; // 프로그램 실행 사진 경로
}

const programs: Program[] = [
  {
    key: "kalivra",
    downloadUrl: "https://github.com/DevBawky/Kalivra/releases/download/v1.0.1/Windows_Kalivra-Setup-1.0.0.exe",
    githubUrl: "https://github.com/DevBawky/Kalivra/releases/tag/v1.0.1", // GitHub 주소를 여기에 입력하세요
    logoPath: "/images/programs/kalivra-logo.png", // 로고 이미지 경로를 여기에 입력하세요
    screenshotPath: "/images/programs/kalivra-screenshot.png", // 프로그램 실행 사진 경로를 여기에 입력하세요
    external: true,
  },
];

export default function ProgramsPage() {
  const t = useTranslations("programs");
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="bg-neutral-950 text-white overflow-y-scroll min-h-[calc(100vh-5rem)] -mb-10"
    >
      {/* 프로그램 섹션들 */}
      {programs.map((program, index) => (
        <section
          key={program.key}
          className="relative flex h-screen overflow-hidden"
        >
          {/* 배경: 스크린샷 이미지 */}
          {program.screenshotPath && (
            <div className="absolute inset-0 z-0">
              <Image
                src={program.screenshotPath}
                alt={`${t(`items.${program.key}.title`)} background`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          )}
          
          {/* 그라데이션 오버레이: 왼쪽 1/3 투명 → 오른쪽 위 선명, 아래 살짝 어두움 */}
          <div 
            className="absolute inset-0 z-[1]"
            style={{
              background: `
                linear-gradient(to right, rgba(0,0,0,1.0) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.1) 80%),
                linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)
              `
            }}
          />
          
          {/* 기본 배경 그라데이션 (스크린샷이 없을 경우) */}
          {!program.screenshotPath && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-neutral-950 to-purple-900/20 z-0" />
          )}
          
          {/* 좌우 분할 레이아웃 */}
          <div className="relative z-10 flex w-full h-full">
            {/* 왼쪽: 콘텐츠 (좌상단 정렬) */}
            <div className="flex-1 flex flex-col justify-start items-start px-8 md:px-16 lg:px-24 pt-24 md:pt-32">
              {/* 로고 이미지 */}
              {program.logoPath && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mb-6"
                >
                  <Image
                    src={program.logoPath}
                    alt={t(`items.${program.key}.title`)}
                    width={150}
                    height={150}
                    className="object-contain"
                    priority
                  />
                </motion.div>
              )}

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight drop-shadow-[0_0_20px_rgba(139,92,246,0.5)] text-left"
              >
                {t(`items.${program.key}.title`)}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl lg:text-xl text-neutral-300 mb-6 md:mb-8 max-w-2xl text-left"
                dangerouslySetInnerHTML={{ __html: t(`items.${program.key}.description`) }}
              />

              {/* 버튼 그룹 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col items-start gap-4"
              >
                {/* 다운로드 버튼과 플랫폼 안내 */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* 다운로드 버튼 */}
                  <a
                    href={program.downloadUrl}
                    target={program.external ? "_blank" : undefined}
                    rel={program.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] text-base md:text-lg"
                  >
                    {/* Windows 로고 SVG */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.8v-7.15l10 .2z" />
                    </svg>
                    <Download className="w-5 h-5" />
                    {t("download")}
                  </a>

                  {/* Mac & Linux 추가 예정 문구 */}
                  <p className="text-sm text-neutral-400">
                    {t("macLinuxComingSoon")}
                  </p>
                </div>

                {/* GitHub 링크 버튼 (있는 경우) */}
                {program.githubUrl && program.githubUrl.trim() !== "" && (
                  <a
                    href={program.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-700 transition-all hover:scale-105 border border-neutral-700 text-sm md:text-base"
                  >
                    <Github className="w-5 h-5" />
                    {t("viewOnGitHub")}
                  </a>
                )}
              </motion.div>

              {/* 버전 정보 */}
              {t(`items.${program.key}.version`, { defaultValue: "" }) && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-sm text-neutral-500 mt-6 md:mt-8"
                >
                  {t("version")}: {t(`items.${program.key}.version`)}
                </motion.p>
              )}
            </div>
          </div>

          {/* 스크롤 인디케이터 */}
          {index === programs.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 border-2 border-neutral-600 rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-3 bg-neutral-600 rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          )}
        </section>
      ))}

      {/* Coming Soon 섹션 */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center overflow-hidden bg-gradient-to-br from-neutral-950 via-purple-950/30 to-neutral-950">
        {/* 배경 효과 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)] z-0" />
        
        {/* 콘텐츠 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl px-6"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight drop-shadow-[0_0_30px_rgba(139,92,246,0.6)]"
          >
            {t("comingSoon.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-neutral-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t("comingSoon.description") }}
          />
        </motion.div>

        {/* 장식적 요소 */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl z-0" />
      </section>
    </div>
  );
}
