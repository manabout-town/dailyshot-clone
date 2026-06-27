import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  name_ko: string | null;
  price: number;
  brand_ko: string | null;
  scale: string | null;
  image_url: string | null;
  stock: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          const newQty = Math.min(existing.quantity + quantity, item.stock);
          set((s) => ({
            items: s.items.map((i) =>
              i.id === item.id ? { ...i, quantity: newQty } : i
            ),
          }));
        } else {
          const capped = Math.min(quantity, item.stock);
          set((s) => ({ items: [...s.items, { ...item, quantity: capped }] }));
        }
      },
      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
        } else {
          set((s) => ({
            items: s.items.map((i) =>
              i.id === id ? { ...i, quantity: Math.min(quantity, i.stock) } : i
            ),
          }));
        }
      },
      clearCart: () => set({ items: [] }),
      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "figure-cart",
      version: 2,
      migrate: () => ({ items: [] }),
    }
  )
);
