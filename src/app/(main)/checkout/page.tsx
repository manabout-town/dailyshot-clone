"use client";

import { useCartStore } from "@/lib/cart-store";
import { usePointStore } from "@/lib/point-store";
import { useOrderStore } from "@/lib/order-store";
import { formatKRW } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const { balance, usePoints, earnPoints } = usePointStore();
  const { addOrder } = useOrderStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => setMounted(true), []);
  const [pointInput, setPointInput] = useState("");
  const [appliedPoints, setAppliedPoints] = useState(0);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const orderTotal = total();
  const finalTotal = Math.max(0, orderTotal - appliedPoints);
  const needsCard = finalTotal > 0;

  // Redirect client-side only — router.push during SSR throws ReferenceError (no window.location)
  useEffect(() => {
    if (items.length === 0) router.push("/cart");
  }, [items.length, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleApplyPoints = () => {
    const requested = Math.min(Number(pointInput) || 0, balance, orderTotal);
    setAppliedPoints(requested);
  };

  const handleUseAllPoints = () => {
    const max = Math.min(balance, orderTotal);
    setAppliedPoints(max);
    setPointInput(String(max));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    if (appliedPoints > 0) usePoints(appliedPoints);

    const earnedPoints = finalTotal > 0 ? Math.round(finalTotal * 0.01) : 0;
    if (earnedPoints > 0) earnPoints(earnedPoints);

    const now = Date.now();
    const orderData = {
      orderId: `FS-${now}`,
      items,
      total: orderTotal,
      usedPoints: appliedPoints,
      earnedPoints,
      finalTotal,
      trackingNumber: `TRK-${String(now).slice(-8)}`,
      createdAt: new Date(now).toISOString(),
    };
    addOrder(orderData);
    sessionStorage.setItem("fs-last-order", JSON.stringify(orderData));

    clearCart();
    router.push("/checkout/success");
  };

  if (!mounted) return null;
  if (items.length === 0) return null;

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

        {/* Points */}
        <section className="bg-[#EDEAE3] rounded-xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#888]">포인트 사용</h2>
            <span className="text-xs text-[#888]">
              보유 <span className="font-bold text-[#1A1A1A] tabular-nums">₩{formatKRW(balance)}</span>P
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              max={Math.min(balance, orderTotal)}
              placeholder="사용할 포인트"
              value={pointInput}
              onChange={(e) => setPointInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#F7F6F3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] tabular-nums"
            />
            <button
              type="button"
              onClick={handleApplyPoints}
              className="px-4 py-2 bg-[#1A1A1A] text-white text-xs font-medium rounded hover:bg-[#E63946] transition-colors"
            >
              적용
            </button>
            <button
              type="button"
              onClick={handleUseAllPoints}
              className="px-4 py-2 bg-[#F7F6F3] text-[#1A1A1A] text-xs font-medium rounded hover:bg-[#E0DDD6] transition-colors"
            >
              전액 사용
            </button>
          </div>
          {appliedPoints > 0 && (
            <p className="text-xs text-[#E63946] font-medium">
              -{formatKRW(appliedPoints)}P 적용됨
            </p>
          )}
        </section>

        {/* Payment */}
        {needsCard && (
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
            <input name="cardNumber" required={needsCard} placeholder="카드 번호 0000-0000-0000-0000" value={form.cardNumber} onChange={handleChange}
              className="w-full px-3 py-2 bg-[#F7F6F3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]" />
            <div className="flex gap-3">
              <input name="expiry" required={needsCard} placeholder="유효기간 MM/YY" value={form.expiry} onChange={handleChange}
                className="flex-1 px-3 py-2 bg-[#F7F6F3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]" />
              <input name="cvv" required={needsCard} placeholder="CVC" value={form.cvv} onChange={handleChange}
                className="w-24 px-3 py-2 bg-[#F7F6F3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]" />
            </div>
          </section>
        )}

        {/* Summary */}
        <div className="flex flex-col gap-2 text-sm border-t border-[#E0DDD6] pt-4">
          <div className="flex justify-between text-[#888]">
            <span>상품 합계</span>
            <span className="tabular-nums">₩{formatKRW(orderTotal)}</span>
          </div>
          {appliedPoints > 0 && (
            <div className="flex justify-between text-[#E63946]">
              <span>포인트 할인</span>
              <span className="tabular-nums">-₩{formatKRW(appliedPoints)}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-[#E0DDD6]">
            <span className="font-bold">최종 결제금액</span>
            <span className="text-xl font-bold tabular-nums">₩{formatKRW(finalTotal)}</span>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3 bg-[#1A1A1A] text-white text-sm font-medium rounded hover:bg-[#E63946] transition-colors disabled:opacity-50">
          {loading ? "결제 처리 중..." : finalTotal === 0 ? "포인트로 결제하기" : `₩${formatKRW(finalTotal)} 결제하기`}
        </button>

        <p className="text-xs text-[#888] text-center">이 결제는 데모용으로 실제 결제가 이루어지지 않습니다</p>
      </form>
    </div>
  );
}
