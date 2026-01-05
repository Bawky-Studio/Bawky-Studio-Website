"use client";
import { Link } from "@/i18n/navigation"
import { usePathname } from "@/i18n/navigation";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const pathname = usePathname(); // ✅ locale 제거된 경로 반환 (예: "/games")
  const locale = useLocale();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const switchLocale = locale === "en" ? "ko" : "en";

  const handleLanguageSwitch = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      // ✅ next-intl 구조에서 올바른 로케일 prefix 경로 생성
      const newPath = `/${switchLocale}${pathname}`;
      router.push(newPath);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[rgba(0,0,0,0.8)] backdrop-blur-md border-b border-[#222]/60 px-6 py-4 flex justify-between items-center">
        {/* 로고 */}
        <h1 className="font-press text-primary text-xs sm:text-sm">BAWKY</h1>

        {/* 메뉴 */}
        <div className="flex gap-6 text-[11px] sm:text-sm text-gray-200 items-center">
          <Link href="/" locale={locale}>Home</Link>
          <Link href="/games" locale={locale}>Games</Link>
          <Link href="/events" locale={locale}>Event</Link>
          <Link href="/programs" locale={locale}>Programs</Link>
          <Link href="/team" locale={locale}>Team</Link>
          <Link href="/about" locale={locale}>About</Link>

          {/* 구분선 */}
          <span className="text-gray-500">|</span>

          {/* 🌐 언어 토글 */}
          <button
            onClick={handleLanguageSwitch}
            className="text-gray-400 hover:text-accent transition-colors text-[11px] sm:text-sm font-semibold"
          >
            {locale === "en" ? (
              <>
                🇰🇷 <span className="ml-1">KR</span>
              </>
            ) : (
              <>
                🇺🇸 <span className="ml-1">EN</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* 페이드 전환 오버레이 */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
};
