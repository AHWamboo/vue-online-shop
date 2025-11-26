import { defineStore } from "pinia";

export type AllAttributes = { name: string; selected: string[] }[];
export type CartProduct = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
};
export type CartProductWithQuantity = CartProduct & { quantity: number };

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

function saveCartToStorage(cartProducts: CartProduct[]) {
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
    getCartProducts: (state) => state.cartProducts,
    cartProductsSummarizedQuantity: (state) =>
      state.cartProducts.reduce((acc, product) => acc + product.quantity, 0),
  },
  actions: {
    addProductToCart(product: CartProductWithQuantity) {
      const existingProduct = this.cartProducts.find(
        (cartProduct) => cartProduct.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        this.cartProducts.push(product);
      }
      saveCartToStorage(this.cartProducts);
    },
    removeProductFromCart(product: CartProductWithQuantity) {
      const existingProduct = this.cartProducts.find(
        (cartProduct) => cartProduct.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity -= product.quantity;
        if (existingProduct.quantity <= 0) {
          this.cartProducts.splice(
            this.cartProducts.indexOf(existingProduct),
            1
          );
        }
      }
      saveCartToStorage(this.cartProducts);
    },
    clearCart() {
      this.cartProducts = [];
      saveCartToStorage(this.cartProducts);
    },
  },
});
