import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "安然说钱-破茧",
  description: "你关注的人，决定了你看到的世界",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
