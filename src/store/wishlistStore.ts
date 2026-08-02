import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        if (!state.items.find(i => i.id === item.id)) {
          return { items: [...state.items, item] };
        }
        return state;
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),
      clearWishlist: () => set({ items: [] }),
      isInWishlist: (id) => get().items.some(item => item.id === id),
    }),
    {
      name: 'madhukati-wishlist',
    }
  )
);
