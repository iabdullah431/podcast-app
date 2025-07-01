import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <title>Arabic Podcasts</title>
      <body className="bg-[#0f0f1a] text-white font-sans">
        <header className="bg-[#121225] shadow-md p-4 sticky top-0 z-50">
          <h1 className="text-xl font-bold text-center text-purple-400">
            الإعلام المسموع 🎧
          </h1>
        </header>
        <main className="w-full px-4">{children}</main>
      </body>
    </html>
  );
}
