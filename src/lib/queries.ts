import { PRODUCTS } from "./data/products";
import { CATEGORIES } from "./data/categories";
import { BRANDS } from "./data/brands";
import type { Product, ProductFilters } from "@/types/database";

const PAGE_SIZE = 24;

export function getProducts(filters: ProductFilters = {}): { data: Product[]; count: number } {
  const { category, brand, scale, sort = "newest", page = 1 } = filters;

  let items = PRODUCTS.filter((p) => p.is_active);

  if (category) items = items.filter((p) => p.category?.slug === category);
  if (brand) items = items.filter((p) => p.brand?.name_ko === brand || p.brand?.name === brand);
  if (scale) items = items.filter((p) => p.scale === scale);

  if (sort === "price_asc") items = [...items].sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") items = [...items].sort((a, b) => b.price - a.price);

  const count = items.length;
  const from = (page - 1) * PAGE_SIZE;
  return { data: items.slice(from, from + PAGE_SIZE), count };
}

export function getProductById(id: string): Product | null {
  return PRODUCTS.find((p) => p.id === id && p.is_active) ?? null;
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.is_featured && p.is_active).slice(0, 8);
}

export function getRelatedProducts(seriesId: string | null, categoryId: string, excludeId: string): Product[] {
  let items = PRODUCTS.filter((p) => p.is_active && p.id !== excludeId);
  if (seriesId) items = items.filter((p) => p.series_id === seriesId);
  else items = items.filter((p) => p.category_id === categoryId);
  return items.slice(0, 4);
}

export function searchProducts(q: string): Product[] {
  const term = q.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.is_active &&
      (p.name.toLowerCase().includes(term) ||
        (p.name_ko ?? "").toLowerCase().includes(term) ||
        (p.brand?.name_ko ?? "").toLowerCase().includes(term) ||
        (p.series?.name_ko ?? "").toLowerCase().includes(term))
  );
}

export function getCategories() {
  return CATEGORIES;
}

export function getBrands() {
  return BRANDS;
}
