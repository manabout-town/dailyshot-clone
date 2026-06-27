"use client";

import { useState, Suspense } from "react";
import { SlidersHorizontal } from "lucide-react";
import MobileFilterDrawer from "./MobileFilterDrawer";
import type { Category, Brand } from "@/types/database";

type Props = {
  categories: Category[];
  brands: Brand[];
};

export default function MobileFilterButton({ categories, brands }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E0DDD6] rounded bg-white hover:border-[#1A1A1A] transition-colors"
      >
        <SlidersHorizontal size={14} />
        필터
      </button>

      <Suspense>
        <MobileFilterDrawer
          open={open}
          onClose={() => setOpen(false)}
          categories={categories}
          brands={brands}
        />
      </Suspense>
    </>
  );
}
