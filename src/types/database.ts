export type Brand = {
  id: string;
  name: string;
  name_ko: string | null;
  logo_url: string | null;
};

export type Series = {
  id: string;
  name: string;
  name_ko: string | null;
  brand_id: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  priority: number;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  position: number;
};

export type Product = {
  id: string;
  name: string;
  name_ko: string | null;
  description: string | null;
  price: number;
  original_price: number | null;
  brand_id: string;
  series_id: string | null;
  category_id: string;
  stock: number;
  scale: string | null;
  is_active: boolean;
  is_featured: boolean;
  release_date: string | null;
  image_url?: string | null;
  brand?: Brand;
  series?: Series | null;
  category?: Category;
  product_images?: ProductImage[];
};

export type ProductFilters = {
  category?: string;
  brand?: string;
  scale?: string;
  sort?: "newest" | "price_asc" | "price_desc";
  page?: number;
  q?: string;
};
