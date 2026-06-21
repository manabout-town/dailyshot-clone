import type { Product } from "@/types/database";
import { formatKRW, getDiscountRate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import ImageGallery from "./ImageGallery";
import AddToCartButton from "@/components/product/AddToCartButton";

type ProductDetailProps = {
  product: Product;
  imageUrl?: string | null;
};

export default function ProductDetail({ product, imageUrl }: ProductDetailProps) {
  const hasDiscount =
    product.original_price !== null && product.original_price > product.price;
  const discountRate = hasDiscount
    ? getDiscountRate(product.price, product.original_price!)
    : 0;
  const isSoldOut = product.stock === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ImageGallery productName={product.name_ko ?? product.name} scale={product.scale} imageUrl={imageUrl} />

        <div className="flex flex-col gap-4">
          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {isSoldOut && <Badge variant="soldout">품절</Badge>}
            {!isSoldOut && hasDiscount && (
              <Badge variant="discount">-{discountRate}%</Badge>
            )}
            {product.brand?.name_ko && (
              <Badge variant="default">{product.brand.name_ko}</Badge>
            )}
          </div>

          {/* Name */}
          <h1 className="text-2xl font-bold leading-snug">
            {product.name_ko ?? product.name}
          </h1>
          <p className="text-sm text-[#9CA3AF]">{product.name}</p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-3xl font-bold tabular-nums">
              ₩{formatKRW(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-[#9CA3AF] line-through tabular-nums">
                ₩{formatKRW(product.original_price!)}
              </span>
            )}
          </div>

          {/* Specs table */}
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
            <dd className="font-medium">
              {isSoldOut ? "품절" : `${product.stock}개`}
            </dd>
          </dl>

          {/* CTA */}
          <div className="mt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
