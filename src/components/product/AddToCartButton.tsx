"use client";

import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/types/database";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

type Props = {
  product: Product;
  quantity?: number;
};

export default function AddToCartButton({ product, quantity = 1 }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        name_ko: product.name_ko,
        price: product.price,
        brand_ko: product.brand?.name_ko ?? null,
        scale: product.scale,
        image_url: product.image_url ?? null,
        stock: product.stock,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (product.stock === 0) {
    return (
      <button disabled className="w-full py-3 bg-[#EDEAE3] text-[#888] text-sm font-medium rounded cursor-not-allowed">
        품절
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-3 text-sm font-medium rounded transition-all duration-200 flex items-center justify-center gap-2 ${
        added
          ? "bg-[#1A1A1A] text-white"
          : "bg-[#1A1A1A] text-white hover:bg-[#E63946]"
      }`}
    >
      <ShoppingBag size={16} />
      {added ? "담았습니다!" : "장바구니 담기"}
    </button>
  );
}
