import { create } from 'zustand';
import { Product } from '../services/api';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product, quantity = 1) => {
    const existing = get().items.find((i) => i.product._id === product._id);
    if (existing) {
      set((state) => ({
        items: state.items.map((i) =>
          i.product._id === product._id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        ),
      }));
    } else {
      set((state) => ({ items: [...state.items, { product, quantity }] }));
    }
  },

  removeItem: (productId) =>
    set((state) => ({ items: state.items.filter((i) => i.product._id !== productId) })),

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.product._id === productId ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
}));
