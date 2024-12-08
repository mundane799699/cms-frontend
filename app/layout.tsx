import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "安然说钱-破茧",
  description: "你关注的人，决定了你看到的世界",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
