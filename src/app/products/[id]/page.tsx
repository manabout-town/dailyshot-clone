import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "@/lib/queries";
import ProductDetail from "@/components/product/ProductDetail";
import ProductGrid from "@/components/product/ProductGrid";
import { PRODUCTS } from "@/lib/data/products";

type Props = {
  params: { id: string };
};

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export const revalidate = 3600;

export default function ProductDetailPage({ params }: Props) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const related = getRelatedProducts(
    product.series_id ?? null,
    product.category_id,
    product.id
  );

  return (
    <>
      <ProductDetail product={product} />
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold mb-4">연관 상품</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}
