"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { galleryTabs, getGallerySectionId } from "@/data/galleryTabs";

type MenuItem = { label: string; href: string };
type Align = "left" | "center" | "right";

/** 해버 인텐트: 마우스가 잠깐 벗어나도 닫힘을 지연 */
function useHoverIntent(delay = 140) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  const openNow = () => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    setOpen(true);
  };

  const closeSoon = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), delay);
  };

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  return { open, setOpen, openNow, closeSoon };
}

/** 해시(#) 링크는 <a>, 내부 라우팅은 <Link> */
function MenuLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const isHash = href.startsWith("#");
  if (isHash) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Dropdown({
  label,
  items,
  align = "center",
  widthClass = "w-56",
}: {
  label: string;
  items: MenuItem[];
  align?: Align;
  widthClass?: string;
}) {
  const { open, setOpen, openNow, closeSoon } = useHoverIntent(140);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      (e.currentTarget as HTMLElement).blur();
    }
  };

  const alignClass =
    align === "left"
      ? "left-0 -translate-x-0"
      : align === "right"
      ? "right-0 translate-x-0"
      : "left-1/2 -translate-x-1/2";

  return (
    <li
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={closeSoon}
    >
      {/* 트리거: 버튼으로 변경(접근성/모바일 탭 대응) */}
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className="hover:text-brand focus-visible:outline-none focus-visible:text-brand"
      >
        {label}
      </button>

      {/* 메뉴 */}
      <div
        role="menu"
        aria-hidden={!open}
        className={[
          "absolute top-full z-50 mt-2 rounded-lg border border-black/5 bg-white/95 p-2 text-sm shadow-lg transition-all duration-150 ease-out",
          widthClass,
          alignClass,
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none",
        ].join(" ")}
        onMouseEnter={openNow}
        onMouseLeave={closeSoon}
      >
        <ul className="space-y-1 text-left">
          {items.map((item) => (
            <li key={item.href}>
              <MenuLink
                href={item.href}
                className="block rounded-md px-3 py-1.5 text-gray-700 transition hover:bg-gray-100 hover:text-brand focus-visible:outline-none focus-visible:bg-gray-100 focus-visible:text-brand"
              >
                {item.label}
              </MenuLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

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

  // 드롭다운 아이템
  const resultsItems: MenuItem[] = [
    { label: "2025년 합격 결과", href: "/results/2025" },
    { label: "2024년 합격 결과", href: "/results/2024" },
    { label: "2023년 합격 결과", href: "/results/2023" },
    { label: "2022년 합격 결과", href: "/results/2022" },
    { label: "2021년 합격 결과", href: "/results/2021" },
    { label: "2020년 합격 결과", href: "/results/2020" },
    { label: "2010-2019 합격 결과", href: "/results/2010-2019" },
    { label: "2000-2009 합격 결과", href: "/results/2000-2009" },
    { label: "1991-1999 합격 결과", href: "/results/1991-1999" },
  ];
  const galleryItems: MenuItem[] = galleryTabs.map((tab) => ({
    label: tab.label,
    href: `#${getGallerySectionId(tab.id)}`,
  }));

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
          pinned
            ? "bg-white/85 shadow-sm border-b border-black/5"
            : "bg-white/60 supports-[backdrop-filter]:bg-white/50",
        ].join(" ")}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <ul className="h-12 md:h-14 flex items-center justify-center gap-6 md:gap-10 text-sm md:text-base">
            {/* 합격결과 드롭다운 */}
            <Dropdown
              label="합격 결과"
              items={resultsItems}
              widthClass="w-56"
            />

            {/* 갤러리 드롭다운 */}
            <Dropdown label="갤러리" items={galleryItems} widthClass="w-48" />
            <li>
              <Link href="/facilities" className="hover:text-brand">
                시설 안내
              </Link>
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
