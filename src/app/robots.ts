// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // 크롤링 막는 경로가 있다면 여기에 Disallow 추가
        // disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: "https://modago.me/sitemap.xml",
    host: "https://modago.me",
  };
}
