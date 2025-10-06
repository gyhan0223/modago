export default function ConsultSection() {
  return (
    <section id="consult" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-black">무료 상담 신청</h2>
          <p className="mt-3 text-gray-600">
            입시 전략, 포트폴리오 구성, 실기 대비 — 무엇이든 편하게 문의하세요.
          </p>

          <div className="mt-6 space-y-3">
            <a href="tel:010-1234-5678" className="inline-block px-5 py-3 bg-black text-white rounded-lg font-semibold">
              전화 상담: 010-1234-5678
            </a>
            <div>
              <a href="https://pf.kakao.com/_yourChannel" target="_blank" className="underline text-gray-600">
                카카오톡 채널로 문의하기
              </a>
              <span className="ml-2 text-xs text-gray-500">(링크는 학원 채널로 교체)</span>
            </div>
            <div className="mt-4">
              <form action="https://formspree.io/f/yourFormId" method="POST" className="space-y-3 ">
                <input name="name" placeholder="이름" required className="w-full border rounded-md px-3 py-2 text-gray-600" />
                <input name="phone" placeholder="연락처" required className="w-full border rounded-md px-3 py-2 text-gray-600" />
                <textarea name="message" placeholder="문의 내용" rows={4} className="w-full border rounded-md px-3 py-2 text-gray-600" />
                <button className="px-5 py-3 bg-brand text-white rounded-lg font-semibold">문의 보내기</button>
              </form>
              <p className="text-xs text-gray-500 mt-2">※ 임시 폼(Formspree). 나중에 자체 DB로 바꿀 수 있음.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border">
          {/* 임시 지도: 필요하면 카카오/네이버 지도 임베드로 교체 */}
          <iframe
            title="지도"
            width="100%"
            height="360"
            loading="lazy"
            src="https://www.google.com/maps?q=서울&output=embed"
          />
          <div className="p-4 text-sm text-gray-600">
            <div>서울 어딘가 | 모두다른고양이 입시미술학원</div>
            <div>운영시간: 평일 13:00–21:00, 주말 10:00–18:00</div>
          </div>
        </div>
      </div>
    </section>
  );
}
