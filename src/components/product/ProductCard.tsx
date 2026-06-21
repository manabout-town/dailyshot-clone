"use client";

import Link from "next/link";
import Image from "next/image";
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
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.18 }}>
      <Link href={`/products/${product.id}`} className="block group">
        <div className="relative aspect-square w-full rounded-lg bg-[#EDEAE3] overflow-hidden mb-3">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name_ko ?? product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-display font-bold text-[#D0CCC4] text-2xl">{product.scale ?? "F"}</span>
            </div>
          )}

          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {isSoldOut && <Badge variant="soldout">품절</Badge>}
            {!isSoldOut && hasDiscount && <Badge variant="discount">-{discountRate}%</Badge>}
          </div>

          <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-[#1A1A1A] rounded-lg transition-all duration-200 z-10" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#888]">
            {product.brand?.name_ko ?? product.brand?.name}
          </p>
          <p className="text-sm font-medium text-[#1A1A1A] line-clamp-2 leading-snug mt-0.5">
            {product.name_ko ?? product.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-sm font-bold tabular-nums ${isSoldOut ? "text-[#888]" : "text-[#1A1A1A]"}`}>
              ₩{formatKRW(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-[#888] line-through tabular-nums">
                ₩{formatKRW(product.original_price!)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
