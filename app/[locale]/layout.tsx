import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessagesProvider } from "@/components/i18n/MessagesProvider";
import { getDictionary } from "@/lib/messages";
import { isLocale, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const raw = params.locale;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const messages = getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} messages={messages} />
      <MessagesProvider messages={messages}>
        <main className="min-h-[50vh]">{children}</main>
      </MessagesProvider>
      <Footer locale={locale} messages={messages} />
    </>
  );
}
