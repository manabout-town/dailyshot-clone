"use client";

import type { Product } from "@/types/database";
import { formatKRW, getDiscountRate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import ImageGallery from "./ImageGallery";
import AddToCartButton from "@/components/product/AddToCartButton";
import { useState, useEffect } from "react";
import { Minus, Plus, Heart, Star } from "lucide-react";
import { useWishlistStore } from "@/lib/wishlist-store";
import { getReviewsByProductId, getAverageRating } from "@/lib/data/reviews";

type ProductDetailProps = {
  product: Product;
  imageUrl?: string | null;
};

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={12}
          className={i < Math.round(rating) ? "text-[#FBBF24] fill-[#FBBF24]" : "text-[#E0DDD6] fill-[#E0DDD6]"}
        />
      ))}
    </div>
  );
}

export default function ProductDetail({ product, imageUrl }: ProductDetailProps) {
  const hasDiscount = product.original_price !== null && product.original_price > product.price;
  const discountRate = hasDiscount ? getDiscountRate(product.price, product.original_price!) : 0;
  const isSoldOut = product.stock === 0;

  const [quantity, setQuantity] = useState(1);
  const maxQty = product.stock > 0 ? product.stock : 1;

  const { toggle, has } = useWishlistStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isWished = mounted && has(product.id);

  const reviews = getReviewsByProductId(product.id);
  const avgRating = getAverageRating(reviews);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ImageGallery
          productName={product.name_ko ?? product.name}
          scale={product.scale}
          product_images={product.product_images ?? []}
          fallbackUrl={imageUrl}
        />

        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap">
            {isSoldOut && <Badge variant="soldout">품절</Badge>}
            {!isSoldOut && hasDiscount && <Badge variant="discount">-{discountRate}%</Badge>}
            {product.brand?.name_ko && <Badge variant="default">{product.brand.name_ko}</Badge>}
          </div>

          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold leading-snug">{product.name_ko ?? product.name}</h1>
              <p className="text-sm text-[#9CA3AF]">{product.name}</p>
            </div>
            <button
              onClick={() => toggle(product.id)}
              aria-label={isWished ? "위시리스트에서 제거" : "위시리스트에 추가"}
              className="shrink-0 w-10 h-10 rounded-full border border-[#E0DDD6] flex items-center justify-center hover:border-[#E63946] transition-colors mt-1"
            >
              <Heart size={18} className={isWished ? "text-[#E63946] fill-[#E63946]" : "text-[#888]"} />
            </button>
          </div>

          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <StarRow rating={avgRating} />
              <span className="text-sm font-bold tabular-nums">{avgRating.toFixed(1)}</span>
              <span className="text-xs text-[#888]">({reviews.length}개 리뷰)</span>
            </div>
          )}

          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-3xl font-bold tabular-nums">₩{formatKRW(product.price)}</span>
            {hasDiscount && (
              <span className="text-lg text-[#9CA3AF] line-through tabular-nums">
                ₩{formatKRW(product.original_price!)}
              </span>
            )}
          </div>

          <dl className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm border-t border-[#E5E7EB] pt-4 mt-2">
            {product.brand?.name_ko && (
              <>
                <dt className="text-[#9CA3AF]">브랜드</dt>
                <dd className="font-medium">{product.brand.name_ko}</dd>
              </>
            )}
            {product.series?.name_ko && (
              <>
                <dt className="text-[#9CA3AF]">시리즈</dt>
                <dd className="font-medium">{product.series.name_ko}</dd>
              </>
            )}
            {product.scale && (
              <>
                <dt className="text-[#9CA3AF]">스케일</dt>
                <dd className="font-medium">{product.scale}</dd>
              </>
            )}
            <dt className="text-[#9CA3AF]">재고</dt>
            <dd className={`font-medium ${product.stock > 0 && product.stock <= 5 ? "text-[#E63946]" : ""}`}>
              {isSoldOut ? "품절" : product.stock <= 5 ? `재고 ${product.stock}개 남음` : `${product.stock}개`}
            </dd>
          </dl>

          {!isSoldOut && (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm text-[#9CA3AF]">수량</span>
              <div className="flex items-center border border-[#E0DDD6] rounded overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="수량 감소"
                  className="w-9 h-9 flex items-center justify-center text-[#888] hover:text-[#1A1A1A] disabled:opacity-40 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-medium tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  disabled={quantity >= maxQty}
                  aria-label="수량 증가"
                  className="w-9 h-9 flex items-center justify-center text-[#888] hover:text-[#1A1A1A] disabled:opacity-40 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              {quantity >= maxQty && (
                <span className="text-xs text-[#E63946]">최대 수량입니다</span>
              )}
            </div>
          )}

          <div className="mt-4">
            <AddToCartButton product={product} quantity={quantity} />
          </div>

          {product.description && (
            <div className="border-t border-[#E5E7EB] pt-4 mt-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] mb-2">상품 설명</h2>
              <p className="text-sm text-[#555] leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>
          )}

          {reviews.length > 0 && (
            <div className="border-t border-[#E5E7EB] pt-4 mt-2">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-sm font-bold text-[#1A1A1A]">구매 후기</h2>
                <div className="flex items-center gap-1.5">
                  <StarRow rating={avgRating} />
                  <span className="text-sm font-bold tabular-nums">{avgRating.toFixed(1)}</span>
                  <span className="text-xs text-[#888]">({reviews.length})</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="bg-[#F7F6F3] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <StarRow rating={review.rating} />
                      <span className="text-xs font-bold text-[#1A1A1A]">{review.author}</span>
                      <span className="text-xs text-[#9CA3AF] ml-auto">{review.created_at}</span>
                    </div>
                    <p className="text-sm text-[#555] leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
