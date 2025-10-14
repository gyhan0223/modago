"use client";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { galleryTabs, getGallerySectionId } from "@/data/galleryTabs";

const galleryImagesByTab: Record<string, string[]> = {
  gallery: [
    "/gallery/01.jpg",
    "/gallery/02.jpg",
    "/gallery/03.jpg",
    "/gallery/04.jpg",
    "/gallery/05.jpg",
    "/gallery/06.jpg",
  ],
  figure: [
    "/figure/01.jpg",
    "/figure/02.jpg",
    "/figure/03.jpg",
    "/figure/04.jpg",
    "/figure/05.jpg",
    "/figure/06.jpg",
    "/figure/07.jpg",
    "/figure/08.jpg",
    "/figure/09.jpg",
    "/figure/10.jpg",
    "/figure/11.jpg",
    "/figure/12.jpg",
    "/figure/13.jpg",
    "/figure/14.jpg",
    "/figure/15.jpg",
    "/figure/16.jpg",
    "/figure/17.jpg",
    "/figure/18.jpg",
    "/figure/19.jpg",
    "/figure/20.jpg",
    "/figure/21.jpg",
    "/figure/22.jpg",
    "/figure/23.jpg",
    "/figure/24.jpg",
    "/figure/25.jpg",
    "/figure/26.jpg",
    "/figure/27.jpg",
    "/figure/28.jpg",
    "/figure/29.jpg",
    "/figure/30.jpg",
    "/figure/31.jpg",
    "/figure/32.jpg",
    "/figure/33.jpg",
    "/figure/34.jpg",
    "/figure/35.jpg",
    "/figure/36.jpg",
    "/figure/37.jpg",
    "/figure/38.jpg",
    "/figure/39.jpg",
    "/figure/40.jpg",
    "/figure/41.jpg",
    "/figure/42.jpg",
    "/figure/43.jpg",
    "/figure/44.jpg",
    "/figure/45.jpg",
    "/figure/46.jpg",
    "/figure/47.jpg",
    "/figure/48.jpg",
  ],
  drawing: [
    "/drawing/01.jpg",
    "/drawing/02.jpg",
    "/drawing/03.jpg",
    "/drawing/04.jpg",
    "/drawing/05.jpg",
    "/drawing/06.jpg",
  ],
  idea: [
    "/idea/01.jpg",
    "/idea/02.jpg",
    "/idea/03.jpg",
    "/idea/04.jpg",
    "/idea/05.jpg",
    "/idea/06.jpg",
  ],
  "stage-design": [
    "/stage-design/01.jpg",
    "/stage-design/02.jpg",
    "/stage-design/03.jpg",
    "/stage-design/04.jpg",
    "/stage-design/05.jpg",
    "/stage-design/06.jpg",
  ],
  "basic-liberal": [
    "/basic-liberal/01.jpg",
    "/basic-liberal/02.jpg",
    "/basic-liberal/03.jpg",
    "/basic-liberal/04.jpg",
    "/basic-liberal/05.jpg",
    "/basic-liberal/06.jpg",
  ],
  "basic-design": [
    "/gallery/01.jpg",
    "/gallery/02.jpg",
    "/gallery/03.jpg",
    "/gallery/04.jpg",
    "/gallery/05.jpg",
    "/gallery/06.jpg",
  ],
  "portfolio-1": [
    "/gallery/07.jpg",
    "/gallery/08.jpg",
    "/gallery/09.jpg",
    "/gallery/10.jpg",
    "/gallery/11.jpg",
    "/gallery/12.jpg",
  ],
  "portfolio-2": [
    "/gallery/13.jpg",
    "/gallery/14.jpg",
    "/gallery/15.jpg",
    "/gallery/16.jpg",
    "/gallery/17.jpg",
    "/gallery/18.jpg",
  ],
  "portfolio-3": [
    "/gallery/19.jpg",
    "/gallery/20.jpg",
    "/gallery/21.jpg",
    "/gallery/22.jpg",
    "/gallery/23.jpg",
    "/gallery/24.png",
  ],
};

const defaultImages = [
  "/gallery/01.jpg",
  "/gallery/02.jpg",
  "/gallery/03.jpg",
  "/gallery/04.jpg",
  "/gallery/05.jpg",
  "/gallery/06.jpg",
];

type GalleryImage = {
  src: string;
  alt: string;
  delay: number;
};

const PAGE_SIZE = 3;

function chunkArray<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

const gallerySections = galleryTabs.map((tab, tabIndex) => {
  const imageSources = galleryImagesByTab[tab.id] ?? defaultImages;

  return {
    ...tab,
    images: imageSources.map((src, imageIndex): GalleryImage => {
      const pageOffset = Math.floor(imageIndex / PAGE_SIZE);

      return {
        src,
        alt: `${tab.label} 작품 ${imageIndex + 1}`,
        delay: pageOffset * 0.12 + tabIndex * 0.02,
      };
    }),
  };
});

type GallerySection = (typeof gallerySections)[number];

function GalleryCarousel({
  section,
  onImageClick,
}: {
  section: GallerySection;
  onImageClick: (images: GalleryImage[], index: number) => void;
}) {
  const pages = useMemo(
    () => chunkArray(section.images, PAGE_SIZE),
    [section.images]
  );
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (pages.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentPage((previous) => (previous + 1) % pages.length);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [pages.length]);

  useEffect(() => {
    if (currentPage >= pages.length) {
      setCurrentPage(0);
    }
  }, [currentPage, pages.length]);

  return (
    <div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {pages.map((page, pageIndex) => (
            <div
              key={`${section.id}-page-${pageIndex}`}
              className="grid min-w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6"
            >
              {page.map((image, imageIndex) => {
                const globalIndex = pageIndex * PAGE_SIZE + imageIndex;

                return (
                  <motion.button
                    key={`${section.id}-${image.src}`}
                    type="button"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: image.delay }}
                    viewport={{ amount: 0.2, once: true }}
                    className="group aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    onClick={() => onImageClick(section.images, globalIndex)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="sr-only">{`${section.label} 작품 ${
                      globalIndex + 1
                    } 확대 보기`}</span>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {pages.length > 1 ? (
        <div className="mt-6 flex justify-center gap-2">
          {pages.map((_, pageIndex) => (
            <button
              key={`${section.id}-indicator-${pageIndex}`}
              type="button"
              onClick={() => setCurrentPage(pageIndex)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                pageIndex === currentPage
                  ? "bg-brand"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`${section.label} 이미지 그룹 ${pageIndex + 1} 보기`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function StickyGallery() {
  const [lightboxState, setLightboxState] = useState<{
    images: GalleryImage[];
    currentIndex: number;
  } | null>(null);
  const touchStartX = useRef<number | null>(null);

  const openLightbox = useCallback((images: GalleryImage[], index: number) => {
    setLightboxState({ images, currentIndex: index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxState(null);
  }, []);

  const showPrevious = useCallback(() => {
    setLightboxState((prev) => {
      if (!prev) return prev;
      const nextIndex =
        (prev.currentIndex - 1 + prev.images.length) % prev.images.length;
      return {
        ...prev,
        currentIndex: nextIndex,
      };
    });
  }, []);

  const showNext = useCallback(() => {
    setLightboxState((prev) => {
      if (!prev) return prev;
      const nextIndex = (prev.currentIndex + 1) % prev.images.length;
      return {
        ...prev,
        currentIndex: nextIndex,
      };
    });
  }, []);

  const totalImages = lightboxState?.images.length ?? 0;
  const isLightboxOpen = lightboxState !== null;

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [closeLightbox, isLightboxOpen, showNext, showPrevious]);

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback(() => {
    touchStartX.current = null;
  }, []);

  const handleTouchMove = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (!isLightboxOpen) return;
      if (touchStartX.current === null) return;

      const currentX = event.touches[0]?.clientX;
      if (currentX === undefined) return;

      const deltaX = touchStartX.current - currentX;
      const threshold = 40;

      if (deltaX > threshold) {
        showNext();
        touchStartX.current = currentX;
      } else if (deltaX < -threshold) {
        showPrevious();
        touchStartX.current = currentX;
      }
    },
    [isLightboxOpen, showNext, showPrevious]
  );

  const currentImage = useMemo(() => {
    if (!lightboxState) return null;
    return lightboxState.images[lightboxState.currentIndex];
  }, [lightboxState]);

  return (
    <section id="gallery" className="relative">
      <div className="border-b border-black/5 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
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
              <GalleryCarousel section={section} onImageClick={openLightbox} />
            </div>
          </section>
        ))}
      </div>

      <AnimatePresence>
        {lightboxState && currentImage ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="학생 작품 큰 이미지"
          >
            <button
              type="button"
              className="absolute right-6 top-6 rounded-full border border-white/20 bg-black/50 p-2 text-white transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={(event) => {
                event.stopPropagation();
                closeLightbox();
              }}
              aria-label="닫기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M6 18L18 6"
                />
              </svg>
            </button>

            <div className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm font-medium text-white">
              {lightboxState.currentIndex + 1} / {totalImages}
            </div>

            <div
              className="flex h-full w-full max-w-5xl items-center justify-center"
              aria-live="polite"
            >
              <button
                type="button"
                className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                aria-label="이전 작품"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <div
                className="relative mx-4 flex max-h-[80vh] w-full max-w-4xl items-center justify-center"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                role="presentation"
              >
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="max-h-[80vh] w-full rounded-lg object-contain shadow-2xl"
                />
              </div>

              <button
                type="button"
                className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="다음 작품"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5L15.75 12l-7.5 7.5"
                  />
                </svg>
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-6 flex justify-center gap-4 md:hidden">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                aria-label="이전 작품"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="다음 작품"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5L15.75 12l-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
