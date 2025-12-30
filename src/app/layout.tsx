import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bonjugi Tech Blog",
    template: "%s | Bonjugi Tech Blog",
  },
  description: "Bonjugi의 기술 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <header className="border-b border-border">
          <nav className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold hover:opacity-80">
              Tech Blog
            </Link>
            <ul className="flex items-center gap-6">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/tags"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tags
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-border mt-auto">
          <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Bonjugi의 Tech Blog
          </div>
        </footer>
      </body>
    </html>
  );
}
