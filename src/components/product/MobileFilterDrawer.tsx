"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Category, Brand } from "@/types/database";

const SCALES = ["1/6", "1/7", "1/8", "Nendoroid", "Figma", "S.H.Figuarts"];

type Props = {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  brands: Brand[];
};

export default function MobileFilterDrawer({ open, onClose, categories, brands }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = {
    category: searchParams.get("category") ?? "",
    brand: searchParams.get("brand") ?? "",
    scale: searchParams.get("scale") ?? "",
    sort: searchParams.get("sort") ?? "newest",
  };

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.delete("page");
    router.push(`/products?${next.toString()}`);
  };

  const reset = () => {
    router.push("/products");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#F7F6F3] rounded-t-2xl shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#E0DDD6]">
              <span className="text-sm font-bold">필터</span>
              <button
                onClick={onClose}
                aria-label="닫기"
                className="text-[#888] hover:text-[#1A1A1A] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-5 py-4 flex flex-col gap-6">
              {/* Sort */}
              <div>
                <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
                  정렬
                </p>
                <select
                  value={current.sort}
                  onChange={(e) => update("sort", e.target.value)}
                  className="w-full text-sm border border-[#E5E7EB] rounded px-3 py-2 bg-white focus:outline-none focus:border-[#1A1A1A]"
                >
                  <option value="newest">최신순</option>
                  <option value="price_asc">낮은 가격순</option>
                  <option value="price_desc">높은 가격순</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
                  카테고리
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => update("category", "")}
                    className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                      !current.category
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : "border-[#E5E7EB] hover:border-[#1A1A1A]"
                    }`}
                  >
                    전체
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => update("category", cat.slug)}
                      className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                        current.category === cat.slug
                          ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                          : "border-[#E5E7EB] hover:border-[#1A1A1A]"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
                  브랜드
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => update("brand", "")}
                    className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                      !current.brand
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : "border-[#E5E7EB] hover:border-[#1A1A1A]"
                    }`}
                  >
                    전체
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => update("brand", brand.name_ko ?? brand.name)}
                      className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                        current.brand === (brand.name_ko ?? brand.name)
                          ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                          : "border-[#E5E7EB] hover:border-[#1A1A1A]"
                      }`}
                    >
                      {brand.name_ko ?? brand.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scale */}
              <div>
                <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
                  스케일
                </p>
                <div className="flex flex-wrap gap-2">
                  {SCALES.map((scale) => (
                    <button
                      key={scale}
                      onClick={() => update("scale", current.scale === scale ? "" : scale)}
                      className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                        current.scale === scale
                          ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                          : "border-[#E5E7EB] hover:border-[#1A1A1A]"
                      }`}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pb-2">
                <button
                  onClick={reset}
                  className="flex-1 py-2.5 border border-[#E5E7EB] text-sm rounded hover:border-[#1A1A1A] transition-colors"
                >
                  초기화
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-[#1A1A1A] text-white text-sm rounded hover:bg-[#E63946] transition-colors"
                >
                  적용하기
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
