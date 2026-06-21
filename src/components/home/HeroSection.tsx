"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32 flex flex-col items-center text-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#E63946] text-sm font-semibold tracking-widest uppercase"
        >
          Figure Collector&apos;s Paradise
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight"
        >
          당신이 원하는 <br />
          <span className="text-[#E63946]">피규어</span>가 여기에
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#9CA3AF] text-lg max-w-md"
        >
          굿스마일, 반다이, 코토부키야 등 국내외 최고의 피규어 브랜드
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-3"
        >
          <Link href="/products">
            <Button variant="secondary" size="lg">
              전체 상품 보기
            </Button>
          </Link>
          <Link href="/products?category=anime">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#0A0A0A]"
            >
              애니메이션
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E63946] to-transparent" />
    </section>
  );
}
