import "../globals.css";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { icons, Youtube } from "lucide-react";

export const metadata ={
  title: "Bawky Studio",
  icons:{
    icon: "/bawky.svg"
  }
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
    messages = (await import(`../../locales/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="bg-black text-white min-h-screen relative">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />

          <Link
            href="https://www.youtube.com/@DevBawky"
            target="_blank"
            rel="noopener noreferrer"
            className="
              fixed bottom-6 right-6
              flex items-center gap-2 px-4 py-2
              rounded-full bg-red-600/80 hover:bg-red-600
              text-white font-bold shadow-[0_0_15px_#ff0000aa]
              border border-red-400/40 backdrop-blur-sm
              hover:scale-105 hover:shadow-[0_0_25px_#ff4444]
              transition-all duration-200 z-50
            "
          >
            <Youtube size={18} />
          </Link>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
