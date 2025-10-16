// src/app/sitemap.ts
import type { MetadataRoute } from "next";

// 정적 경로 + 동적 경로(fetch) 조합 가능
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://modago.me";
  const staticPages = [
    "", // 홈
    "/about",
    "/admissions",
    "/graduate-art", // ← "미대학원" 메인 허브 URL(예시)
    "/contact",
  ];

  return staticPages.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "" || p === "/graduate-art" ? 1.0 : 0.7,
  }));
}
