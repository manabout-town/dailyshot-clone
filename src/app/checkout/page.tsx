"use client";

import { useCartStore } from "@/lib/cart-store";
import { formatKRW } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">결제</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Delivery */}
        <section className="bg-[#EDEAE3] rounded-xl p-5 flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#888]">배송 정보</h2>
          <input name="name" required placeholder="수령인 이름" value={form.name} onChange={handleChange}
            className="w-full px-3 py-2 bg-[#F7F6F3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]" />
          <input name="phone" required placeholder="연락처 (010-0000-0000)" value={form.phone} onChange={handleChange}
            className="w-full px-3 py-2 bg-[#F7F6F3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]" />
          <input name="address" required placeholder="배송 주소" value={form.address} onChange={handleChange}
            className="w-full px-3 py-2 bg-[#F7F6F3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]" />
        </section>

        {/* Payment */}
        <section className="bg-[#EDEAE3] rounded-xl p-5 flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#888]">결제 수단</h2>
          <div className="flex gap-2">
            <div className="flex-1 px-3 py-1.5 bg-[#1A1A1A] text-white text-xs font-medium rounded text-center">
              신용카드
            </div>
            <div className="flex-1 px-3 py-1.5 bg-[#F7F6F3] text-[#888] text-xs font-medium rounded text-center cursor-not-allowed">
              토스페이 (준비중)
            </div>
            <div className="flex-1 px-3 py-1.5 bg-[#F7F6F3] text-[#888] text-xs font-medium rounded text-center cursor-not-allowed">
              카카오페이 (준비중)
            </div>
          </div>
          <input name="cardNumber" required placeholder="카드 번호 0000-0000-0000-0000" value={form.cardNumber} onChange={handleChange}
            className="w-full px-3 py-2 bg-[#F7F6F3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]" />
          <div className="flex gap-3">
            <input name="expiry" required placeholder="유효기간 MM/YY" value={form.expiry} onChange={handleChange}
              className="flex-1 px-3 py-2 bg-[#F7F6F3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]" />
            <input name="cvv" required placeholder="CVC" value={form.cvv} onChange={handleChange}
              className="w-24 px-3 py-2 bg-[#F7F6F3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]" />
          </div>
        </section>

        {/* Summary */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#888]">{items.reduce((s, i) => s + i.quantity, 0)}개 상품</span>
          <span className="text-xl font-bold tabular-nums">₩{formatKRW(total())}</span>
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3 bg-[#1A1A1A] text-white text-sm font-medium rounded hover:bg-[#E63946] transition-colors disabled:opacity-50">
          {loading ? "결제 처리 중..." : `₩${formatKRW(total())} 결제하기`}
        </button>

        <p className="text-xs text-[#888] text-center">이 결제는 데모용으로 실제 결제가 이루어지지 않습니다</p>
      </form>
    </div>
  );
}
