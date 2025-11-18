import { defineStore } from "pinia";

export type AllAttributes = { name: string; selected: string[] }[];
type CartProduct = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
};

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartProducts: [] as CartProduct[],
  }),
  getters: {
    cartProductsCount: (state) => state.cartProducts.length,
  },
  actions: {
    addProductToCart(product: CartProduct) {
      this.cartProducts.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        quantity: 1,
      });
    },
    removeProductFromCart(product: CartProduct) {
      this.cartProducts = this.cartProducts.filter(
        (cartProduct) => cartProduct.id !== product.id
      );
    },
    clearCart() {
      this.cartProducts = [];
    },
  },
});
