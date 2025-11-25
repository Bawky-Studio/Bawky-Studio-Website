import { redirect } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const t = useTranslations('HomePage');
  const { locale } = await props.params;
  redirect({href: '/main', locale: `${locale}`});
}
