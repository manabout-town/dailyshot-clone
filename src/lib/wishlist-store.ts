import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistStore = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  count: () => number;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const ids = get().ids;
        if (ids.includes(id)) {
          set({ ids: ids.filter((i) => i !== id) });
        } else {
          set({ ids: [...ids, id] });
        }
      },
      has: (id) => get().ids.includes(id),
      count: () => get().ids.length,
    }),
    { name: "figure-wishlist" }
  )
);
