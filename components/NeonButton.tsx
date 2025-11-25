"use client";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

type NeonButtonProps = {
  label: string;
  href: string;
  locale?: string; // ✅ locale prop 추가 (선택적)
};

export const NeonButton = ({ label, href, locale }: NeonButtonProps) => {
  // locale이 전달되지 않았다면 현재 locale을 자동 감지
  const currentLocale = useLocale();

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Link
        href={href}
        locale={locale || currentLocale}
        className="px-6 py-3 rounded-xl border border-secondary text-secondary font-press text-xs shadow-neon hover:shadow-[0_0_16px_#0EA5E9] transition-all"
      >
        {label}
      </Link>
    </motion.div>
  );
};
