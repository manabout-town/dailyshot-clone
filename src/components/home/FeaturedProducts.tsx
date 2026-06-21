import type { Product } from "@/types/database";
import ProductGrid from "@/components/product/ProductGrid";
import Link from "next/link";

type FeaturedProductsProps = {
  products: Product[];
};

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-[#E63946] rounded-full" />
          <h2 className="text-lg font-bold tracking-tight">추천 상품</h2>
        </div>
        <Link href="/products" className="text-xs text-[#888] hover:text-[#1A1A1A] transition-colors tracking-wide">
          전체보기 →
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
