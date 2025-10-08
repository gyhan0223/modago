"use client";
import { motion } from "framer-motion";
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

export default function Home() {
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
            당신의 작품 세계를 발견하고 확장하는 홍대 대표 입시미술 전문 공간
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-gray-600"
          >
            주입식 수업 대신 작가로서의 시선과 손끝을 단련시키는 커리큘럼으로
            미대 입시부터 유학 포트폴리오까지, 목표에 맞춘 맞춤 지도를
            진행합니다.
          </motion.p>
        </div>
      </section>

      {/* Signature Highlights */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-3">
          {["개인 맞춤 지도", "실전 기반 피드백", "입시/유학 연계"].map(
            (title, idx) => (
              <motion.article
                key={title}
                {...fadeUp}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="relative z-10">
                  <p className="text-sm uppercase tracking-[0.35em] text-gray-400">
                    signature 0{idx + 1}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-gray-600">
                    {idx === 0 &&
                      "담임제 시스템으로 목표 대학, 전공, 현재 실력을 분석하고 주차별 과제를 설계합니다."}
                    {idx === 1 &&
                      "매 수업마다 실전 평가와 리뷰를 병행해 작업 흐름을 다듬고 포트폴리오 완성도를 끌어올립니다."}
                    {idx === 2 &&
                      "국내외 미대 입시 경험을 바탕으로 해외 포트폴리오, 전시 준비까지 한 번에 지원합니다."}
                  </p>
                </div>
              </motion.article>
            )
          )}
        </div>
      </section>

      <StatsCounter />

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
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-xl">
              <img
                src="/studio.jpg"
                alt="모두다른고양이 스튜디오"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-8 text-sm text-white">
                매일 업데이트되는 작업실 쇼케이스와 레퍼런스 라이브러리로 영감을
                쌓아갑니다.
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
            합격 이후에도 이어지는 작업의 자신감을 기릅니다
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
                  "해외 미대 지원에 필요한 서류와 촬영까지 세세하게 코칭해주신 덕분에 장학금까지 받았습니다.",
                name: "미국 RISD 합격생",
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
