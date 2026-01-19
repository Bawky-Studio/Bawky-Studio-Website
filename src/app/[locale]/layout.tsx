import "../globals.css";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: {
      default: t("defaultTitle"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("defaultDescription"),
    icons: {
      icon: "/bawky.svg",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let messages;
  try {
    const namespaces = [
      "common",
      "nav",
      "home",
      "games",
      "gameDetail",
      "software",
      "events",
      "eventDetail",
      "studio",
      "team",
      "meta",
    ] as const;
    const entries = await Promise.all(
      namespaces.map(async (namespace) => [
        namespace,
        (await import(`../../i18n/messages/${locale}/${namespace}.json`)).default,
      ])
    );
    const baseMessages = Object.fromEntries(entries);
    messages = {
      ...baseMessages,
      event: baseMessages.events,
      programs: baseMessages.software,
      teams: baseMessages.team,
      about: baseMessages.studio,
    };
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="bg-black text-white min-h-screen relative">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
