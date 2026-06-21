import { searchProducts } from "@/lib/queries";
import ProductGrid from "@/components/product/ProductGrid";
import Link from "next/link";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function SearchPage({ searchParams }: Props) {
  const q = typeof searchParams.q === "string" ? searchParams.q.trim() : "";
  const results = q ? searchProducts(q) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        {q ? (
          <>
            <h1 className="text-2xl font-bold">
              &ldquo;{q}&rdquo; 검색 결과
            </h1>
            <p className="text-sm text-[#9CA3AF] mt-1">{results.length}개 상품</p>
          </>
        ) : (
          <h1 className="text-2xl font-bold">검색</h1>
        )}
      </div>

      {/* Empty / no-query state */}
      {!q && (
        <div className="flex flex-col items-center justify-center py-24 text-[#9CA3AF] gap-3">
          <p className="text-lg">검색어를 입력하세요</p>
          <p className="text-sm">피규어 이름, 브랜드, 시리즈로 검색할 수 있습니다</p>
        </div>
      )}

      {/* No results */}
      {q && results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-[#9CA3AF] gap-3">
          <p className="text-lg">&ldquo;{q}&rdquo;에 대한 결과가 없습니다</p>
          <Link href="/products" className="text-sm text-[#0A0A0A] hover:text-[#E63946] transition-colors underline">
            전체 상품 보기 →
          </Link>
        </div>
      )}

      {/* Results */}
      {q && results.length > 0 && (
        <ProductGrid products={results} />
      )}
    </div>
  );
}
