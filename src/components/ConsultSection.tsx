export default function ConsultSection() {
  return (
    <section
      id="consult"
      className="py-24 bg-gradient-to-br from-brand/10 via-white to-brand/5"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-3xl border border-brand/20 bg-white/80 p-10 text-center shadow-xl backdrop-blur">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            믿을 수 있는 1:1 무료 상담
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600">
            입시 전략, 포트폴리오 구성, 실기 대비 — 37년 노하우를 가진 전임 상담팀이
            학생과 학부모의 상황을 꼼꼼히 듣고 가장 정확한 방법을 제시합니다.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href="tel:010-6324-0308"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-brand px-8 py-3 text-base font-semibold text-white shadow-lg shadow-brand/40 transition hover:bg-brand-dark"
            >
              전화 상담 예약 · 010-6324-0308
            </a>
            <p className="text-sm text-gray-500">
              운영시간: 연중무휴 08:00-22:00 · 상담 내용은 안전하게 관리됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
