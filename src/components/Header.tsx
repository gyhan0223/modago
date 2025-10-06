// src/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* 로고 라인 */}
        <div className="h-20 md:h-24 flex items-center justify-center">
          <Link href="/" aria-label="홈으로 이동" className="inline-flex">
            <img
              src="/logo.png"
              alt="모두다른고양이 로고"
              className="h-30 md:h-35 w-auto"
            />
          </Link>
        </div>

        {/* 위 선 */}
        <div className="border-t border-gray-200" />

        {/* 네비게이션 (가운데 정렬) */}
        <nav className="py-4 md:py-6 flex items-center justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm md:text-base text-gray-700">
            <li>
              <a href="#gallery" className="hover:text-black">
                합격자
              </a>
            </li>
            <li>
              <a href="#program" className="hover:text-black">
                프로그램
              </a>
            </li>
            <li>
              <a href="#teachers" className="hover:text-black">
                강사진
              </a>
            </li>
            <li>
              <a
                href="#consult"
                className="px-4 py-2 rounded-md bg-brand text-white hover:bg-brand-dark transition"
              >
                상담문의
              </a>
            </li>
          </ul>
        </nav>

        {/* 아래 선 */}
        <div className="border-b border-gray-200" />
      </div>
    </header>
  );
}
