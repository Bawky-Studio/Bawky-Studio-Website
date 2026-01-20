import { useTranslations } from "next-intl";

export default function DevlogPage() {
  const t = useTranslations("studio");
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900" data-nav-theme="light">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">{t("devlog.title")}</h1>
        <p className="mt-6 text-base md:text-lg text-neutral-600">
          {t("devlog.description")}
        </p>
      </div>
    </div>
  );
}
