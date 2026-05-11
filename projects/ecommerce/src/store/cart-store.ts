"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, ProductColor, couponCodes } from "@/lib/data";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: ProductColor;
}

interface CartStore {
  items: CartItem[];
  couponCode: string;
  couponDiscount: number;
  addItem: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeItem: (productId: string, size: string, colorName: string) => void;
  updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
  getDeliveryCharge: () => number;
  getCGST: () => number;
  getSGST: () => number;
  getDiscount: () => number;
  getGrandTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: "",
      couponDiscount: 0,

      addItem: (product, size, color, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.size === size &&
              item.color.name === color.name
          );

          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + quantity,
            };
            return { items: newItems };
          }

          return {
            items: [...state.items, { product, quantity, size, color }],
          };
        });
      },

      removeItem: (productId, size, colorName) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.size === size &&
                item.color.name === colorName
              )
          ),
        }));
      },

      updateQuantity: (productId, size, colorName, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.size === size &&
            item.color.name === colorName
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: "", couponDiscount: 0 }),

      applyCoupon: (code: string) => {
        const upperCode = code.toUpperCase();
        const coupon = couponCodes[upperCode];
        if (coupon) {
          set({ couponCode: upperCode, couponDiscount: coupon.discount });
          return { success: true, message: coupon.label };
        }
        return { success: false, message: "Invalid coupon code" };
      },

      removeCoupon: () => set({ couponCode: "", couponDiscount: 0 }),

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      getDeliveryCharge: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 999 ? 0 : 79;
      },

      getCGST: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        return Math.round((subtotal - discount) * 0.09);
      },

      getSGST: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        return Math.round((subtotal - discount) * 0.09);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const discountPercent = get().couponDiscount;
        return Math.round((subtotal * discountPercent) / 100);
      },

      getGrandTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const delivery = get().getDeliveryCharge();
        const cgst = get().getCGST();
        const sgst = get().getSGST();
        return subtotal - discount + delivery + cgst + sgst;
      },
    }),
    {
      name: "threadswala-cart",
    }
  )
);
