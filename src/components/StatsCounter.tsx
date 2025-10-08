"use client";

import { motion, animate, useInView, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  helper?: string;
};

function Counter({ to, run }: { to: number; run: boolean }) {
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!run) return;
    const controls = animate(mv, to, { duration: 1.2, ease: "easeOut" });
    return () => controls.stop();
  }, [mv, run, to]);

  useEffect(() => mv.on("change", (v) => setVal(Math.round(v))), [mv]);

  return <span>{val.toLocaleString()}</span>;
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const sections = useMemo(
    () => [
      {
        title: "since1989 누적 성과",
        description:
          "35년 역사 속에서 축적된 합격 실적을 핵심 수치로 요약했습니다.",
        stats: [
          {
            label: "최종 합격자",
            value: 6405,
            suffix: "명",
            helper: "전 대학 및 전공 누적",
          },
          { label: "홍익대학교", value: 764, suffix: "명" },
          { label: "이화여자대학교", value: 521, suffix: "명" },
          { label: "국민대학교", value: 416, suffix: "명" },
          { label: "한국예술종합학교", value: 403, suffix: "명" },
          { label: "건국대학교", value: 386, suffix: "명" },
        ] satisfies Stat[],
      },
      {
        title: "2025학년도 주요 합격",
        description:
          "올해 확인된 대표 합격자를 대학별로 추린 숫자입니다.",
        stats: [
          { label: "건국대학교", value: 43, suffix: "명" },
          { label: "홍익대학교", value: 25, suffix: "명" },
          { label: "국민대학교", value: 25, suffix: "명" },
          { label: "서울과학기술대학교", value: 24, suffix: "명" },
          { label: "이화여자대학교", value: 13, suffix: "명" },
          { label: "호서대학교", value: 13, suffix: "명" },
        ] satisfies Stat[],
      },
      {
        title: "주요 사립대 합격 네트워크",
        description:
          "디자인·예술 계열 상위권 대학에서 쌓아 온 신뢰를 보여줍니다.",
        stats: [
          { label: "서울대학교", value: 247, suffix: "명" },
          { label: "연세대학교", value: 41, suffix: "명" },
          { label: "고려대학교", value: 79, suffix: "명" },
          { label: "성균관대학교", value: 71, suffix: "명" },
          { label: "한양대학교", value: 113, suffix: "명" },
          { label: "중앙대학교", value: 136, suffix: "명" },
        ] satisfies Stat[],
      },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-slate-950 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-900/80" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            since1989 Performance
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
            숫자로 증명하는 모다고 합격 파워
          </h2>
          <p className="mt-4 text-base text-slate-300">
            방대한 합격자 명단 중 핵심 수치만 선별해 한눈에 확인할 수 있도록
            재구성했습니다.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {sections.map((section, sectionIndex) => (
            <div key={section.title}>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-semibold">{section.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.stats.map((stat, index) => (
                  <motion.article
                    key={stat.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={
                      inView
                        ? {
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: sectionIndex * 0.2 + index * 0.05,
                              duration: 0.6,
                              ease: "easeOut",
                            },
                          }
                        : { opacity: 0, y: 24 }
                    }
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_15px_35px_-15px_rgba(15,23,42,0.6)]"
                  >
                    <div className="text-3xl font-bold">
                      <Counter to={stat.value} run={inView} />
                      {stat.suffix}
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-100">
                      {stat.label}
                    </div>
                    {stat.helper ? (
                      <p className="mt-2 text-xs text-slate-400">
                        {stat.helper}
                      </p>
                    ) : null}
                  </motion.article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
