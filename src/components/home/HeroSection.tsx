"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CATEGORIES = [
  { label: "애니메이션", slug: "anime" },
  { label: "게임", slug: "game" },
  { label: "영화", slug: "movie" },
  { label: "스포츠", slug: "sports" },
];

export default function HeroSection() {
  return (
    <section className="bg-[#F7F6F3] border-b border-[#E0DDD6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-12 sm:pt-12 sm:pb-16">
        {/* Category strip */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <nav className="flex items-center gap-1 flex-wrap">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#888] hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 rounded transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/products"
            className="text-[11px] font-medium text-[#888] hover:text-[#1A1A1A] transition-colors tracking-wide shrink-0"
          >
            전체 보기 →
          </Link>
        </div>

        {/* Signature: scale fraction as architectural typography */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold leading-none tracking-tighter select-none"
          style={{ fontSize: "clamp(80px, 16vw, 240px)" }}
          aria-label="1/7 스케일 피규어"
        >
          <span className="text-[#1A1A1A]">1</span>
          <span className="text-[#E63946]">/</span>
          <span className="text-[#1A1A1A]">7</span>
        </motion.h1>

        {/* Subtitle row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <p className="text-base sm:text-lg font-medium text-[#1A1A1A]">
              피규어 컬렉터를 위한 전문 쇼핑몰
            </p>
            <p className="text-sm text-[#888] mt-1">
              굿스마일 · 반다이 · 코토부키야 · 맥스팩토리 · 알터
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-white text-sm font-medium rounded hover:bg-[#E63946] transition-colors duration-200 shrink-0"
          >
            상품 둘러보기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
