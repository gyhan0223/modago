import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NavBarSticky from "@/components/NavBarSticky";

const FACILITY_ZONES = [
  {
    name: "메인 드로잉 스튜디오",
    description:
      "12m 이상 길이의 대형 스튜디오로, 자연광과 색온도를 조절할 수 있는 조명 시스템을 갖추고 있습니다.",
    highlights: [
      "프로 강사진의 수업이 진행되는 주 교실",
      "수강생 작품을 위한 대형 이젤과 작업대",
      "작품 건조를 위한 별도 보관 존",
    ],
    image: "/studio/01.jpg",
  },
  {
    name: "디지털 실기 랩",
    description:
      "고사양 모니터와 태블릿이 구비된 디지털 작업 공간으로, 실시간 피드백을 위한 화면 공유 시스템을 지원합니다.",
    highlights: [
      "12대의 고성능 iMac과 와콤 신티크",
      "컬러 교정을 위한 캘리브레이션 장비",
      "온라인 작품 제출을 돕는 파일 관리 워크스테이션",
    ],
    image: "/studio/02.jpg",
  },
  {
    name: "전시 & 리프레시 라운지",
    description:
      "완성된 포트폴리오를 전시하고 휴식을 취할 수 있는 라운지 공간으로, 소규모 리뷰 세션이 진행됩니다.",
    highlights: [
      "포트폴리오 발표를 위한 가변형 전시벽",
      "도서와 레퍼런스를 자유롭게 열람",
      "셀프 카페 코너와 회복 스트레칭 존",
    ],
    image: "/studio/03.jpg",
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
            하루 대부분을 보내게 되는 공간만큼은 세심하게 준비했습니다. 학습에 집중할 수 있는 환경과
            편안한 휴식 공간을 모두 갖춘 시설을 직접 둘러보세요.
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
        <div className="mx-auto max-w-5xl space-y-14 px-6">
          {FACILITY_ZONES.map((zone, index) => (
            <article
              key={zone.name}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
            >
              <div
                className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"}`}
              >
                <div className="relative h-64 w-full md:h-auto md:w-1/2">
                  <Image
                    src={zone.image}
                    alt={zone.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
                <div className="flex w-full flex-col gap-5 p-8 md:w-1/2 md:p-10">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">{zone.name}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {zone.description}
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {zone.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" aria-hidden />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
