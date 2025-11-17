import { defineStore } from "pinia";
import type { Product } from "./products";

export type AllAttributes = { name: string; selected: string[] }[];

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartProducts: [] as Product[],
  }),
  getters: {
    cartProductsCount: (state) => state.cartProducts.length,
  },
  actions: {
    addProductToCart(product: Product) {
      this.cartProducts.push({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        short_description: product.short_description,
        image_url: product.image_url,
        product_categories: product.product_categories,
        product_sub_categories: product.product_sub_categories,
      });
    },
    removeProductFromCart(product: Product) {
      this.cartProducts = this.cartProducts.filter(
        (cartProduct) => cartProduct.id !== product.id
      );
    },
    clearCart() {
      this.cartProducts = [];
    },
  },
});
