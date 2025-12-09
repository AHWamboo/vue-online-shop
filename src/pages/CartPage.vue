<template>
  <div class="row items-stretch">
    <div class="col-6 column-equal-width q-ml-md column">
      <h4>Cart products</h4>
      <div class="column flex">
        <q-scroll-area class="cart-scroll-area">
          <div v-if="cartProducts.length > 0" class="cart-items-list">
            <div v-for="product in cartProducts" :key="product.id">
              <div class="cart-item row items-center">
                <div class="col text-left">
                  <q-img
                    :src="product.image_url"
                    style="width: 80px; height: 80px; object-fit: cover"
                  />
                </div>
                <div class="col text-left">
                  <a :href="product.product_url" class="product-link">
                    <div class="text-weight-medium">{{ product.name }}</div>
                  </a>
                </div>
                <div class="col text-center">
                  <q-input
                    v-model.number="product.quantity"
                    class="product-quantity-input"
                    type="number"
                    outlined
                    dense
                    style="max-width: 80px"
                    min="1"
                    @update:model-value="
                      (value) => updateQuantity(product.id, value)
                    "
                  />
                </div>
                <div class="col text-center">
                  €{{ formatPrice(product.price) }}
                </div>
                <div class="col text-right">
                  <q-btn
                    flat
                    round
                    icon="delete"
                    color="negative"
                    @click="removeItem(product.id)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <q-card class="q-pa-md">
              <q-card-section>
                <q-item-label class="text-center"
                  >No products in cart</q-item-label
                >
              </q-card-section>
            </q-card>
          </div>
        </q-scroll-area>
      </div>
    </div>
    <div class="col-4 q-ml-md order-summary-section column">
      <h4>Order summary</h4>
      <div class="column flex">
        <q-card class="q-pa-md q-mb-md">
          <q-list bordered>
            <q-item>
              <q-item-section>
                <q-item-label
                  >{{
                    store.cartProductsSummarizedQuantity
                  }}
                  items</q-item-label
                >
              </q-item-section>
              <q-item-section class="text-right">
                <q-item-label>€{{ formatPrice(totalPrice) }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Shipping</q-item-label>
              </q-item-section>
              <q-item-section class="text-right">
                <q-item-label>Free</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Tax (23%)</q-item-label>
              </q-item-section>
              <q-item-section class="text-right">
                <q-item-label>€11.45 </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item>
              <q-item-section>
                <q-item-label>Total price</q-item-label>
              </q-item-section>
              <q-item-section class="text-right">
                <q-item-label>€{{ formatPrice(totalPrice) }} </q-item-label>
              </q-item-section>
            </q-item>
            <q-btn color="primary" label="Proceed to checkout" />
          </q-list>
        </q-card>
        <q-card class="q-mt-md">
          <q-list bordered>
            <q-expansion-item
              icon="security"
              label="Security policy"
              default-opened
            >
              <q-card>
                <q-card-section>
                  <a href="#" class="text-primary">Lorem ipsum</a> dolor sit
                  amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item icon="local_shipping" label="Delivery policy">
              <q-card>
                <q-card-section>
                  <a href="#" class="text-primary">Lorem ipsum</a> dolor sit
                  amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item icon="assignment_return" label="Return policy">
              <q-card>
                <q-card-section>
                  <a href="#" class="text-primary">Lorem ipsum</a> dolor sit
                  amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </div>
  <div class="row q-mt-lg q-mb-md q-px-md">
    <div class="col-12">
      <q-card class="q-pa-md">
        <h4 class="q-mb-md text-center">Sign up to newsletter</h4>
        <div class="row q-gutter-sm items-center justify-center">
          <div class="col-6">
            <q-input
              v-model="newsletterEmail"
              placeholder="Your email address"
              outlined
              dense
              class="newsletter-input"
            />
          </div>
          <div class="col-auto">
            <q-btn color="primary" icon="send" @click="subscribeNewsletter" />
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore, type CartProductWithQuantity } from "src/stores/cart";
import { computed, onMounted, ref, watch } from "vue";

const newsletterEmail = ref("");
const store = useCartStore();
const cartProducts = ref<CartProductWithQuantity[]>([]);

onMounted(async () => {
  cartProducts.value = store.getCartProducts;
  console.log(cartProducts.value);
});

// Watch for changes in cart products from store
watch(
  () => store.getCartProducts,
  (newProducts) => {
    cartProducts.value = newProducts;
  },
  { deep: true }
);

const totalPrice = computed(() => {
  return cartProducts.value.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
});

const formatPrice = (price: number): string => {
  return Number(price.toFixed(2)).toFixed(2);
};

const removeItem = (index: number) => {
  console.log("Removing item at index:", index);
  store.removeProductFromCart(cartProducts.value[0] as CartProductWithQuantity); // trash bs - it can't be as 0, it should be the index of the item
};

const updateQuantity = (
  productId: number,
  quantity: number | string | null
) => {
  const numQuantity =
    typeof quantity === "number" ? quantity : Number(quantity);
  if (!isNaN(numQuantity) && numQuantity > 0) {
    store.updateProductQuantity(productId, numQuantity);
    // Update local cart products to reflect changes
    cartProducts.value = store.getCartProducts;
  }
};

const subscribeNewsletter = () => {
  if (newsletterEmail.value) {
    console.log("Subscribing to newsletter:", newsletterEmail.value);
    // add newsletter subscription logic
    newsletterEmail.value = "";
  }
};
</script>

<style scoped>
.column-equal-width .column > div {
  padding: 10px 15px;
  background: rgba(153, 153, 153, 0.15);
  border: 1px solid rgba(153, 153, 153, 0.2);
}

.column-equal-width .column + .column {
  margin-top: 1rem;
}

.order-summary-section {
  margin: 0 auto;
}

.newsletter-input {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-quantity-input {
  margin: auto;
}

.cart-scroll-area {
  height: 100%;
  min-height: 0;
  flex: 1 1 auto;
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
}

.cart-item {
  padding: 10px 15px;
  background: rgba(153, 153, 153, 0.15);
  border: 1px solid rgba(153, 153, 153, 0.2);
  border-radius: 4px;
  width: 100%;
}

/* Upewniamy się, że kolumny mają taką samą wysokość */
.row.items-stretch > .column {
  display: flex;
  flex-direction: column;
}

.row.items-stretch > .column > .column.flex {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.product-link {
  text-decoration: none;
  color: inherit;
}
</style>
