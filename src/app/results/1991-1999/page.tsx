import type { Metadata } from "next";
import NavBarSticky from "@/components/NavBarSticky";
import { LEGACY_RESULTS_1990S } from "@/data/results1990s";

export const metadata: Metadata = {
  title: "1990-1999년 합격 결과 모아보기 | 모두다른고양이 입시미술학원",
  description:
    "1990년대 모두다른고양이 입시미술학원의 합격 실적을 한 페이지에서 확인하세요.",
};

export default function Results1990sPage() {
  const totalAccepted = LEGACY_RESULTS_1990S.reduce(
    (sum, entry) => sum + entry.totalAccepted,
    0
  );

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_70%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-32 text-center">
          <span className="rounded-full border border-sky-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sky-600 shadow-sm">
            합격 결과 아카이브
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            1990-1999년 모두다른고양이 합격 기록
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
            학원 설립 초기의 합격 소식을 한눈에 살펴보세요. 연도별 주요 대학과 합격자 이름을 원문 그대로
            정리했습니다.
          </p>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.25em] text-sky-600">
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
            1991학년도부터 1999학년도까지, 원본 기록 그대로 모았습니다
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 md:text-base">
            각 연도별로 공개된 합격자 명단을 연대순으로 정리했습니다. 대학, 전공, 학교 정보가 포함된 당시
            공지의 어조를 살려 전달합니다.
          </p>
        </div>
      </section>

      <div className="space-y-16 py-12">
        {LEGACY_RESULTS_1990S.map((entry) => (
          <section key={entry.year} className="bg-white">
            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6">
              <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-sm md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{entry.year}학년도 합격 현황</h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    당시 공지에 기재된 대학별 합격자와 전공 정보를 원문 그대로 정리했습니다.
                  </p>
                </div>
                <div className="grid gap-4 text-right text-sm">
                  <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-sky-500">총 합격자</span>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                      {entry.totalAccepted.toLocaleString()}명
                    </p>
                  </div>
                </div>
              </div>

              <article className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700 md:text-base">
                  {entry.content}
                </pre>
              </article>
            </div>
          </section>
        ))}
      </div>

      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-5xl px-6 text-sm text-gray-500">
          ※ 공개 자료를 기반으로 수집한 결과이며, 일부 항목은 당시 게시된 문구를 그대로 옮겼습니다.
        </div>
      </footer>
    </main>
  );
}
