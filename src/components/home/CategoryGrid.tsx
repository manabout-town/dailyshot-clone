import Link from "next/link";
import type { Category } from "@/types/database";

const categoryEmoji: Record<string, string> = {
  anime: "🎌",
  game: "🎮",
  sports: "⚽",
  movie: "🎬",
};

type CategoryGridProps = {
  categories: Category[];
};

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">카테고리</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-[#F8F8F8] hover:bg-[#0A0A0A] hover:text-white transition-colors duration-200 group"
          >
            <span className="text-3xl">{categoryEmoji[cat.slug] ?? "📦"}</span>
            <span className="text-sm font-semibold">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
