import type { Metadata } from "next";
import Link from "next/link";
import NavBarSticky from "@/components/NavBarSticky";
import { RESULTS_BY_YEAR } from "@/data/results";
import { LEGACY_RESULTS_1990S } from "@/data/results1990s";
import { LEGACY_RESULTS_2000S } from "@/data/results2000s";

const TARGET_YEARS = [
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
] as const;

type YearEntry = {
  year: string;
  data: (typeof RESULTS_BY_YEAR)[string];
};

function collectYearEntries(): YearEntry[] {
  return TARGET_YEARS.reduce<YearEntry[]>((acc, year) => {
    const data = RESULTS_BY_YEAR[year];
    if (!data) return acc;
    acc.push({ year, data });
    return acc;
  }, []);
}

const LEGACY_TOTAL_ACCEPTED = [
  ...LEGACY_RESULTS_1990S,
  ...LEGACY_RESULTS_2000S,
].reduce((sum, entry) => sum + entry.totalAccepted, 0);

export const metadata: Metadata = {
  title: "2010-2019년 합격 결과 모아보기 | 모두다른고양이 입시미술학원",
  description:
    "2010년부터 2019년까지 모두다른고양이 입시미술학원의 합격 실적을 한 페이지에서 확인하세요.",
};

export default function Results2010sPage() {
  const yearEntries = collectYearEntries();
  const totalAccepted2010s = yearEntries.reduce(
    (sum, entry) => sum + entry.data.totalAccepted,
    0
  );
  const totalAccepted = LEGACY_TOTAL_ACCEPTED + totalAccepted2010s;

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_70%)]"
          aria-hidden
        />
        <div className="absolute inset-x-0 top-8 z-10 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm font-medium text-amber-600 shadow-sm backdrop-blur transition hover:bg-white"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-32 text-center">
          <span className="rounded-full border border-amber-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 shadow-sm">
            합격 결과 아카이브
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            2010-2019년 모두다른고양이 합격 기록
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
            10년 동안 이어진 합격 소식을 한눈에 살펴보세요. 연도별 대학 합격
            현황과 세부 전공 모두 정리했습니다.
          </p>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.25em] text-amber-600">
            누적 합격 {totalAccepted.toLocaleString()}명
          </p>
        </div>
      </header>

      <div className="bg-white">
        <NavBarSticky />
      </div>

      <section className="border-b border-gray-200 bg-gray-50 py-16">
        <div className="mx-auto max-w-5xl space-y-4 px-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            한 페이지에서 만나는 10개 학년도 합격 현황
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 md:text-base">
            최신 연도부터 2010년까지의 합격 데이터를 연속된 흐름으로
            구성했습니다. 원하는 연도로 스크롤하며 대학별 합격자를 확인해
            보세요.
          </p>
        </div>
      </section>

      <div className="space-y-16 py-12">
        {yearEntries.map(({ year, data }) => (
          <section key={year} className="bg-white">
            <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6">
              <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-sm md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {year}학년도 합격 현황
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {data.universities.length}개 대학에서 총{" "}
                    {data.totalAccepted.toLocaleString()}명의 합격생을
                    배출했습니다. 주요 대학별 합격자 수와 세부 전공을 아래에서
                    확인하세요.
                  </p>
                </div>
                <div className="grid gap-4 text-right text-sm">
                  <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-amber-500">
                      총 합격자
                    </span>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                      {data.totalAccepted.toLocaleString()}명
                    </p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-amber-500">
                      집계 대학 수
                    </span>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {data.universities.length}곳
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {data.universities.map((university) => (
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
                          key={`${year}-${university.name}-${index}`}
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
            </div>
          </section>
        ))}
      </div>

      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-5xl px-6 text-sm text-gray-500">
          ※ 공개 자료를 기반으로 수집한 결과이며, 일부 항목은 학교 발표 기준에
          따라 표기되었습니다.
        </div>
      </footer>
    </main>
  );
}
