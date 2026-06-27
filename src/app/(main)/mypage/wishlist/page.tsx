"use client";

import { useEffect, useState } from "react";
import { useWishlistStore } from "@/lib/wishlist-store";
import { PRODUCTS } from "@/lib/data/products";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
  const { ids } = useWishlistStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const products = PRODUCTS.filter((p) => ids.includes(p.id) && p.is_active);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Link href="/mypage" className="text-sm text-[#888] hover:text-[#1A1A1A]">마이페이지</Link>
          <span className="text-[#888]">/</span>
          <span className="text-sm font-medium">위시리스트</span>
        </div>
        <h1 className="text-2xl font-bold">위시리스트</h1>
        <p className="text-sm text-[#9CA3AF] mt-1">{products.length}개 상품</p>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-[#888]">
          <p className="text-lg">위시리스트가 비어있습니다</p>
          <Link href="/products" className="text-sm text-[#1A1A1A] underline hover:text-[#E63946]">
            상품 보러 가기 →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
