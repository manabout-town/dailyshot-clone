"use client";

import { useCartStore } from "@/lib/cart-store";
import { formatKRW } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 flex flex-col items-center gap-4 text-[#888]">
        <p className="text-lg font-medium">장바구니가 비어있습니다</p>
        <Link href="/shop" className="text-sm text-[#1A1A1A] underline hover:text-[#E63946]">
          상품 보러 가기 →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">장바구니</h1>

      <div className="flex flex-col gap-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 bg-[#EDEAE3] rounded-lg">
            <div className="w-20 h-20 rounded-lg bg-[#F7F6F3] overflow-hidden shrink-0 relative">
              {item.image_url ? (
                <Image src={item.image_url} alt={item.name_ko ?? item.name} fill className="object-cover" sizes="80px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-[#888]">
                  {item.scale ?? "F"}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#888]">{item.brand_ko}</p>
              <p className="text-sm font-medium text-[#1A1A1A] mt-0.5 line-clamp-1">{item.name_ko ?? item.name}</p>
              <p className="text-sm text-[#888] tabular-nums mt-1">₩{formatKRW(item.price)}</p>
              {item.quantity > 1 && (
                <p className="text-sm font-bold tabular-nums text-[#E63946]">= ₩{formatKRW(item.price * item.quantity)}</p>
              )}
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <button onClick={() => removeItem(item.id)} className="text-[#888] hover:text-[#E63946] transition-colors">
                <Trash2 size={14} />
              </button>
              <div className="flex items-center gap-2 border border-[#E0DDD6] rounded px-2 py-1">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="text-[#888] hover:text-[#1A1A1A] disabled:opacity-30">
                  <Minus size={12} />
                </button>
                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock} className="text-[#888] hover:text-[#1A1A1A] disabled:opacity-30">
                  <Plus size={12} />
                </button>
              </div>
              {item.quantity >= item.stock && (
                <span className="text-[10px] text-[#E63946]">최대</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#E0DDD6] pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">총 결제금액</span>
          <span className="text-xl font-bold tabular-nums">₩{formatKRW(total())}</span>
        </div>
        <Link
          href="/checkout"
          className="block w-full py-3 bg-[#1A1A1A] text-white text-sm font-medium rounded text-center hover:bg-[#E63946] transition-colors"
        >
          결제하기
        </Link>
      </div>
    </div>
  );
}
