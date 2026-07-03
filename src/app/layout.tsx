import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LiquidCursor from "./components/LiquidCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhiraj Sharma - Full-Stack Developer Portfolio",
  description: "Full-stack developer specializing in PHP, MySQL, Java, and modern web technologies. Building robust web applications from database architectures to polished interfaces.",
  keywords: "Full-stack Developer, Web Developer, PHP, MySQL, React, Next.js, Portfolio",
  authors: [{ name: "Dhiraj Sharma" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LiquidCursor />
        {children}
      </body>
    </html>
  );
}
