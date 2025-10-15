import type { Metadata } from "next";
import NavBarSticky from "@/components/NavBarSticky";

const VALID_YEARS = ["2025", "2024"] as const;

type ValidYear = (typeof VALID_YEARS)[number];

type PageProps = {
  params: {
    year: string;
  };
};

function assertValidYear(year: string): year is ValidYear {
  return VALID_YEARS.includes(year as ValidYear);
}

export function generateStaticParams() {
  return VALID_YEARS.map((year) => ({ year }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const { year } = params;

  if (!assertValidYear(year)) {
    return {
      title: "합격 결과",
    };
  }

  return {
    title: `${year}년 합격 결과 | 모두다른고양이 입시미술학원`,
    description: `${year}년 합격생 결과를 소개합니다.`,
  };
}

export default function ResultsYearPage({ params }: PageProps) {
  const { year } = params;

  if (!assertValidYear(year)) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-16 text-center text-gray-900">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold">준비 중입니다</h1>
          <p className="mt-4 text-base text-gray-600">
            요청하신 페이지는 아직 준비 중입니다. 잠시 후 다시 방문해 주세요.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.22),_transparent_60%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-32 text-center">
          <span className="rounded-full border border-amber-200/80 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 shadow-sm">
            합격 결과
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            {year}년 모두다른고양이 합격 소식
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            학원과 학생들이 함께 만들어 낸 {year}학년도 합격 성과를 곧 공유드릴 예정입니다.
            아래 영역에 합격자 명단, 인터뷰, 작업 포트폴리오 등 원하는 콘텐츠를 자유롭게 추가해 주세요.
          </p>
        </div>
      </header>

      <div className="bg-white">
        <NavBarSticky />
      </div>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-5xl space-y-12 px-6">
          <article className="rounded-3xl border border-gray-200 bg-white/90 p-8 shadow-sm backdrop-blur">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">콘텐츠 영역 가이드</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  이 카드는 추후 실제 합격 결과로 대체해 주세요. 섹션 단위 카드, 갤러리, 그래픽 등 원하는 형태로 자유롭게 구성할 수 있습니다.
                </p>
              </div>
              <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
                {year}년
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-dashed border-amber-200/80 bg-amber-50/60 p-10 text-center text-amber-700">
            <h3 className="text-lg font-semibold">여기에 합격 결과 콘텐츠를 추가해 주세요</h3>
            <p className="mt-3 text-sm leading-relaxed">
              합격자 명단, 학교별 통계, 수상 기록, 인터뷰, 사진 자료 등 원하는 정보를 섹션별로 채워 넣으면 방문자들이 더 쉽게 내용을 확인할 수 있습니다.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
