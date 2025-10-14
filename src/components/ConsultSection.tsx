export default function ConsultSection() {
  return (
    <section id="consult" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black">무료 상담</h2>
        <p className="mt-3 text-gray-600">
          입시 전략, 포트폴리오 구성, 실기 대비 — 무엇이든 편하게 문의하세요.
        </p>

        <div className="mt-6 space-y-3">
          <a
            href="tel:010-6324-0308"
            className="inline-block px-5 py-3 bg-black text-white rounded-lg font-semibold"
          >
            전화 상담: 010-6324-0308
          </a>
        </div>
        <div className="mt-3 text-sm text-gray-500">
          운영시간: 연중무휴 08:00-22:00
        </div>
      </div>
    </section>
  );
}
