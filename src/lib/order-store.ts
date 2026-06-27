import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./cart-store";

export type Order = {
  orderId: string;
  items: CartItem[];
  total: number;
  usedPoints: number;
  earnedPoints: number;
  finalTotal: number;
  trackingNumber: string;
  createdAt: string;
};

const STEPS = ["접수", "처리중", "배송중", "배송완료"] as const;
export type OrderStep = typeof STEPS[number];

export function getOrderStep(createdAt: string): number {
  const elapsed = (Date.now() - new Date(createdAt).getTime()) / 1000 / 60;
  if (elapsed < 2) return 0;   // 접수
  if (elapsed < 10) return 1;  // 처리중
  if (elapsed < 30) return 2;  // 배송중
  return 3;                    // 배송완료
}

export const ORDER_STEPS = STEPS;

type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
    }),
    { name: "figure-orders" }
  )
);
