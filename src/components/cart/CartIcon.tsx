"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

export default function CartIcon() {
  const count = useCartStore((s) => s.count());

  return (
    <Link href="/cart" className="relative text-[#888] hover:text-[#1A1A1A] transition-colors">
      <ShoppingBag size={20} />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E63946] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
