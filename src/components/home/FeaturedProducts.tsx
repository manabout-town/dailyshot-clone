import type { Product } from "@/types/database";
import ProductGrid from "@/components/product/ProductGrid";

type FeaturedProductsProps = {
  products: Product[];
};

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">추천 상품</h2>
        <a
          href="/products"
          className="text-sm text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors"
        >
          전체보기 →
        </a>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
