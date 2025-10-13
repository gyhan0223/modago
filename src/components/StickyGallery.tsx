"use client";
import { motion } from "framer-motion";
import { galleryTabs, getGallerySectionId } from "@/data/galleryTabs";

const baseImages = [
  "/gallery/01.jpg",
  "/gallery/02.jpg",
  "/gallery/03.jpg",
  "/gallery/04.jpg",
  "/gallery/05.jpg",
  "/gallery/06.jpg",
];

const gallerySections = galleryTabs.map((tab, tabIndex) => ({
  ...tab,
  images: baseImages.map((src, imageIndex) => ({
    src,
    alt: `${tab.label} 작품 ${imageIndex + 1}`,
    delay: imageIndex * 0.07 + tabIndex * 0.02,
  })),
}));

export default function StickyGallery() {
  return (
    <section id="gallery" className="relative">
      <div className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
          <div>
            <h2 className="text-3xl font-bold text-brand md:text-4xl">
              학생 작품 갤러리
            </h2>
            <p className="mt-2 text-sm text-gray-500 md:text-base">
              카테고리를 선택하면 해당 작업 섹션으로 이동합니다.
            </p>
          </div>
          <div className="-mx-2 overflow-x-auto">
            <div className="flex gap-2 px-2 pb-2">
              {gallerySections.map((tab) => (
                <a
                  key={tab.id}
                  href={`#${getGallerySectionId(tab.id)}`}
                  className="inline-flex items-center rounded-full border border-brand/20 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-brand hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {tab.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-20 bg-white py-16">
        {gallerySections.map((section) => (
          <section
            key={section.id}
            id={getGallerySectionId(section.id)}
            className="scroll-mt-36"
            aria-labelledby={`${section.id}-heading`}
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6">
              <div>
                <h3
                  id={`${section.id}-heading`}
                  className="text-2xl font-semibold text-gray-900 md:text-3xl"
                >
                  {section.label}
                </h3>
                {section.description ? (
                  <p className="mt-2 text-sm text-gray-500 md:text-base">
                    {section.description}
                  </p>
                ) : null}
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                {section.images.map((image) => (
                  <motion.div
                    key={`${section.id}-${image.src}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: image.delay }}
                    viewport={{ amount: 0.2, once: true }}
                    className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-100"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
