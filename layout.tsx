import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "心迹 Trace",
  description: "旅行记忆地图",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-dvh bg-neutral-100 font-sans text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
