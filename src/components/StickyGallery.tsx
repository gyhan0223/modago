"use client";
import { motion } from "framer-motion";

const images = [
  "/gallery/01.jpg",
  "/gallery/02.jpg",
  "/gallery/03.jpg",
  "/gallery/04.jpg",
  "/gallery/05.jpg",
  "/gallery/06.jpg",
];

const categories = [
  "갤러리",
  "인체",
  "소묘",
  "발상과 표현",
  "무대 디자인",
  "기초 소양",
  "기초 디자인",
  "포트폴리오 1",
  "포트폴리오 2",
  "포트폴리오 3",
];

export default function StickyGallery() {
  return (
    <section id="gallery" className="relative">
      <div className="sticky top-0 h-screen flex items-center bg-white">
        <div className="w-full max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-brand">
            학생 작품 갤러리
          </h2>

          <div className="mt-8 space-y-12">
            {categories.map((category) => (
              <section key={category} className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {images.map((src, i) => (
                    <motion.div
                      key={`${category}-${src}-${i}`}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.07 }}
                      viewport={{ amount: 0.2, once: true }}
                      className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-100"
                    >
                      <img
                        src={src}
                        alt={`${category} 작품 ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* sticky가 체감되도록 여백길(section 높이) 확보 */}
      <div className="h-[0vh]" />
    </section>
  );
}
