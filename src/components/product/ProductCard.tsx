"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/database";
import { formatKRW, getDiscountRate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.original_price !== null && product.original_price > product.price;
  const discountRate = hasDiscount ? getDiscountRate(product.price, product.original_price!) : 0;
  const isSoldOut = product.stock === 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/products/${product.id}`} className="block group">
        {/* Image */}
        <div className="relative aspect-square w-full rounded-lg bg-[#F8F8F8] overflow-hidden mb-3">
          <div className="w-full h-full flex items-center justify-center text-[#9CA3AF] text-sm">
            {/* Placeholder — no real images in static data */}
            <span className="font-medium">{product.scale ?? "Figure"}</span>
          </div>

          {/* Badges overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isSoldOut && <Badge variant="soldout">품절</Badge>}
            {!isSoldOut && hasDiscount && (
              <Badge variant="discount">-{discountRate}%</Badge>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <p className="text-xs text-[#9CA3AF]">{product.brand?.name_ko ?? product.brand?.name}</p>
          <p className="text-sm font-medium text-[#0A0A0A] line-clamp-2 leading-snug">
            {product.name_ko ?? product.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-sm font-bold tabular-nums ${isSoldOut ? "text-[#9CA3AF]" : "text-[#0A0A0A]"}`}>
              ₩{formatKRW(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-[#9CA3AF] line-through tabular-nums">
                ₩{formatKRW(product.original_price!)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
