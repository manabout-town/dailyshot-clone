"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FilterChips() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = Object.fromEntries(searchParams.entries());
  const activeFilters = Object.entries(params).filter(
    ([key]) => key !== "sort" && key !== "page"
  );

  if (activeFilters.length === 0) return null;

  const removeFilter = (key: string) => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete(key);
    next.delete("page");
    router.push(`/products?${next.toString()}`);
  };

  const labelMap: Record<string, string> = {
    category: "카테고리",
    brand: "브랜드",
    scale: "스케일",
    q: "검색",
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {activeFilters.map(([key, value]) => (
        <button
          key={key}
          onClick={() => removeFilter(key)}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#0A0A0A] text-white hover:bg-[#E63946] transition-colors"
        >
          {labelMap[key] ?? key}: {value}
          <span aria-hidden>×</span>
        </button>
      ))}
    </div>
  );
}
