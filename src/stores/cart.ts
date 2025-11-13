import { defineStore } from "pinia";
import type { Product } from "./products";

export type AllAttributes = { name: string; selected: string[] }[];

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartProducts: [] as Product[],
  }),
  getters: {
    getCartProducts(): Product[] {
      return this.cartProducts;
    },
  },
  actions: {},
});
