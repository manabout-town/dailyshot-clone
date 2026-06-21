"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

const PILLARS = [
  {
    num: "01",
    title: "컬렉터 문화",
    desc: "1/6부터 Nendoroid까지, 컬렉터가 알아야 할 모든 스케일을 취급합니다.",
  },
  {
    num: "02",
    title: "정품 보증",
    desc: "굿스마일, 반다이, 코토부키야 등 공식 유통사를 통한 정품만 판매합니다.",
  },
  {
    num: "03",
    title: "전문 큐레이션",
    desc: "신작 발매 일정부터 한정판 알림까지, 컬렉터 전용 정보를 제공합니다.",
  },
];

export default function IntroPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15], [0, -60]);

  return (
    <div ref={containerRef} className="bg-[#0D0D0D] text-white min-h-screen">
      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <motion.div style={{ opacity, y }} className="relative z-10 flex flex-col items-center text-center gap-6">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[10px] font-bold text-[#E63946] tracking-[0.3em] uppercase"
          >
            Figure Collector&apos;s Space
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold leading-none tracking-tighter"
            style={{ fontSize: "clamp(60px, 14vw, 200px)" }}
          >
            FIGURE
            <br />
            <span className="text-[#E63946]">SHOP</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-[#888] text-base sm:text-lg max-w-sm"
          >
            국내 최대 피규어 전문 쇼핑몰
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex gap-3 mt-2"
          >
            <Link
              href="/shop"
              className="px-8 py-3 bg-[#E63946] text-white text-sm font-bold rounded hover:bg-white hover:text-[#0D0D0D] transition-colors duration-200"
            >
              쇼핑 시작하기
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 border border-[#333] text-[#888] text-sm font-medium rounded hover:border-white hover:text-white transition-colors duration-200"
            >
              로그인
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-[#555]"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2: About / Pillars */}
      <section className="max-w-5xl mx-auto px-4 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-[10px] font-bold text-[#E63946] tracking-[0.3em] uppercase mb-4">About</p>
          <h2 className="font-display font-bold text-3xl sm:text-5xl leading-tight text-white">
            컬렉터를 위해,<br />
            컬렉터가 만든 공간
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#1A1A1A] border border-[#1A1A1A]">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0D0D0D] p-8 flex flex-col gap-4"
            >
              <span className="font-display text-5xl font-bold text-[#E63946] leading-none">{p.num}</span>
              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 3: Enter CTA */}
      <section className="border-t border-[#1A1A1A]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto px-4 py-24 sm:py-32 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
        >
          <div>
            <p className="text-[10px] font-bold text-[#E63946] tracking-[0.3em] uppercase mb-4">지금 시작하세요</p>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white leading-tight">
              20,000+<br />
              <span className="text-[#555]">피규어 컬렉션</span>
            </h2>
          </div>

          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#0D0D0D] text-sm font-bold rounded hover:bg-[#E63946] hover:text-white transition-colors duration-200 shrink-0"
          >
            쇼핑 시작하기
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="border-t border-[#1A1A1A] px-4 py-6 text-center text-[10px] text-[#333] tracking-widest uppercase">
        © 2026 FigureShop · 피규어 전문 쇼핑몰
      </div>
    </div>
  );
}
