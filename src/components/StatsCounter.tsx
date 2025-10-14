"use client";

import { motion, animate, useInView, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  helper?: string;
  parentheticalValue?: number;
  parentheticalSuffix?: string;
};

type StatSection = {
  title: string;
  description: string;
  stats: Stat[];
  highlightStat?: Stat;
  duplicateShowMore?: boolean;
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

function StatValue({
  value,
  suffix,
  run,
  parentheticalValue,
  parentheticalSuffix,
  className = "",
  parentheticalClassName = "",
}: {
  value: number;
  suffix?: string;
  run: boolean;
  parentheticalValue?: number;
  parentheticalSuffix?: string;
  className?: string;
  parentheticalClassName?: string;
}) {
  const resolvedParentheticalSuffix = parentheticalSuffix ?? suffix;

  return (
    <div className="flex items-baseline gap-3 flex-wrap">
      <span className={`inline-flex items-baseline gap-1 ${className}`}>
        <Counter to={value} run={run} />
        {suffix ? <span>{suffix}</span> : null}
      </span>
      {parentheticalValue !== undefined ? (
        <span
          className={`inline-flex items-baseline gap-1 text-slate-300 ${parentheticalClassName}`}
        >
          (
          <Counter to={parentheticalValue} run={run} />
          {resolvedParentheticalSuffix ? (
            <span>{resolvedParentheticalSuffix}</span>
          ) : null}
          )
        </span>
      ) : null}
    </div>
  );
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const sections = useMemo<StatSection[]>(
    () => [
      {
        title: "since 1989 누적 성과",
        description:
          "37년 역사 속에서 축적된 합격 실적을 핵심 수치로 요약했습니다.",
        highlightStat: {
          label: "최종 합격자",
          value: 6405,
          suffix: "명",
          helper: "전 대학 및 전공 누적",
        },
        stats: [
          { label: "홍익대학교", value: 764, suffix: "명" },
          { label: "이화여자대학교", value: 521, suffix: "명" },
          { label: "국민대학교", value: 416, suffix: "명" },
          { label: "한국예술종합학교", value: 403, suffix: "명" },
          { label: "건국대학교", value: 386, suffix: "명" },
          { label: "건국대학교", value: 386, suffix: "명" },
          { label: "상명대학교", value: 293, suffix: "명" },
          { label: "동덕여자대학교", value: 257, suffix: "명" },
          { label: "서울과학기술대학교", value: 253, suffix: "명" },
          { label: "서울대학교", value: 247, suffix: "명" },
          { label: "성신여자대학교", value: 204, suffix: "명" },
          { label: "경희대학교", value: 203, suffix: "명" },
          { label: "서울여자대학교", value: 146, suffix: "명" },
          { label: "가천대학교", value: 146, suffix: "명" },
          { label: "중앙대학교", value: 136, suffix: "명" },
          { label: "숙명여자대학교", value: 129, suffix: "명" },
          { label: "단국대학교", value: 126, suffix: "명" },
          { label: "계원예술대학교", value: 117, suffix: "명" },
          { label: "한양대학교", value: 113, suffix: "명" },
          { label: "경기대학교", value: 110, suffix: "명" },
          { label: "호서대학교", value: 104, suffix: "명" },
          { label: "SADI", value: 92, suffix: "명" },
          { label: "덕성여자대학교", value: 92, suffix: "명" },
          { label: "한성대학교", value: 92, suffix: "명" },
          { label: "협성대학교", value: 91, suffix: "명" },
          { label: "명지대학교", value: 84, suffix: "명" },
          { label: "세종대학교", value: 79, suffix: "명" },
          { label: "고려대학교", value: 79, suffix: "명" },
          { label: "수원대학교", value: 73, suffix: "명" },
          { label: "서울시립대학교", value: 73, suffix: "명" },
          { label: "성균관대학교", value: 71, suffix: "명" },
          { label: "백석대학교", value: 64, suffix: "명" },
          { label: "추계예술대학교", value: 45, suffix: "명" },
          { label: "서경대학교", value: 46, suffix: "명" },
          { label: "용인대학교", value: 36, suffix: "명" },
          { label: "남서울대학교", value: 44, suffix: "명" },
          { label: "강남대학교", value: 42, suffix: "명" },
          { label: "강원대학교", value: 41, suffix: "명" },
          { label: "연세대학교", value: 41, suffix: "명" },
          { label: "인하대학교", value: 39, suffix: "명" },
          { label: "한세대학교", value: 33, suffix: "명" },
          { label: "세명대학교", value: 32, suffix: "명" },
          { label: "대진대학교", value: 32, suffix: "명" },
          { label: "인천대학교", value: 22, suffix: "명" },
          { label: "평택대학교", value: 14, suffix: "명" },
          { label: "인천카톨릭대학교", value: 14, suffix: "명" },
        ] satisfies Stat[],
      },
      {
        title: "2025학년도 주요 합격",
        description: "올해 확인된 합격자를 대학별로 추린 숫자입니다.",
        duplicateShowMore: true,
        highlightStat: {
          label: "2025학년도 총 합격자",
          value: 343,
          suffix: "명",
          helper: "*괄호 안 숫자는 본원 합격 수입니다.",
          parentheticalValue: 343,
          parentheticalSuffix: "명",
        },
        stats: [
          { label: "건국대학교", value: 43, suffix: "명" },
          { label: "홍익대학교", value: 25, suffix: "명" },
          { label: "국민대학교", value: 25, suffix: "명" },
          { label: "서울과학기술대학교", value: 24, suffix: "명" },
          { label: "호서대학교", value: 13, suffix: "명" },
          { label: "이화여자대학교", value: 13, suffix: "명" },
          { label: "고려대학교", value: 11, suffix: "명" },
          { label: "중앙대학교", value: 12, suffix: "명" },
          { label: "동덕여자대학교", value: 9, suffix: "명" },
          { label: "숙명여자대학교", value: 9, suffix: "명" },
          { label: "한성대학교", value: 9, suffix: "명" },
          { label: "성균관대학교", value: 9, suffix: "명" },
          { label: "성신여자대학교", value: 8, suffix: "명" },
          { label: "가천대학교", value: 8, suffix: "명" },
          { label: "한양대학교", value: 8, suffix: "명" },
          { label: "상명대학교", value: 7, suffix: "명" },
          { label: "서울대학교", value: 7, suffix: "명" },
          { label: "단국대학교", value: 7, suffix: "명" },
          { label: "연세대학교", value: 7, suffix: "명" },
          { label: "경희대학교", value: 6, suffix: "명" },
          { label: "서울여자대학교", value: 6, suffix: "명" },
          { label: "덕성여자대학교", value: 6, suffix: "명" },
          { label: "협성대학교", value: 6, suffix: "명" },
          { label: "서울시립대학교", value: 6, suffix: "명" },
          { label: "경기대학교", value: 4, suffix: "명" },
          { label: "SADI", value: 4, suffix: "명" },
          { label: "명지대학교", value: 4, suffix: "명" },
          { label: "수원대학교", value: 4, suffix: "명" },
          { label: "백석대학교", value: 4, suffix: "명" },
          { label: "서경대학교", value: 4, suffix: "명" },
          { label: "강남대학교", value: 4, suffix: "명" },
          { label: "인하대학교", value: 4, suffix: "명" },
          { label: "계원예술대학교", value: 5, suffix: "명" },
          { label: "한국예술종합학교", value: 3, suffix: "명" },
          { label: "세종대학교", value: 3, suffix: "명" },
          { label: "용인대학교", value: 3, suffix: "명" },
          { label: "남서울대학교", value: 3, suffix: "명" },
          { label: "한세대학교", value: 3, suffix: "명" },
          { label: "강원대학교", value: 2, suffix: "명" },
          { label: "세명대학교", value: 2, suffix: "명" },
          { label: "대진대학교", value: 2, suffix: "명" },
          { label: "인천대학교", value: 1, suffix: "명" },
        ] satisfies Stat[],
      },
    ],
    []
  );

  const [visibleCounts, setVisibleCounts] = useState<number[]>(() =>
    sections.map((section) => Math.min(6, section.stats.length))
  );

  const showMore = (sectionIndex: number) => {
    setVisibleCounts((prev) =>
      prev.map((count, index) =>
        index === sectionIndex
          ? Math.min(count + 6, sections[sectionIndex].stats.length)
          : count
      )
    );
  };

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-24 bg-slate-950 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-900/80" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            since 1989 Performance
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
                {section.highlightStat ? (
                  <motion.article
                    key={section.highlightStat.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={
                      inView
                        ? {
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: sectionIndex * 0.2,
                              duration: 0.6,
                              ease: "easeOut",
                            },
                          }
                        : { opacity: 0, y: 24 }
                    }
                    className="sm:col-span-2 lg:col-span-3 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-[0_25px_45px_-20px_rgba(15,23,42,0.8)]"
                  >
                    <StatValue
                      value={section.highlightStat.value}
                      suffix={section.highlightStat.suffix}
                      parentheticalValue={
                        section.highlightStat.parentheticalValue
                      }
                      parentheticalSuffix={
                        section.highlightStat.parentheticalSuffix
                      }
                      run={inView}
                      className="text-4xl md:text-5xl font-bold"
                      parentheticalClassName="text-2xl md:text-3xl font-semibold"
                    />
                    <div className="mt-2 text-base font-semibold text-slate-100">
                      {section.highlightStat.label}
                    </div>
                    {section.highlightStat.helper ? (
                      <p className="mt-3 text-sm text-slate-300">
                        {section.highlightStat.helper}
                      </p>
                    ) : null}
                  </motion.article>
                ) : null}

                {section.stats
                  .slice(0, visibleCounts[sectionIndex])
                  .map((stat, index) => (
                    <motion.article
                      key={stat.label}
                      initial={{ opacity: 0, y: 24 }}
                      animate={
                        inView
                          ? {
                              opacity: 1,
                              y: 0,
                              transition: {
                                delay:
                                  sectionIndex * 0.2 +
                                  (section.highlightStat ? index + 1 : index) *
                                    0.05,
                                duration: 0.6,
                                ease: "easeOut",
                              },
                            }
                          : { opacity: 0, y: 24 }
                      }
                      className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_15px_35px_-15px_rgba(15,23,42,0.6)]"
                    >
                      <StatValue
                        value={stat.value}
                        suffix={stat.suffix}
                        parentheticalValue={stat.parentheticalValue}
                        parentheticalSuffix={stat.parentheticalSuffix}
                        run={inView}
                        className="text-3xl font-bold"
                        parentheticalClassName="text-xl font-semibold"
                      />
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
              {visibleCounts[sectionIndex] < section.stats.length ? (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => showMore(sectionIndex)}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-sm font-medium text-slate-100"
                  >
                    더보기
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
