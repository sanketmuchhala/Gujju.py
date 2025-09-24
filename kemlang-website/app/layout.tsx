import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "KemLang - Gujarati Programming Language",
    template: "%s | KemLang"
  },
  description: "KemLang is a fun programming language that lets you code in Gujarati. Write programs using Gujarati keywords and syntax.",
  keywords: ["KemLang", "Gujarati", "programming language", "code", "syntax"],
  authors: [{ name: "KemLang Team" }],
  creator: "KemLang Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kemlang.dev",
    title: "KemLang - Gujarati Programming Language",
    description: "KemLang is a fun programming language that lets you code in Gujarati. Write programs using Gujarati keywords and syntax.",
    siteName: "KemLang",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KemLang - Gujarati Programming Language",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KemLang - Gujarati Programming Language",
    description: "KemLang is a fun programming language that lets you code in Gujarati. Write programs using Gujarati keywords and syntax.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}