"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroTopBadge() {
  return (
    <div className="pointer-events-none absolute top-20 md:top-22 left-1/2 -translate-x-1/2 z-40 text-center">
      {/* 슬로건 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="text-xl text-2xl text-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
      >
        “쉽게 길들여지지 않는 고양이들처럼”
      </motion.div>

      {/* 로고 이미지 (public/logo.png) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="mt-0 inline-flex items-center justify-center px-5 md:px-6 py-2 md:py-2.5 pointer-events-auto"
      >
        <Image
          src="/logo.png"
          alt="MoDaGo 로고"
          width={270} // 로고 크기 조정 가능 (100~160 정도 추천)
          height={40}
          className="object-contain"
          priority
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="text-xl text-2xl text-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
      >
        since 1989
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="text-xl text-2xl text-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
      >
        홍대 앞 본원
      </motion.div>
    </div>
  );
}
