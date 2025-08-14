import "./globals.css";
import type { Metadata } from "next";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Arabic Podcasts",
  description: "الإعلام المسموع 🎧",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#0f0f1a] text-white font-sans">
        <ReactQueryProvider>
          <header className="bg-[#121225] shadow-md p-4 sticky top-0 z-50">
            <h1 className="text-xl font-bold text-center text-purple-400">
              الإعلام المسموع 🎧
            </h1>
          </header>
          <main className="w-full px-4">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
