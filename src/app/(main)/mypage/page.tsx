"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Heart, Package, Star, Truck } from "lucide-react";
import { usePointStore } from "@/lib/point-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useOrderStore, getOrderStep, ORDER_STEPS } from "@/lib/order-store";
import { formatKRW } from "@/lib/utils";

const STEP_COLORS = [
  "bg-[#9CA3AF]",   // 접수
  "bg-[#FBBF24]",   // 처리중
  "bg-[#3B82F6]",   // 배송중
  "bg-[#22C55E]",   // 배송완료
];

function OrderStatusBar({ createdAt }: { createdAt: string }) {
  const [step, setStep] = useState(() => getOrderStep(createdAt));

  useEffect(() => {
    const timer = setInterval(() => setStep(getOrderStep(createdAt)), 30_000);
    return () => clearInterval(timer);
  }, [createdAt]);

  return (
    <div className="flex items-center gap-0 mt-2">
      {ORDER_STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${
            i <= step ? `${STEP_COLORS[step]} text-white` : "bg-[#E5E2DB] text-[#9CA3AF]"
          } ${i === step ? "ring-2 ring-offset-1 ring-current opacity-100" : i < step ? "opacity-80" : "opacity-50"}`}>
            {label}
          </div>
          {i < ORDER_STEPS.length - 1 && (
            <div className={`w-3 h-0.5 ${i < step ? STEP_COLORS[step] : "bg-[#E0DDD6]"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { balance } = usePointStore();
  const { count: wishlistCount } = useWishlistStore();
  const { orders } = useOrderStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (!mounted || status === "loading") return null;
  if (!session) return null;

  const initial = session.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">마이페이지</h1>

      {/* Profile */}
      <div className="bg-[#EDEAE3] rounded-xl p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#E63946] flex items-center justify-center text-white text-xl font-bold shrink-0">
          {initial}
        </div>
        <div>
          <p className="font-bold text-lg">{session.user?.name}</p>
          <p className="text-sm text-[#888]">{session.user?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#EDEAE3] rounded-xl p-4 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[#888] text-xs font-semibold uppercase tracking-wider">
            <Star size={12} />
            보유 포인트
          </div>
          <p className="text-2xl font-bold tabular-nums">
            {formatKRW(balance)}
            <span className="text-sm font-medium text-[#888] ml-1">P</span>
          </p>
        </div>
        <Link href="/mypage/wishlist" className="bg-[#EDEAE3] rounded-xl p-4 flex flex-col gap-1 hover:bg-[#E5E2DB] transition-colors">
          <div className="flex items-center gap-1.5 text-[#888] text-xs font-semibold uppercase tracking-wider">
            <Heart size={12} />
            위시리스트
          </div>
          <p className="text-2xl font-bold tabular-nums">
            {wishlistCount()}
            <span className="text-sm font-medium text-[#888] ml-1">개</span>
          </p>
        </Link>
      </div>

      {/* Order history */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Package size={16} />
          <h2 className="font-bold">주문 내역</h2>
          <span className="text-xs text-[#888]">{orders.length}건</span>
        </div>

        {orders.length === 0 ? (
          <div className="bg-[#EDEAE3] rounded-xl p-8 text-center text-[#888]">
            <p className="text-sm">주문 내역이 없습니다</p>
            <Link href="/products" className="text-sm text-[#1A1A1A] underline hover:text-[#E63946] mt-2 inline-block">
              상품 보러 가기 →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => {
              const step = getOrderStep(order.createdAt);
              const showTracking = step >= 2;
              return (
                <div key={order.orderId} className="bg-[#EDEAE3] rounded-xl p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#888]">{order.orderId}</span>
                    <span className="text-xs text-[#888]">{new Date(order.createdAt).toLocaleDateString("ko-KR", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>

                  {/* Status steps */}
                  <OrderStatusBar createdAt={order.createdAt} />

                  {/* Tracking */}
                  {showTracking && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[#555]">
                      <Truck size={11} />
                      <span>운송장 번호:</span>
                      <span className="font-bold tabular-nums text-[#1A1A1A]">{order.trackingNumber}</span>
                    </div>
                  )}

                  {/* Items */}
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {order.items.map((item) => (
                      <div key={item.id} className="w-12 h-12 rounded bg-[#F7F6F3] overflow-hidden shrink-0 relative">
                        {item.image_url ? (
                          <Image src={item.image_url} alt={item.name_ko ?? item.name} fill className="object-cover" sizes="48px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-[#888]">{item.scale ?? "F"}</div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="flex justify-between items-center text-sm mt-3 pt-3 border-t border-[#D8D5CE]">
                    <span className="text-[#888]">
                      {order.items.reduce((s, i) => s + i.quantity, 0)}개 상품
                      {order.usedPoints > 0 && (
                        <span className="text-[#E63946] ml-2">-{formatKRW(order.usedPoints)}P</span>
                      )}
                    </span>
                    <div className="text-right">
                      <span className="font-bold tabular-nums">₩{formatKRW(order.finalTotal)}</span>
                      {order.earnedPoints > 0 && (
                        <p className="text-[10px] text-[#888]">+{formatKRW(order.earnedPoints)}P 적립</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
