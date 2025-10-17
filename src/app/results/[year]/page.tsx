import type { Metadata } from "next";
import NavBarSticky from "@/components/NavBarSticky";
import { RESULTS_BY_YEAR } from "@/data/results";
import { LEGACY_RESULTS_1990S } from "@/data/results1990s";
import { LEGACY_RESULTS_2000S } from "@/data/results2000s";

const VALID_YEARS = Object.keys(
  RESULTS_BY_YEAR
) as (keyof typeof RESULTS_BY_YEAR)[];

type ValidYear = (typeof VALID_YEARS)[number];

type PageProps = {
  params: Promise<{
    year: string;
  }>;
};

function assertValidYear(year: string): year is ValidYear {
  return year in RESULTS_BY_YEAR;
}

export function generateStaticParams() {
  return VALID_YEARS.map((year) => ({ year }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { year } = await params;

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

export default async function ResultsYearPage({ params }: PageProps) {
  const { year } = await params;

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

  const yearData = RESULTS_BY_YEAR[year];
  const allResults = [
    ...Object.entries(RESULTS_BY_YEAR).map(([resultYear, data]) => ({
      year: resultYear,
      totalAccepted: data.totalAccepted,
    })),
    ...LEGACY_RESULTS_1990S.map(({ year: legacyYear, totalAccepted }) => ({
      year: legacyYear,
      totalAccepted,
    })),
    ...LEGACY_RESULTS_2000S.map(({ year: legacyYear, totalAccepted }) => ({
      year: legacyYear,
      totalAccepted,
    })),
  ];

  const cumulativeAccepted = allResults.reduce(
    (total, { year: resultYear, totalAccepted }) =>
      Number(resultYear) <= Number(year) ? total + totalAccepted : total,
    0,
  );
  const topUniversities = [...yearData.universities]
    .sort((a, b) => b.accepted - a.accepted)
    .slice(0, 3);
  const otherYearEntries = Object.entries(RESULTS_BY_YEAR)
    .filter(([key]) => key !== year)
    .sort(([a], [b]) => Number(b) - Number(a));

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
            총 {yearData.totalAccepted.toLocaleString()}명의 합격 소식을
            대학별로 정리했습니다. 실기와 포트폴리오, 컨설팅이 만들어 낸 결과를
            함께 축하해 주세요.
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-amber-600">
            {yearData.universities.length}개 대학 집계
          </p>
          <p className="mt-1 text-sm font-semibold text-amber-700">
            {year}학년도까지 누적 합격자 {cumulativeAccepted.toLocaleString()}명
          </p>
        </div>
      </header>

      <div className="bg-white">
        <NavBarSticky />
      </div>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-5xl space-y-12 px-6">
          <article className="rounded-3xl border border-gray-200 bg-white/95 p-8 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {year}학년도 합격 현황 요약
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  합격자 명단은 공개된 정보를 기반으로 정리되었습니다.{" "}
                  {topUniversities
                    .map((uni) => `${uni.name} ${uni.accepted}명`)
                    .join(", ")}{" "}
                  등 주요 대학에서 두드러진 성과를 보여 주었습니다.
                </p>
              </div>
              <div className="grid gap-3 text-right text-sm">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-amber-500">
                    총 합격자
                  </span>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">
                    {yearData.totalAccepted.toLocaleString()}명
                  </p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-amber-500">
                    집계 대학 수
                  </span>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {yearData.universities.length}곳
                  </p>
                </div>
              </div>
            </div>
          </article>

          <div className="space-y-8">
            {yearData.universities.map((university) => (
              <article
                key={`${year}-${university.name}`}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {university.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      since 1989 누적 합격{" "}
                      {university.sinceTotal.toLocaleString()}명
                    </p>
                  </div>
                  <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
                    {year}학년도 {university.accepted.toLocaleString()}명
                  </div>
                </div>
                <ul className="mt-6 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                  {university.details.map((detail, index) => (
                    <li
                      key={`${university.name}-${index}`}
                      className="flex items-start gap-2"
                    >
                      <span
                        className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400"
                        aria-hidden
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="text-xs text-gray-500">
            ※ 명단은 공개 자료를 기반으로 정리했으며, 세부 인원과 이름 표기
            방식은 학교 발표 기준을 따랐습니다.
          </p>
        </div>
      </section>

      {otherYearEntries.length > 0 && (
        <section className="border-t border-gray-200 bg-white py-16">
          <div className="mx-auto max-w-5xl space-y-6 px-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                이전 학년도 참고 데이터
              </h2>
              <p className="text-sm text-gray-600">
                최신 연도 외에 공개된 합격 기록도 함께 확인하실 수 있습니다.
              </p>
            </div>
            <div className="space-y-6">
              {otherYearEntries.map(([otherYear, otherData]) => (
                <article
                  key={`${year}-extra-${otherYear}`}
                  className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {otherYear}학년도 합격 (
                      {otherData.totalAccepted.toLocaleString()}명)
                    </h3>
                    <span className="text-xs uppercase tracking-[0.3em] text-amber-600">
                      {otherData.universities.length}개 대학
                    </span>
                  </div>
                  <div className="mt-4 space-y-4">
                    {otherData.universities.map((university) => (
                      <div
                        key={`${otherYear}-${university.name}`}
                        className="rounded-2xl border border-dashed border-amber-200 bg-white p-4"
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h4 className="text-base font-semibold text-gray-900">
                              {university.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              since 1989 누적 합격{" "}
                              {university.sinceTotal.toLocaleString()}명
                            </p>
                          </div>
                          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                            {otherYear}학년도{" "}
                            {university.accepted.toLocaleString()}명
                          </span>
                        </div>
                        <ul className="mt-3 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                          {university.details.map((detail, index) => (
                            <li
                              key={`${otherYear}-${university.name}-${index}`}
                              className="flex items-start gap-2"
                            >
                              <span
                                className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400"
                                aria-hidden
                              />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
