"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category, Brand } from "@/types/database";

type ProductFiltersProps = {
  categories: Category[];
  brands: Brand[];
};

const SCALES = ["1/6", "1/7", "1/8", "Nendoroid", "Figma", "S.H.Figuarts"];

export default function ProductFilters({ categories, brands }: ProductFiltersProps) {
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

  const reset = () => router.push("/products");

  return (
    <div className="flex flex-col gap-6">
      {/* Sort */}
      <div>
        <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">정렬</p>
        <select
          value={current.sort}
          onChange={(e) => update("sort", e.target.value)}
          className="w-full text-sm border border-[#E5E7EB] rounded px-3 py-2 focus:outline-none focus:border-[#0A0A0A]"
        >
          <option value="newest">최신순</option>
          <option value="price_asc">낮은 가격순</option>
          <option value="price_desc">높은 가격순</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">카테고리</p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => update("category", "")}
            className={`text-left text-sm px-2 py-1 rounded transition-colors ${!current.category ? "bg-[#0A0A0A] text-white" : "hover:bg-[#F8F8F8]"}`}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => update("category", cat.slug)}
              className={`text-left text-sm px-2 py-1 rounded transition-colors ${current.category === cat.slug ? "bg-[#0A0A0A] text-white" : "hover:bg-[#F8F8F8]"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">브랜드</p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => update("brand", "")}
            className={`text-left text-sm px-2 py-1 rounded transition-colors ${!current.brand ? "bg-[#0A0A0A] text-white" : "hover:bg-[#F8F8F8]"}`}
          >
            전체
          </button>
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => update("brand", brand.name_ko ?? brand.name)}
              className={`text-left text-sm px-2 py-1 rounded transition-colors ${current.brand === (brand.name_ko ?? brand.name) ? "bg-[#0A0A0A] text-white" : "hover:bg-[#F8F8F8]"}`}
            >
              {brand.name_ko ?? brand.name}
            </button>
          ))}
        </div>
      </div>

      {/* Scale */}
      <div>
        <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">스케일</p>
        <div className="flex flex-wrap gap-1">
          {SCALES.map((scale) => (
            <button
              key={scale}
              onClick={() => update("scale", current.scale === scale ? "" : scale)}
              className={`text-xs px-2 py-1 rounded border transition-colors ${current.scale === scale ? "bg-[#0A0A0A] text-white border-[#0A0A0A]" : "border-[#E5E7EB] hover:border-[#0A0A0A]"}`}
            >
              {scale}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={reset}
        className="text-xs text-[#9CA3AF] hover:text-[#E63946] transition-colors text-left"
      >
        필터 초기화
      </button>
    </div>
  );
}
