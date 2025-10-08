"use client";
import { motion } from "framer-motion";

export default function HeroScrollArrow() {
  const handleClick = () => {
    const nextSection = document.querySelector("#after-hero");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white hover:text-brand transition"
      aria-label="아래로 스크롤"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="w-8 h-8"
        animate={{ y: [0, 10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </motion.svg>
    </motion.button>
  );
}
