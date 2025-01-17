import type { Metadata } from "next";
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
    <div className="h-full flex flex-col">
      <main className="flex-1 overflow-hidden mb-16">{children}</main>
      <BottomNav />
    </div>
  );
}
