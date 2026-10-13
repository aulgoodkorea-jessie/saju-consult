import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { copy } from "@/lib/copy";
import "./globals.css";

export const metadata: Metadata = {
  title: copy.wordmark,
  description: "개인 사주 데이터를 바탕으로 고민을 정리하는 AI 상담",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <Header />
        <main className="mx-auto min-h-screen max-w-3xl px-4 pb-28">{children}</main>
      </body>
    </html>
  );
}
