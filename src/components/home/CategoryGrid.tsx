import Link from "next/link";
import type { Category } from "@/types/database";

const categoryDesc: Record<string, string> = {
  anime: "TVA · OVA · 극장판",
  game: "RPG · 액션 · 격투",
  sports: "스포츠 · 아이돌",
  movie: "마블 · DC · 실사",
};

type CategoryGridProps = {
  categories: Category[];
};

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#E0DDD6] border border-[#E0DDD6] rounded-xl overflow-hidden">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="group bg-[#F7F6F3] hover:bg-[#1A1A1A] transition-colors duration-200 p-6 flex flex-col gap-2"
          >
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#888] group-hover:text-[#E63946] transition-colors">
              {cat.slug}
            </span>
            <span className="text-base font-bold text-[#1A1A1A] group-hover:text-white transition-colors">
              {cat.name}
            </span>
            <span className="text-xs text-[#888] group-hover:text-[#555] transition-colors">
              {categoryDesc[cat.slug] ?? ""}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
