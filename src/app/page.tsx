import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { getFeaturedProducts, getCategories } from "@/lib/queries";

export const revalidate = 3600;

export default function HomePage() {
  const featured = getFeaturedProducts();
  const categories = getCategories();

  return (
    <>
      <HeroSection />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={featured} />
    </>
  );
}
