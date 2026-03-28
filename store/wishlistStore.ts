import { create } from 'zustand';

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  rating?: number;
  image: any;
  discount?: string;
};

type WishlistStore = {
  items: WishlistItem[];
  add: (item: WishlistItem) => void;
  remove: (id: string) => void;
  toggle: (item: WishlistItem) => void;
  isWishlisted: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  add: (item) => {
    if (!get().isWishlisted(item.id)) {
      set((state) => ({ items: [...state.items, item] }));
    }
  },

  remove: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  toggle: (item) => {
    if (get().isWishlisted(item.id)) {
      get().remove(item.id);
    } else {
      get().add(item);
    }
  },

  isWishlisted: (id) => get().items.some((i) => i.id === id),
}));
