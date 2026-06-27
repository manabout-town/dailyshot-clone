import { create } from "zustand";
import { persist } from "zustand/middleware";

type PointStore = {
  balance: number;
  usePoints: (amount: number) => void;
  earnPoints: (amount: number) => void;
};

export const usePointStore = create<PointStore>()(
  persist(
    (set, get) => ({
      balance: 1_000_000,
      usePoints: (amount) => {
        const clamped = Math.min(amount, get().balance);
        set((s) => ({ balance: s.balance - clamped }));
      },
      earnPoints: (amount) => set((s) => ({ balance: s.balance + amount })),
    }),
    { name: "figure-points" }
  )
);
