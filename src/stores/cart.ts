import { defineStore } from "pinia";

export type AllAttributes = { name: string; selected: string[] }[];
type CartProduct = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
};

const CART_STORAGE_KEY = "cart-products";

function loadCartFromStorage(): CartProduct[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as CartProduct[];
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  return [];
}

function saveCartToStorage(cartProducts: CartProduct[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartProducts));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartProducts: loadCartFromStorage() as CartProduct[],
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
      saveCartToStorage(this.cartProducts);
    },
    removeProductFromCart(product: CartProduct) {
      this.cartProducts = this.cartProducts.filter(
        (cartProduct) => cartProduct.id !== product.id
      );
      saveCartToStorage(this.cartProducts);
    },
    clearCart() {
      this.cartProducts = [];
      saveCartToStorage(this.cartProducts);
    },
  },
});
