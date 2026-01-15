import "../globals.css";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";

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
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
