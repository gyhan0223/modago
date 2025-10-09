"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * 히어로 바로 아래에 배치하면,
 * - 처음엔 히어로 하단에 겹쳐 보이고(-mt-값)
 * - 스크롤해서 상단에 닿으면 sticky top-0 로 고정되는 네비게이션 바
 */
export default function NavBarSticky() {
  const [pinned, setPinned] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setPinned(!entry.isIntersecting),
      { rootMargin: "-1px 0px 0px 0px", threshold: [0, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const updateHeight = () => {
      setNavHeight(nav.getBoundingClientRect().height);
    };

    updateHeight();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(updateHeight);
      ro.observe(nav);
      return () => ro.disconnect();
    }

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="relative">
      {/* sentinel: 이 선이 화면 상단 밖으로 나가면 pinned=true */}
      <div ref={sentinelRef} aria-hidden className="h-0" />
      {pinned ? <div aria-hidden style={{ height: navHeight }} /> : null}

      <nav
        ref={navRef}
        className={[
          pinned ? "fixed inset-x-0 top-0" : "relative",
          "z-40 w-full",
          "transition-all duration-300",
          "backdrop-blur-md",
          // pinned 여부에 따라 불투명도/그림자/테두리 강화
          pinned
            ? "bg-white/85 shadow-sm border-b border-black/5"
            : "bg-white/60 supports-[backdrop-filter]:bg-white/50",
        ].join(" ")}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <ul className="h-12 md:h-14 flex items-center justify-center gap-6 md:gap-10 text-sm md:text-base">
            <li>
              <a href="#stats" className="hover:text-brand">
                합격자
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-brand">
                갤러리
              </a>
            </li>
            <li>
              <a href="#program" className="hover:text-brand">
                프로그램
              </a>
            </li>
            <li>
              <a href="#teachers" className="hover:text-brand">
                강사진
              </a>
            </li>
            <li>
              <a href="#consult" className="hover:text-brand">
                상담문의
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
