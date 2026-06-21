import { Suspense } from "react";
import { getProducts, getCategories, getBrands } from "@/lib/queries";
import type { ProductFilters } from "@/types/database";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFiltersPanel from "@/components/product/ProductFilters";
import FilterChips from "@/components/product/FilterChips";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ProductsPage({ searchParams }: Props) {
  const filters: ProductFilters = {
    category: typeof searchParams.category === "string" ? searchParams.category : undefined,
    brand: typeof searchParams.brand === "string" ? searchParams.brand : undefined,
    scale: typeof searchParams.scale === "string" ? searchParams.scale : undefined,
    sort: (searchParams.sort as ProductFilters["sort"]) ?? "newest",
    page: searchParams.page ? Number(searchParams.page) : 1,
    q: typeof searchParams.q === "string" ? searchParams.q : undefined,
  };

  const { data: products, count } = getProducts(filters);
  const categories = getCategories();
  const brands = getBrands();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">전체 상품</h1>
        <p className="text-sm text-[#9CA3AF] mt-1">{count}개 상품</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters — desktop only */}
        <aside className="hidden lg:block w-52 shrink-0">
          <Suspense>
            <ProductFiltersPanel categories={categories} brands={brands} />
          </Suspense>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <Suspense>
            <FilterChips />
          </Suspense>

          <Suspense
            fallback={
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
