import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NavBarSticky from "@/components/NavBarSticky";

const FACILITY_SECTIONS = [
  {
    name: "그림",
    description:
      "모다고의 감각을 담은 대표 작품들입니다. 다양한 콘셉트의 결과물을 통해 학생들의 표현력과 완성도를 확인해 보세요.",
    images: [
      { file: "01.jpg", label: "그림 01" },
      { file: "08.jpg", label: "그림 08" },
      { file: "09.jpg", label: "그림 09" },
      { file: "11.jpg", label: "그림 11" },
      { file: "13.jpg", label: "그림 13" },
    ],
  },
  {
    name: "실기실",
    description:
      "드로잉과 디자인 수업이 진행되는 실기실 풍경입니다. 고사양 장비와 다양한 각도의 작업 환경을 경험할 수 있습니다.",
    images: [
      { file: "02.jpg", label: "실기실 02 (그림)" },
      { file: "03.jpg", label: "실기실 03" },
      { file: "04.jpg", label: "실기실 04" },
      { file: "05.jpg", label: "실기실 05" },
      { file: "10.jpg", label: "실기실 10" },
      { file: "14.jpg", label: "실기실 14" },
      { file: "15.jpg", label: "실기실 15 (로고)" },
      { file: "28.jpg", label: "실기실 28 (학생)" },
      { file: "38.jpg", label: "실기실 38 (위에서)" },
      { file: "44.png", label: "실기실 44" },
      { file: "45.png", label: "실기실 45" },
      { file: "46.png", label: "실기실 46" },
      { file: "47.png", label: "실기실 47" },
    ],
  },
  {
    name: "강의실",
    description:
      "이론과 포트폴리오 리뷰가 이뤄지는 강의 공간입니다. 집중력 있는 학습을 돕는 환경을 조성했습니다.",
    images: [
      { file: "16.jpg", label: "강의실 16" },
      { file: "36.jpg", label: "강의실 36" },
      { file: "37.jpg", label: "강의실 37" },
      { file: "39.jpg", label: "강의실 39" },
    ],
  },
  {
    name: "창문 & 로고",
    description: "브랜드 아이덴티티와 채광을 동시에 느낄 수 있는 포인트 공간입니다.",
    images: [{ file: "06.jpg", label: "창문 + 로고 06" }],
  },
  {
    name: "상담실",
    description:
      "개별 학습 계획과 진로 컨설팅이 이루어지는 상담 공간으로, 프라이빗한 분위기를 유지합니다.",
    images: [
      { file: "07.jpg", label: "상담실 07" },
      { file: "17.jpg", label: "상담실 17" },
    ],
  },
  {
    name: "숙소",
    description: "장거리 학생들을 위한 쾌적한 숙소 공간을 제공하여 안정적인 생활 리듬을 돕습니다.",
    images: [{ file: "12.jpg", label: "숙소 12" }],
  },
  {
    name: "식당",
    description:
      "균형 잡힌 식단을 제공하는 식당입니다. 건강한 식사로 학습과 작업의 에너지를 충전하세요.",
    images: [
      { file: "18.jpg", label: "식당 18" },
      { file: "19.jpg", label: "식당 19" },
      { file: "20.jpeg", label: "식당 20" },
    ],
  },
  {
    name: "기숙학원",
    description:
      "학습과 생활이 조화를 이루는 기숙학원 전경입니다. 주거 공간과 학습 공간이 유기적으로 연결되어 있습니다.",
    images: [
      { file: "21.jpg", label: "기숙학원 21" },
      { file: "22.jpg", label: "기숙학원 22" },
      { file: "23.jpg", label: "기숙학원 23" },
      { file: "24.jpg", label: "기숙학원 24" },
      { file: "25.jpg", label: "기숙학원 25 (학생)" },
      { file: "26.jpg", label: "기숙학원 26" },
      { file: "27.jpg", label: "기숙학원 27" },
    ],
  },
  {
    name: "입시설명회",
    description: "현장 설명회와 특강을 진행한 순간들을 기록한 사진입니다.",
    images: [
      { file: "29.jpg", label: "입시설명회 29" },
      { file: "30.jpg", label: "입시설명회 30" },
      { file: "42.png", label: "입시설명회 42" },
    ],
  },
  {
    name: "일산",
    description: "일산 캠퍼스 주변과 내부 풍경을 담았습니다.",
    images: [
      { file: "31.jpg", label: "일산 31" },
      { file: "32.jpg", label: "일산 32" },
    ],
  },
  {
    name: "수만휘 (독서실)",
    description:
      "조용하게 자습할 수 있는 수만휘 독서실 공간입니다. 안정적인 집중 환경을 원하는 학생들을 위한 장소입니다.",
    images: [
      { file: "33.png", label: "수만휘 33" },
      { file: "34.png", label: "수만휘 34" },
      { file: "48.png", label: "수만휘 48" },
      { file: "49.png", label: "수만휘 49" },
      { file: "50.png", label: "수만휘 50" },
      { file: "51.png", label: "수만휘 51" },
      { file: "52.png", label: "수만휘 52" },
      { file: "53.png", label: "수만휘 53" },
    ],
  },
  {
    name: "인증",
    description: "공식 인증과 수상 기록을 확인할 수 있는 자료들입니다.",
    images: [
      { file: "35.jpg", label: "인증 35" },
      { file: "40.jpg", label: "인증 40" },
      { file: "41.jpg", label: "인증 41" },
    ],
  },
  {
    name: "본인",
    description: "모두다른고양이를 이끌어 가는 주인공의 모습입니다.",
    images: [{ file: "43.png", label: "본인 43" }],
  },
] as const;

export const metadata: Metadata = {
  title: "시설 안내 | 모두다른고양이 입시미술학원",
  description:
    "모두다른고양이 입시미술학원의 학습 공간과 편의 시설을 소개합니다.",
};

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.2),_transparent_65%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-28 text-center">
          <span className="rounded-full border border-amber-200/80 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 shadow-sm">
            Facilities
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            모두다른고양이 시설 안내
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            하루 대부분을 보내게 되는 공간만큼은 세심하게 준비했습니다. 실기실부터 기숙학원까지 모든
            시설을 한눈에 확인하고, 나에게 맞는 학습 환경을 찾아보세요.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="rounded-full border border-amber-100 bg-white px-4 py-2 font-medium text-amber-700 shadow-sm">
              연면적 430평 규모
            </span>
            <span className="rounded-full border border-amber-100 bg-white px-4 py-2 font-medium text-amber-700 shadow-sm">
              24시간 공조 시스템
            </span>
            <span className="rounded-full border border-amber-100 bg-white px-4 py-2 font-medium text-amber-700 shadow-sm">
              전 구역 Wi-Fi & CCTV
            </span>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/#consult"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-600"
            >
              시설 투어 신청하기 →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white px-6 py-2 text-sm font-semibold text-amber-600 shadow-sm transition hover:bg-amber-50"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-white">
        <NavBarSticky />
      </div>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl space-y-16 px-6">
          {FACILITY_SECTIONS.map((section, sectionIndex) => (
            <article
              key={section.name}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-12"
            >
              <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-gray-900">{section.name}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
                    {section.description}
                  </p>
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-amber-500">
                  {String(section.images.length).padStart(2, "0")} Photos
                </span>
              </header>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section.images.map((image, imageIndex) => (
                  <figure
                    key={image.file}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-gray-50"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={`/studio/${image.file}`}
                        alt={`${section.name} - ${image.label}`}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={sectionIndex === 0 && imageIndex < 2}
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                      {image.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl border border-amber-100 bg-amber-50/80 p-10 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900">안전하고 쾌적한 학습 환경을 위한 약속</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="space-y-3 text-sm text-gray-700">
                <h3 className="text-base font-semibold text-amber-700">학습 환경 관리</h3>
                <ul className="space-y-2">
                  <li>• 월 2회 전문 업체의 실내 공기질 점검 및 필터 교체</li>
                  <li>• 모든 실기실 전용 도장과 방음 설계</li>
                  <li>• 실시간 온습도 모니터링 시스템 운영</li>
                </ul>
              </div>
              <div className="space-y-3 text-sm text-gray-700">
                <h3 className="text-base font-semibold text-amber-700">학생 편의 지원</h3>
                <ul className="space-y-2">
                  <li>• 개인 사물함과 포트폴리오 보관 전용 랙 제공</li>
                  <li>• 야간 셔틀과 연계한 귀가 동선 안내</li>
                  <li>• 주말 개방 자습실과 전문 관리자 상주</li>
                </ul>
              </div>
            </div>
            <p className="mt-8 text-sm text-gray-600">
              시설 투어 및 이용 문의는 상담문의 페이지에서 예약하실 수 있습니다. 학습 스타일에 맞는 공간을 직접 경험해 보세요.
            </p>
            <div className="mt-6">
              <Link
                href="/#consult"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-600"
              >
                상담 문의 바로가기 →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
