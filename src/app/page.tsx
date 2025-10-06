// src/app/page.tsx
"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="min-h-[100vh] flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          개성을 결과로 만드는
          <br />
          <span className="text-brand">모두다른고양이 입시미술학원</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-6 text-gray-600 text-lg md:text-xl"
        >
          당신의 예술은 세상에 단 하나입니다.
        </motion.p>

        <motion.a
          href="#program"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 px-8 py-3 rounded-full bg-brand text-white font-semibold text-lg hover:bg-brand-dark transition"
        >
          무료 상담 신청
        </motion.a>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* About Section */}
      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold mb-8"
          >
            예술 교육의 본질을 지키다
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed"
          >
            모두다른고양이는 단순한 입시 학원이 아닙니다.
            <br />
            학생 한 명, 한 명의 개성과 예술 세계를 존중하며,
            <br />
            진심으로 예술의 길을 함께 고민합니다.
          </motion.p>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-40 px-6 bg-brand/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            {
              title: "개인 맞춤 커리큘럼",
              desc: "학생의 수준과 전공에 따라 세분화된 커리큘럼 제공.",
            },
            {
              title: "전문 강사진 지도",
              desc: "현직 작가 및 예술대 출신 강사진이 직접 지도.",
            },
            {
              title: "합격으로 증명된 결과",
              desc: "다수의 미대 합격생을 배출하며 결과로 신뢰를 쌓았습니다.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="p-8 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-brand">{f.title}</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-40 text-center bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold"
        >
          <span className="text-brand">지금,</span> 당신의 예술을 시작하세요.
        </motion.h2>
        <motion.a
          href="#consult"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-10 inline-block px-10 py-4 rounded-full bg-brand text-white font-semibold text-lg hover:bg-brand-dark transition"
        >
          무료 상담 신청
        </motion.a>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 text-center text-sm text-gray-500">
        © 2025 모두다른고양이 입시미술학원. All rights reserved.
      </footer>
    </main>
  );
}
