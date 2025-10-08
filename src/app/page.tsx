"use client";
import { motion } from "framer-motion";
import NavBarSticky from "@/components/NavBarSticky";
import HeroTopBadge from "@/components/HeroTopBadge";
import HeroScrollArrow from "@/components/HeroScrollArrow";

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative">
        <section
          className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-6 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.png')" }}
        >
          <HeroTopBadge />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <HeroScrollArrow /> {/* 👇 화살표 추가 (아래에서 정의) */}
        </section>
      </div>

      {/* 히어로 바로 아래 겹치는 Sticky 네비 */}
      <NavBarSticky />

      {/* ▶️ 네비게이션 아래로 내려온 중앙 문구 */}
      <section
        id="after-hero"
        className="mt-12 md:mt-16 pt-10 md:pt-14 pb-10 text-center px-6 bg-brand-light/60"
      >
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            개성을 결과로 만드는
            <br />
            <span className="text-brand">모두다른고양이 입시미술학원</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-6 text-gray-600 text-lg md:text-xl"
          >
            당신의 예술은 세상에 단 하나입니다.
          </motion.p>
        </div>
      </section>

      {/* 이후 섹션들 */}
      <section id="philosophy" className="py-32 px-6 bg-brand/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold">철학</h2>
          <p className="mt-4 text-gray-600">
            “우리는 단순히 합격을 목표로 하지 않습니다. 예술가로서의 감각을
            키우는 데 집중합니다.”
          </p>
        </div>
      </section>

      <section id="education" className="py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold">교육 방식</h2>
          <p className="mt-4 text-gray-600">
            “매일의 피드백, 개인 맞춤 커리큘럼, 그리고 진심 어린 지도.”
          </p>
        </div>
      </section>

      <section id="result" className="py-32 px-6 bg-brand/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold">결과</h2>
          <p className="mt-4 text-gray-600">
            “누적 합격생 00명, 주요 예대 합격률 00%.”
          </p>
        </div>
      </section>

      <section id="consult" className="py-32 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">메시지</h2>
        {/* 상담 폼/링크… */}
      </section>
    </main>
  );
}
