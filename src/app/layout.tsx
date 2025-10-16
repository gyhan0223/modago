// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const siteName = "모다고 미술학원";
const siteUrl = "https://modago.me";
const siteTitle = "미대입시 준비의 모든 것 | 모다고";
const siteDesc =
  "미대학원(국내·해외) 포트폴리오, 실기·면접 대비, 합격 사례까지 한 번에. 개인 맞춤 커리큘럼으로 합격 가능성을 높여보세요.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | 모다고",
  },
  description: siteDesc,
  keywords: [
    "미대학원",
    "미대입시학원",
    "미대 준비",
    "미대 포트폴리오",
    "미대 재수학원",
    "미대 재수",
    "미대 입시",
  ],
  alternates: {
    canonical: siteUrl, // 각 상세 페이지에서 필요하면 개별 override
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDesc,
    images: [
      {
        url: "/og/graduate-art-hero.jpg", // 실제 이미지 준비(1200x630)
        width: 1200,
        height: 630,
        alt: "미대학원 포트폴리오/면접 대비",
      },
    ],
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDesc,
    images: ["/og/graduate-art-hero.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    // 네이버 서치어드바이저에서 발급받은 값을 넣어줘
    other: {
      "naver-site-verification": "naverba6d32323decfd8c0f859fb7a6799b76.html",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      {/* head 태그에 외부 폰트 링크 불필요: next/font 사용 중 */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${noto.className} bg-gray-50 text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
