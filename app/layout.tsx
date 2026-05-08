import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import HeaderWrapper from "@/components/HeaderWrapper";
import BottomNav from "@/components/BottomNav";
import WebVitalsReporter from "@/components/WebVitalsReporter";
import { ApolloWrapper } from "@/lib/apollo-client";
import { QueryProvider } from "@/lib/query-provider";
import SkipLink from "@/components/SkipLink";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://signal-notes.example.com"),
  title: {
    default: "Signal Notes | Modern Tech Blog",
    template: "%s | Signal Notes",
  },
  description:
    "A modern blog for articles about AI, programming, product design, and software engineering.",
  openGraph: {
    title: "Signal Notes | Modern Tech Blog",
    description:
      "A modern blog for articles about AI, programming, product design, and software engineering.",
    siteName: "Signal Notes",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Signal Notes | Modern Tech Blog",
    description:
      "A modern blog for articles about AI, programming, product design, and software engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${poppins.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink font-sans" suppressHydrationWarning>
        <SkipLink />
        <ApolloWrapper>
          <QueryProvider>
            <HeaderWrapper />
            <div className="flex-1 pb-16 md:pb-0">{children}</div>
            <Footer />
            <BottomNav />
          </QueryProvider>
        </ApolloWrapper>
        <WebVitalsReporter />
      </body>
    </html>
  );
}
