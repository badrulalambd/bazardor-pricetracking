
import type { Metadata } from "next";
import { Suspense } from "react";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/header/Navbar";
import HeaderBottom from "@/components/header/HeaderBottom";
import FooterMain from "@/components/footer/FooterMain";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজার দর",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased bg-(--bg-blue-200)`}
    >
      <body className="min-h-screen flex flex-col">

        <div className="sticky top-0 z-50">
          <Suspense fallback={<div className="min-h-20" />}>
            <Navbar />
          </Suspense>
        </div>

        <Suspense fallback={<div className="min-h-10" />}>
          <HeaderBottom />
        </Suspense>

        <main className="flex-1">{children}</main>

        <FooterMain />
        <ToastContainer />
      </body>
    </html>
  );
}