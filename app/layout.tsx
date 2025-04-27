import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyApp",
  description: "MyApp description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
