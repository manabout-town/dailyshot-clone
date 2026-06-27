"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatKRW } from "@/lib/utils";
import type { CartItem } from "@/lib/cart-store";

type OrderSnapshot = {
  orderId: string;
  items: CartItem[];
  total: number;
  usedPoints: number;
  earnedPoints: number;
  finalTotal: number;
  trackingNumber: string;
  createdAt: string;
};

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<OrderSnapshot | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("fs-last-order");
      if (raw) {
        setOrder(JSON.parse(raw));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center gap-5 text-center">
      <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center text-2xl text-white">
        ✓
      </div>
      <h1 className="text-2xl font-bold">주문 완료!</h1>
      <p className="text-[#888] text-sm">
        주문이 성공적으로 접수되었습니다.<br />
        배송 준비 후 안내드리겠습니다.
      </p>

      {order && (
        <div className="w-full mt-2 bg-[#EDEAE3] rounded-xl p-5 text-left">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#888]">주문 번호</span>
            <span className="text-sm font-bold tabular-nums">{order.orderId}</span>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#F7F6F3] overflow-hidden shrink-0 relative">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.name_ko ?? item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#888]">
                      {item.scale ?? "F"}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">{item.name_ko ?? item.name}</p>
                  <p className="text-xs text-[#888]">x{item.quantity}</p>
                </div>
                <span className="text-sm font-bold tabular-nums shrink-0">
                  ₩{formatKRW(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#D0CCC4] pt-3 flex flex-col gap-1.5">
            {order.usedPoints > 0 && (
              <div className="flex justify-between text-sm text-[#888]">
                <span>상품 합계</span>
                <span className="tabular-nums">₩{formatKRW(order.total)}</span>
              </div>
            )}
            {order.usedPoints > 0 && (
              <div className="flex justify-between text-sm text-[#E63946]">
                <span>포인트 할인</span>
                <span className="tabular-nums">-₩{formatKRW(order.usedPoints)}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-1">
              <span className="text-sm font-bold">최종 결제금액</span>
              <span className="text-lg font-bold tabular-nums">₩{formatKRW(order.finalTotal ?? order.total)}</span>
            </div>
            {order.earnedPoints > 0 && (
              <div className="flex justify-between text-sm text-[#888] pt-1">
                <span>포인트 적립</span>
                <span className="tabular-nums text-[#1A1A1A] font-medium">+{formatKRW(order.earnedPoints)}P</span>
              </div>
            )}
          </div>
        </div>
      )}

      <Link
        href="/shop"
        className="mt-4 px-6 py-2.5 bg-[#1A1A1A] text-white text-sm font-medium rounded hover:bg-[#E63946] transition-colors"
      >
        쇼핑 계속하기
      </Link>
    </div>
  );
}
