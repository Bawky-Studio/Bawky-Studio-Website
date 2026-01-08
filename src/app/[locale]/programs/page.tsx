"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Download, Github } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface Program {
  key: string;
  downloadUrlWindows: string;
  downloadUrlMac: string;
  downloadUrlLinux: string;
  githubUrl?: string;
  external?: boolean;
  logoPath?: string; // 로고 이미지 경로
  screenshotPath?: string; // 프로그램 실행 사진 경로
}

const programs: Program[] = [
  {
    key: "kalivra",
    downloadUrlWindows: "https://github.com/DevBawky/Kalivra/releases/download/v1.0.1/Windows_Kalivra-Setup-1.0.1.exe",
    downloadUrlMac: "https://github.com/DevBawky/Kalivra/releases/download/v1.0.1/Mac_Kalivra-1.0.1-arm64.dmg",
    downloadUrlLinux: "https://github.com/DevBawky/Kalivra/releases/download/v1.0.1/Linux_Kalivra-1.0.1.AppImage",
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
                    href={program.downloadUrlWindows}
                    target={program.external ? "_blank" : undefined}
                    rel={program.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] text-base md:text-lg"
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
                    {t("download")}
                  </a>
                  <a
                    href={program.downloadUrlMac}
                    target={program.external ? "_blank" : undefined}
                    rel={program.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] text-base md:text-lg"
                  >
                    {/* Mac 로고 SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-apple" viewBox="0 0 16 16">
                      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
                      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
                    </svg>
                    {t("download")}
                  </a>
                  <a
                    href={program.downloadUrlLinux}
                    target={program.external ? "_blank" : undefined}
                    rel={program.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] text-base md:text-lg"
                  >
                    {/* Linux 로고 SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tux" viewBox="0 0 16 16">
                      <path d="M8.996 4.497c.104-.076.1-.168.186-.158s.022.102-.098.207c-.12.104-.308.243-.46.323-.291.152-.631.336-.993.336s-.647-.167-.853-.33c-.102-.082-.186-.162-.248-.221-.11-.086-.096-.207-.052-.204.075.01.087.109.134.153.064.06.144.137.241.214.195.154.454.304.778.304s.702-.19.932-.32c.13-.073.297-.204.433-.304M7.34 3.781c.055-.02.123-.031.174-.003.011.006.024.021.02.034-.012.038-.074.032-.11.05-.032.017-.057.052-.093.054-.034 0-.086-.012-.09-.046-.007-.044.058-.072.1-.089m.581-.003c.05-.028.119-.018.173.003.041.017.106.045.1.09-.004.033-.057.046-.09.045-.036-.002-.062-.037-.093-.053-.036-.019-.098-.013-.11-.051-.004-.013.008-.028.02-.034"/>
                      <path fill-rule="evenodd" d="M8.446.019c2.521.003 2.38 2.66 2.364 4.093-.01.939.509 1.574 1.04 2.244.474.56 1.095 1.38 1.45 2.32.29.765.402 1.613.115 2.465a.8.8 0 0 1 .254.152l.001.002c.207.175.271.447.329.698.058.252.112.488.224.615.344.382.494.667.48.922-.015.254-.203.43-.435.57-.465.28-1.164.491-1.586 1.002-.443.527-.99.83-1.505.871a1.25 1.25 0 0 1-1.256-.716v-.001a1 1 0 0 1-.078-.21c-.67.038-1.252-.165-1.718-.128-.687.038-1.116.204-1.506.206-.151.331-.445.547-.808.63-.5.114-1.126 0-1.743-.324-.577-.306-1.31-.278-1.85-.39-.27-.057-.51-.157-.626-.384-.116-.226-.095-.538.07-.988.051-.16.012-.398-.026-.648a2.5 2.5 0 0 1-.037-.369c0-.133.022-.265.087-.386v-.002c.14-.266.368-.377.577-.451s.397-.125.53-.258c.143-.15.27-.374.443-.56q.036-.037.073-.07c-.081-.538.007-1.105.192-1.662.393-1.18 1.223-2.314 1.811-3.014.502-.713.65-1.287.701-2.016.042-.997-.705-3.974 2.112-4.2q.168-.015.321-.013m2.596 10.866-.03.016c-.223.121-.348.337-.427.656-.08.32-.107.733-.13 1.206v.001c-.023.37-.192.824-.31 1.267s-.176.862-.036 1.128v.002c.226.452.608.636 1.051.601s.947-.304 1.36-.795c.474-.576 1.218-.796 1.638-1.05.21-.126.324-.242.333-.4.009-.157-.097-.403-.425-.767-.17-.192-.217-.462-.274-.71-.056-.247-.122-.468-.26-.585l-.001-.001c-.18-.157-.356-.17-.565-.164q-.069.001-.14.005c-.239.275-.805.612-1.197.508-.359-.09-.562-.508-.587-.918m-7.204.03H3.83c-.189.002-.314.09-.44.225-.149.158-.276.382-.445.56v.002h-.002c-.183.184-.414.239-.61.31-.195.069-.353.143-.46.35v.002c-.085.155-.066.378-.029.624.038.245.096.507.018.746v.002l-.001.002c-.157.427-.155.678-.082.822.074.143.235.22.48.272.493.103 1.26.069 1.906.41.583.305 1.168.404 1.598.305.431-.098.712-.369.75-.867v-.002c.029-.292-.195-.673-.485-1.052-.29-.38-.633-.752-.795-1.09v-.002l-.61-1.11c-.21-.286-.43-.462-.68-.5a1 1 0 0 0-.106-.008M9.584 4.85c-.14.2-.386.37-.695.467-.147.048-.302.17-.495.28a1.3 1.3 0 0 1-.74.19.97.97 0 0 1-.582-.227c-.14-.113-.25-.237-.394-.322a3 3 0 0 1-.192-.126c-.063 1.179-.85 2.658-1.226 3.511a5.4 5.4 0 0 0-.43 1.917c-.68-.906-.184-2.066.081-2.568.297-.55.343-.701.27-.649-.266.436-.685 1.13-.848 1.844-.085.372-.1.749.01 1.097.11.349.345.67.766.931.573.351.963.703 1.193 1.015s.302.584.23.777a.4.4 0 0 1-.212.22.7.7 0 0 1-.307.056l.184.235c.094.124.186.249.266.375 1.179.805 2.567.496 3.568-.218.1-.342.197-.664.212-.903.024-.474.05-.896.136-1.245s.244-.634.53-.791a1 1 0 0 1 .138-.061q.005-.045.013-.087c.082-.546.569-.572 1.18-.303.588.266.81.499.71.814h.13c.122-.398-.133-.69-.822-1.025l-.137-.06a2.35 2.35 0 0 0-.012-1.113c-.188-.79-.704-1.49-1.098-1.838-.072-.003-.065.06.081.203.363.333 1.156 1.532.727 2.644a1.2 1.2 0 0 0-.342-.043c-.164-.907-.543-1.66-.735-2.014-.359-.668-.918-2.036-1.158-2.983M7.72 3.503a1 1 0 0 0-.312.053c-.268.093-.447.286-.559.391-.022.021-.05.04-.119.091s-.172.126-.321.238q-.198.151-.13.38c.046.15.192.325.459.476.166.098.28.23.41.334a1 1 0 0 0 .215.133.9.9 0 0 0 .298.066c.282.017.49-.068.673-.173s.34-.233.518-.29c.365-.115.627-.345.709-.564a.37.37 0 0 0-.01-.309c-.048-.096-.148-.187-.318-.257h-.001c-.354-.151-.507-.162-.705-.29-.321-.207-.587-.28-.807-.279m-.89-1.122h-.025a.4.4 0 0 0-.278.135.76.76 0 0 0-.191.334 1.2 1.2 0 0 0-.051.445v.001c.01.162.041.299.102.436.05.116.109.204.183.274l.089-.065.117-.09-.023-.018a.4.4 0 0 1-.11-.161.7.7 0 0 1-.054-.22v-.01a.7.7 0 0 1 .014-.234.4.4 0 0 1 .08-.179q.056-.069.126-.073h.013a.18.18 0 0 1 .123.05c.045.04.08.09.11.162a.7.7 0 0 1 .054.22v.01a.7.7 0 0 1-.002.17 1.1 1.1 0 0 1 .317-.143 1.3 1.3 0 0 0 .002-.194V3.23a1.2 1.2 0 0 0-.102-.437.8.8 0 0 0-.227-.31.4.4 0 0 0-.268-.102m1.95-.155a.63.63 0 0 0-.394.14.9.9 0 0 0-.287.376 1.2 1.2 0 0 0-.1.51v.015q0 .079.01.152c.114.027.278.074.406.138a1 1 0 0 1-.011-.172.8.8 0 0 1 .058-.278.5.5 0 0 1 .139-.2.26.26 0 0 1 .182-.069.26.26 0 0 1 .178.081c.055.054.094.12.124.21.029.086.042.17.04.27l-.002.012a.8.8 0 0 1-.057.277c-.024.059-.089.106-.122.145.046.016.09.03.146.052a5 5 0 0 1 .248.102 1.2 1.2 0 0 0 .244-.763 1.2 1.2 0 0 0-.11-.495.9.9 0 0 0-.294-.37.64.64 0 0 0-.39-.133z"/>
                    </svg>
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
                    className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-neutral-800 text-white font-normal rounded-lg hover:bg-neutral-700 transition-all hover:scale-105 border border-neutral-700 text-sm md:text-base"
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
