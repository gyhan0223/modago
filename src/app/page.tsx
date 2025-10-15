"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import NavBarSticky from "@/components/NavBarSticky";
import HeroTopBadge from "@/components/HeroTopBadge";
import HeroScrollArrow from "@/components/HeroScrollArrow";
import StickyGallery from "@/components/StickyGallery";
import StatsCounter from "@/components/StatsCounter";
import ConsultSection from "@/components/ConsultSection";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
};

type StudioSlide = {
  src: string;
  alt: string;
  caption: string;
};

const STUDIO_SLIDES: StudioSlide[] = [
  {
    src: "/studio/01.jpg",
    alt: "모두다른고양이 스튜디오",
    caption:
      "매일 업데이트되는 작업실 쇼케이스와 레퍼런스 라이브러리로 영감을 쌓아갑니다.",
  },
  {
    src: "/studio/02.jpg",
    alt: "드로잉 피드백 세션",
    caption:
      "전임 강사진이 진행하는 드로잉 피드백 세션에서 실시간 코칭으로 표현력을 다듬습니다.",
  },
  {
    src: "/studio/03.jpg",
    alt: "학생 포트폴리오 전시",
    caption:
      "완성된 포트폴리오 작업을 스튜디오 전시 공간에 직접 걸어보며 발표 감각을 키웁니다.",
  },
];

const DISPLAY_DELAY = 3000;
const MAX_WAIT_FOR_NEXT = 4000;

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<boolean[]>(() =>
    STUDIO_SLIDES.map(() => false)
  );

  const loadedIndicesRef = useRef(new Set<number>());
  const preloadingRef = useRef(new Set<number>());

  const markSlideLoaded = useCallback((index: number) => {
    if (loadedIndicesRef.current.has(index)) return;
    loadedIndicesRef.current.add(index);
    setLoadedSlides((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  const prefetchImage = useCallback(
    (index: number) => {
      if (typeof window === "undefined") return;
      if (loadedIndicesRef.current.has(index)) return;
      if (preloadingRef.current.has(index)) return;

      preloadingRef.current.add(index);

      const img = new window.Image();
      img.src = STUDIO_SLIDES[index].src;

      const finalize = () => {
        preloadingRef.current.delete(index);
        markSlideLoaded(index);
      };

      if ("decode" in img && typeof img.decode === "function") {
        img.decode().then(finalize).catch(finalize);
      } else {
        img.onload = finalize;
        img.onerror = finalize;
      }
    },
    [markSlideLoaded]
  );

  useEffect(() => {
    const total = STUDIO_SLIDES.length;
    if (total === 0) return;

    const indicesToPrefetch = new Set<number>();
    indicesToPrefetch.add(currentSlide);
    indicesToPrefetch.add((currentSlide + 1) % total);
    indicesToPrefetch.add((currentSlide + 2) % total);

    indicesToPrefetch.forEach((index) => prefetchImage(index));
  }, [currentSlide, prefetchImage]);

  useEffect(() => {
    if (isPaused) return;

    const total = STUDIO_SLIDES.length;
    if (total <= 1) return;

    const nextIndex = (currentSlide + 1) % total;
    let delayTimer: number | undefined;
    let fallbackTimer: number | undefined;

    const scheduleAdvance = () => {
      if (delayTimer !== undefined) return;
      delayTimer = window.setTimeout(() => {
        setCurrentSlide(nextIndex);
      }, DISPLAY_DELAY);
    };

    if (loadedSlides[nextIndex]) {
      scheduleAdvance();
    } else {
      fallbackTimer = window.setTimeout(() => {
        scheduleAdvance();
      }, MAX_WAIT_FOR_NEXT);
    }

    return () => {
      if (delayTimer !== undefined) {
        window.clearTimeout(delayTimer);
      }
      if (fallbackTimer !== undefined) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, [currentSlide, isPaused, loadedSlides]);

  const goToSlide = (index: number) => {
    const total = STUDIO_SLIDES.length;
    setCurrentSlide((index + total) % total);
  };

  const handlePrev = () => {
    goToSlide(currentSlide - 1);
  };

  const handleNext = () => {
    goToSlide(currentSlide + 1);
  };

  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-6">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,217,191,0.45)_0%,_rgba(255,255,255,0)_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(0,0,0,0.55)_0%,_rgba(0,0,0,0.25)_45%,_rgba(0,0,0,0)_80%)]" />
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{ backgroundImage: "url('/hero.png')" }}
            />
          </div>

          <HeroTopBadge />

          <div className="relative z-30 w-full max-w-6xl mx-auto text-left text-white">
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.6 }}
              className="text-sm uppercase tracking-[0.3em] text-white/80"
            >
              hongdae modago art institute
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
              className="mt-6 text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]"
            />
            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-8 max-w-2xl text-lg md:text-xl text-white/80"
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#consult"
                className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-3 text-base font-semibold text-white shadow-lg shadow-brand/40 transition hover:bg-brand-dark"
              >
                1:1 상담 예약하기
              </a>
              <a
                href="#program"
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                커리큘럼 살펴보기
              </a>
            </motion.div>
          </div>

          <HeroScrollArrow />
        </section>
      </div>

      {/* Sticky Navigation */}
      <NavBarSticky />

      {/* Brand Message */}
      <section
        id="after-hero"
        className="relative z-10 border-y border-gray-100 bg-white py-20"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-semibold leading-tight text-gray-900"
          >
            누구나, 지금 수준에서 시작할 수 있는 미술 교육
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-gray-600"
          >
            시작점은 모두 다릅니다.
            <br />
            <br />
            처음 시작하는 학생부터 이미 준비 중인 학생까지
            <br />
            개인의 실기 수준과 목표에 맞춰 1:1 맞춤형 커리큘럼으로 지도합니다.
            <br />
            부담 없이 시작하고, 꾸준히 성장할 수 있도록 함께합니다.
          </motion.p>
        </div>
      </section>

      <StatsCounter />

      {/* Signature Highlights */}
      <section className="bg-gray-50 py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 items-center gap-12">
            {/* Left: Big headline */}
            <motion.div {...fadeUp} className="lg:col-span-5">
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-slate-400">
                modago difference
              </p>
              <h2 className="mt-4 text-5xl md:text-6xl font-semibold leading-[1.08] tracking-[-0.01em] text-slate-900">
                모다고가 다른 학원과
                <br className="hidden md:block" />
                다른 이유
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-prose">
                수많은 합격 사례를 넘어, 학습 경험 자체를 바꾸는 시스템으로
                학생의 가능성을 입증합니다.
              </p>
            </motion.div>

            {/* Right: Visual/Highlights grid (asymmetric like Toss) */}
            <motion.ul
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 flex flex-col gap-6"
            >
              {[
                { title: "실기 + 학과", desc: "", layout: "" },
                {
                  title: "개인 맞춤 커리큘럼",
                  desc: "진단/목표/시간을 수치화해 주차별 스프린트에 ‘딱 필요한 과제’만 배치합니다.",
                  layout: "",
                },
                {
                  title: "상위권 대학",
                  desc: "출제경향 DB와 블라인드 모의실기로 심사 기준을 일관되게 충족하도록 점검합니다.",
                  layout: "",
                },
                {
                  title: "미술활동보고서",
                  desc: "STAR/PEEL로 과정 증빙을 구조화하고 금지 표현/리스크를 사전 차단합니다.",
                  layout: "",
                },
              ].map((point, idx) =>
                idx === 0 ? (
                  // --- 1) 첫 번째 카드: 다크 히어로 카드 ---
                  <li
                    key="hero-card-1"
                    className="relative overflow-hidden rounded-3xl ring-1 ring-slate-800 bg-slate-900 text-white p-8 md:p-12 shadow-lg"
                  >
                    <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-brand/30 blur-3xl opacity-40" />
                    <div className="pointer-events-none absolute -bottom-20 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl opacity-30" />

                    <div className="relative z-10">
                      <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-white/50">
                        실기 + 학과
                      </p>
                      <h3 className="mt-4 text-2xl md:text-3xl font-semibold leading-snug">
                        모다고는 솔직하게 말씀드리겠습니다.
                      </h3>
                      <p className="mt-5 text-base md:text-lg leading-relaxed text-white/90">
                        실기만 연습해서는 좋은 대학에 가기 어렵습니다.
                        <br />
                        학업도 병행해야 하는 게 현실입니다.
                        <br />
                        모다고에서는{" "}
                        <span className="font-semibold">학과 수업</span>을 통해{" "}
                        <span className="font-semibold">학업, 실기 모두</span>를
                        잡아줍니다.
                      </p>
                    </div>
                  </li>
                ) : idx === 1 ? (
                  // --- 2) 두 번째 카드: 다크 히어로 카드 ---
                  <li
                    key="hero-card-2"
                    className="relative overflow-hidden rounded-3xl ring-1 ring-slate-800 bg-slate-950 text-white p-8 md:p-12 shadow-lg"
                  >
                    <div className="pointer-events-none absolute -top-14 -right-16 h-56 w-56 rounded-full bg-brand/30 blur-3xl opacity-40" />
                    <div className="pointer-events-none absolute -bottom-20 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl opacity-30" />

                    <div className="relative z-10">
                      <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-white/50">
                        개인 맞춤 커리큘럼
                      </p>
                      <h3 className="mt-4 text-2xl md:text-3xl font-semibold leading-snug">
                        시작점은 다르지만, 수업은 개개인에게 딱 맞게.
                      </h3>
                      <p className="mt-5 text-base md:text-lg leading-relaxed text-white/90">
                        모다고에 오는 모든 학생의 시작점은 다 다릅니다.
                        <br />
                        하지만 개개인에 맞춘 커리큘럼을 진행하는 학원은 많지
                        않습니다.
                        <br />
                        모다고는{" "}
                        <span className="font-semibold">소수 정예</span>로
                        수업을 진행하기 때문에 가능합니다.
                        <br />
                        <span className="font-semibold">
                          개인별 최적의 커리큘럼
                        </span>
                        으로{" "}
                        <span className="font-semibold">상위권 대학 합격</span>
                        을 약속드립니다.
                      </p>
                    </div>
                  </li>
                ) : idx === 2 ? (
                  // --- 3) 세 번째 카드: 다크 히어로 카드 (문구 다듬음) ---
                  <li
                    key="hero-card-3"
                    className="relative overflow-hidden rounded-3xl ring-1 ring-slate-800 bg-slate-900 text-white p-8 md:p-12 shadow-lg"
                  >
                    {/* 하이라이트 방향을 또 바꿔 리듬감 주기 */}
                    <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-brand/30 blur-3xl opacity-40" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl opacity-30" />

                    <div className="relative z-10">
                      <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-white/50">
                        상위권 대학 집중
                      </p>
                      <h3 className="mt-4 text-2xl md:text-3xl font-semibold leading-snug">
                        평균 등급이 낮아도, 끝까지 끌어올립니다.
                      </h3>
                      <p className="mt-5 text-base md:text-lg leading-relaxed text-white/90">
                        모다고의 모든 수업은 상위권 대학 기준으로 설계합니다.
                        <br />
                        ‘따라갈 수 있을까’ 걱정돼도 괜찮습니다.
                        <br />
                        오전부터 밤까지 이어지는{" "}
                        <span className="font-semibold">
                          자습 · 클리닉
                        </span>,{" "}
                        <span className="font-semibold">담임제 케어</span>로 단
                        한 명도 뒤처지지 않게 합니다.
                        <br />
                        <span className="font-semibold">주요 합격 사례</span>가
                        그 사실을 증명합니다.
                      </p>
                    </div>
                  </li>
                ) : (
                  // --- 4) 나머지 카드: 기존 화이트 카드 유지 ---
                  <li
                    key={point.title}
                    className="group relative overflow-hidden rounded-3xl ring-1 ring-gray-200 bg-white p-7 shadow-sm transition will-change-transform hover:-translate-y-1.5 hover:shadow-lg"
                  >
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-brand/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="relative z-10 flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-slate-900"
                        aria-hidden
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {point.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              )}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* Studio Story */}
      <section className="bg-white py-28">
        <div className="max-w-6xl mx-auto grid gap-14 px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-gray-400">
              atelier culture
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold text-gray-900">
              홍대 앞의 감각과 연구가 만나 완성되는 스튜디오
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              모두다른고양이는 학생 개개인의 흥미와 감각을 존중하는 스튜디오형
              학습 환경을 지향합니다. 작업실 곳곳에 설치된 참고 라이브러리,
              주제에 따라 변화하는 쇼케이스 전시, 주간 크리틱 모임으로 서로의
              작업을 나누며 폭넓은 미감과 표현을 탐구할 수 있습니다.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand" />
                <span>
                  기초 드로잉부터 전공 심화, 미디어아트, 아트디렉션까지 세분화된
                  트랙을 통해 목표에 맞게 선택 수강합니다.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand" />
                <span>
                  전임 강사진의 피드백과 실기 모의 평가를 통해 작업 과정 전반을
                  다각도로 점검합니다.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand" />
                <span>
                  졸업생 네트워크와 연계한 전시, 작가 특강, 진로 상담으로 대학
                  입학 이후의 활동까지 함께 설계합니다.
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/30 to-transparent blur-2xl" />
            <div
              className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative aspect-[4/3] w-full">
                {STUDIO_SLIDES.map((slide, index) => {
                  const isActive = index === currentSlide;
                  const isLoaded = loadedSlides[index];
                  const shouldPriority = index === 0;

                  return (
                    <div
                      key={slide.src}
                      className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden={!isActive}
                    >
                      <Image
                        fill
                        priority={shouldPriority}
                        sizes="(min-width: 1024px) 640px, (min-width: 768px) 70vw, 100vw"
                        src={slide.src}
                        alt={slide.alt}
                        className="h-full w-full object-cover"
                        onLoadingComplete={() => markSlideLoaded(index)}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Crect width='10' height='6' fill='%23f3f4f6'/%3E%3C/svg%3E"
                        quality={85}
                      />
                      {!isLoaded && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gray-100">
                          <div className="h-12 w-12 animate-spin rounded-full border-2 border-brand/60 border-t-transparent" />
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-sm text-white">
                  {STUDIO_SLIDES[currentSlide]?.caption}
                </div>

                <div className="absolute inset-y-0 left-0 z-30 flex items-center">
                  <button
                    type="button"
                    onClick={handlePrev}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                    className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
                    aria-label="이전 이미지 보기"
                  >
                    <span aria-hidden="true">‹</span>
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 z-30 flex items-center">
                  <button
                    type="button"
                    onClick={handleNext}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                    className="mr-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
                    aria-label="다음 이미지 보기"
                  >
                    <span aria-hidden="true">›</span>
                  </button>
                </div>

                <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2">
                  {STUDIO_SLIDES.map((slide, index) => (
                    <button
                      key={slide.src}
                      type="button"
                      onClick={() => goToSlide(index)}
                      onFocus={() => setIsPaused(true)}
                      onBlur={() => setIsPaused(false)}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        index === currentSlide
                          ? "bg-white"
                          : "bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`${index + 1}번째 이미지 보기`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Section */}
      <section id="program" className="bg-gray-900 py-28 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.35em] text-white/50"
          >
            tailored curriculum
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-3xl md:text-5xl font-semibold"
          >
            전공과 목표에 맞춘 4단계 맞춤 커리큘럼
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-3xl text-lg text-white/70"
          >
            학생의 기초 실력, 지원 학교, 진로 계획을 분석해 4단계 로드맵을
            제시합니다. 각 단계는 포트폴리오 기획, 테크닉 훈련, 실전 모의,
            프리젠테이션 준비로 구성됩니다.
          </motion.p>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              {
                title: "Foundation",
                description:
                  "기초 소묘와 조형 감각 훈련, 주제 탐색을 위한 레퍼런스 리서치로 표현의 폭을 넓힙니다.",
              },
              {
                title: "Development",
                description:
                  "주차별 과제와 중간 평가를 통해 주제 해석, 재료 실험, 스토리텔링 능력을 강화합니다.",
              },
              {
                title: "Performance",
                description:
                  "실전 시간 관리, 과제 시뮬레이션, 대학별 기출 분석으로 완성도를 끌어올립니다.",
              },
              {
                title: "Portfolio",
                description:
                  "전시형 포트폴리오 구성, PT 리허설, 서류 컨설팅으로 합격 전략을 마무리합니다.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div>
                  <span className="text-sm uppercase tracking-[0.35em] text-white/40">
                    step {idx + 1}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-base text-white/70">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 text-sm text-white/40">
                  주 4회 수업 · 담임제 피드백
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StickyGallery />

      {/* Teachers */}
      <section id="teachers" className="bg-white py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.35em] text-gray-400"
          >
            faculty & mentors
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl md:text-5xl font-semibold text-gray-900"
          >
            입시와 작가 활동을 겸비한 전임 강사진
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-3xl text-lg text-gray-600"
          >
            홍익대학교, 국민대학교, 서울대학교 등 주요 미대 출신 강사진이
            함께하며 입시 실전 경험과 현역 작가로서의 감각을 동시에 전달합니다.
            주 1회 이상 진행되는 멘토링 세션으로 학생의 진로와 작업 방향을
            구체화합니다.
          </motion.p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "김모다",
                role: "원장 · 회화",
                bio: "홍익대 회화과 졸업. 국내외 15회 개인전 및 다수 단체전 참여, 입시 지도 20년 경력.",
              },
              {
                name: "이도영",
                role: "조형 · 디자인",
                bio: "국민대 시각디자인과 졸업. 브랜드 디자인 프로젝트 다수 진행, 유학 포트폴리오 전문.",
              },
              {
                name: "박하늘",
                role: "미디어아트",
                bio: "서울대 융합예술대학원 출신. 인터랙티브 아트 작가로 활동, 영상/뉴미디어 실기 담당.",
              },
            ].map((teacher, idx) => (
              <motion.article
                key={teacher.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {teacher.name}
                    </h3>
                    <span className="text-sm uppercase tracking-[0.35em] text-gray-300">
                      mentor
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-brand">
                    {teacher.role}
                  </p>
                  <p className="mt-4 text-base text-gray-600">{teacher.bio}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.35em] text-gray-400"
          >
            student voices
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl md:text-4xl font-semibold text-gray-900"
          >
            국내외 미대 합격생들이 전하는 생생한 후기입니다.
          </motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "과정 전반에서 과제 이유를 함께 고민해주셔서 제 작업 언어를 찾을 수 있었습니다.",
                name: "홍익대 회화과 합격생",
              },
              {
                quote:
                  "실기뿐 아니라 발표 연습, 포트폴리오 구성까지 도와주어 면접에서 강점을 보여줄 수 있었어요.",
                name: "서울대 디자인과 합격생",
              },
              {
                quote:
                  "단 두 달 만에 포트폴리오를 준비해 7개의 해외 미대에 모두 합격하고, 장학금까지 받을 수 있었어요.",
                name: "미국 NYU 합격생",
              },
            ].map((testimonial, idx) => (
              <motion.blockquote
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent opacity-0 transition hover:opacity-100" />
                <div className="relative z-10">
                  <p className="text-lg leading-relaxed text-gray-700">
                    “{testimonial.quote}”
                  </p>
                  <cite className="mt-6 block text-sm font-semibold uppercase tracking-[0.35em] text-gray-400">
                    {testimonial.name}
                  </cite>
                </div>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <ConsultSection />
    </main>
  );
}
