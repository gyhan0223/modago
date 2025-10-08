// src/components/StatsCounter.tsx
"use client";
import { motion, animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

function Counter({ to, run }: { to: number; run: boolean }) {
  const mv = useMotionValue(0);
  useEffect(() => {
    if (!run) return;
    const controls = animate(mv, to, { duration: 1.0, ease: "easeOut" });
    return () => controls.stop();
  }, [run, to, mv]);
  const [val, setVal] = useState(0);
  useEffect(() => mv.on("change", (v) => setVal(Math.floor(v))), [mv]);
  return <span>{val.toLocaleString()}</span>;
}

export default function StatsCounter() {
  const stats = [
    { label: "누적 합격자", value: 128, suffix: "" },
    { label: "전공 합격률", value: 92, suffix: "%" },
    { label: "연간 포트폴리오", value: 340, suffix: "" },
    // 필요하면 여기 더 추가
  ];

  // 섹션 스크롤 진행도에 따라 '보여줄 개수'를 늘림
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"], // 섹션 상하 여백 안에서 진행도 계산
  });
  const [showCount, setShowCount] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      // 진행도(0~1)에 따라 0~stats.length 로 선형 매핑
      const next = Math.min(stats.length, Math.ceil(v * stats.length));
      setShowCount(next);
    });
    return () => unsub();
  }, [scrollYProgress, stats.length]);

  return (
    <section ref={ref} className="py-[20vh] bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          성과로 증명합니다
        </h2>

        {/* 섹션 자체를 조금 길게 만들어 스크롤 여유 확보 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[30vh]">
          {stats.map((s, i) => {
            const visible = i < showCount; // 지금까지 스크롤한 만큼만 보이게
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="text-4xl font-extrabold">
                  <Counter to={s.value} run={visible} />
                  {s.suffix}
                </div>
                <div className="mt-2 text-sm opacity-80">{s.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
