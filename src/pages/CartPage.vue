<template>
  <div class="row items-stretch">
    <div class="col-6 column-equal-width q-ml-md column">
      <h4>Cart products</h4>
      <div class="column flex">
        <q-scroll-area class="cart-scroll-area">
          <div class="cart-items-list">
            <div class="cart-item row items-center">
              <div class="col text-left">
                <q-img
                  src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/hummingbird-printed-t-shirt.jpg"
                  style="width: 80px; height: 80px; object-fit: cover"
                />
              </div>
              <div class="col text-left">
                <div class="text-weight-medium">
                  Hummingbird printed t-shirt
                </div>
                <div class="text-caption text-grey">Size: M</div>
              </div>
              <div class="col text-center">
                <q-input
                  v-model.number="quantities[0]"
                  class="product-quantity-input"
                  type="number"
                  outlined
                  dense
                  style="max-width: 80px"
                  min="1"
                />
              </div>
              <div class="col text-center">€24.99</div>
              <div class="col text-right">
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="removeItem(0)"
                />
              </div>
            </div>
            <div class="cart-item row items-center">
              <div class="col text-left">
                <q-img
                  src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/brown-bear-printed-sweater.jpg"
                  style="width: 80px; height: 80px; object-fit: cover"
                />
              </div>
              <div class="col text-left">
                <div class="text-weight-medium">Brown bear printed sweater</div>
                <div class="text-caption text-grey">Size: L</div>
              </div>
              <div class="col text-center">
                <q-input
                  v-model.number="quantities[1]"
                  class="product-quantity-input"
                  type="number"
                  outlined
                  dense
                  style="max-width: 80px"
                  min="1"
                />
              </div>
              <div class="col text-center">€45.99</div>
              <div class="col text-right">
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="removeItem(1)"
                />
              </div>
            </div>
            <div class="cart-item row items-center">
              <div class="col text-left">
                <q-img
                  src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/the-adventure-begins-framed-poster.jpg"
                  style="width: 80px; height: 80px; object-fit: cover"
                />
              </div>
              <div class="col text-left">
                <div class="text-weight-medium">
                  The adventure begins framed poster
                </div>
                <div class="text-caption text-grey">Size: Standard</div>
              </div>
              <div class="col text-center">
                <q-input
                  v-model.number="quantities[2]"
                  class="product-quantity-input"
                  type="number"
                  outlined
                  dense
                  style="max-width: 80px"
                  min="1"
                />
              </div>
              <div class="col text-center">€19.99</div>
              <div class="col text-right">
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="removeItem(2)"
                />
              </div>
            </div>
            <div class="cart-item row items-center">
              <div class="col text-left">
                <q-img
                  src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/today-is-a-good-day-framed-poster.jpg"
                  style="width: 80px; height: 80px; object-fit: cover"
                />
              </div>
              <div class="col text-left">
                <div class="text-weight-medium">
                  Today is a good day framed poster
                </div>
                <div class="text-caption text-grey">Size: Standard</div>
              </div>
              <div class="col text-center">
                <q-input
                  v-model.number="quantities[3]"
                  class="product-quantity-input"
                  type="number"
                  outlined
                  dense
                  style="max-width: 80px"
                  min="1"
                />
              </div>
              <div class="col text-center">€19.99</div>
              <div class="col text-right">
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="removeItem(3)"
                />
              </div>
            </div>
            <div class="cart-item row items-center">
              <div class="col text-left">
                <q-img
                  src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/hummingbird-printed-t-shirt.jpg"
                  style="width: 80px; height: 80px; object-fit: cover"
                />
              </div>
              <div class="col text-left">
                <div class="text-weight-medium">
                  Hummingbird printed t-shirt
                </div>
                <div class="text-caption text-grey">Size: S</div>
              </div>
              <div class="col text-center">
                <q-input
                  v-model.number="quantities[4]"
                  class="product-quantity-input"
                  type="number"
                  outlined
                  dense
                  style="max-width: 80px"
                  min="1"
                />
              </div>
              <div class="col text-center">€24.99</div>
              <div class="col text-right">
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="removeItem(4)"
                />
              </div>
            </div>
            <div class="cart-item row items-center">
              <div class="col text-left">
                <q-img
                  src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/brown-bear-printed-sweater.jpg"
                  style="width: 80px; height: 80px; object-fit: cover"
                />
              </div>
              <div class="col text-left">
                <div class="text-weight-medium">Brown bear printed sweater</div>
                <div class="text-caption text-grey">Size: XL</div>
              </div>
              <div class="col text-center">
                <q-input
                  v-model.number="quantities[5]"
                  class="product-quantity-input"
                  type="number"
                  outlined
                  dense
                  style="max-width: 80px"
                  min="1"
                />
              </div>
              <div class="col text-center">€45.99</div>
              <div class="col text-right">
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="removeItem(5)"
                />
              </div>
            </div>
            <div class="cart-item row items-center">
              <div class="col text-left">
                <q-img
                  src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/the-adventure-begins-framed-poster.jpg"
                  style="width: 80px; height: 80px; object-fit: cover"
                />
              </div>
              <div class="col text-left">
                <div class="text-weight-medium">
                  The adventure begins framed poster
                </div>
                <div class="text-caption text-grey">Size: Standard</div>
              </div>
              <div class="col text-center">
                <q-input
                  v-model.number="quantities[6]"
                  class="product-quantity-input"
                  type="number"
                  outlined
                  dense
                  style="max-width: 80px"
                  min="1"
                />
              </div>
              <div class="col text-center">€19.99</div>
              <div class="col text-right">
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="removeItem(6)"
                />
              </div>
            </div>
            <div class="cart-item row items-center">
              <div class="col text-left">
                <q-img
                  src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/today-is-a-good-day-framed-poster.jpg"
                  style="width: 80px; height: 80px; object-fit: cover"
                />
              </div>
              <div class="col text-left">
                <div class="text-weight-medium">
                  Today is a good day framed poster
                </div>
                <div class="text-caption text-grey">Size: Standard</div>
              </div>
              <div class="col text-center">
                <q-input
                  v-model.number="quantities[7]"
                  class="product-quantity-input"
                  type="number"
                  outlined
                  dense
                  style="max-width: 80px"
                  min="1"
                />
              </div>
              <div class="col text-center">€19.99</div>
              <div class="col text-right">
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="removeItem(7)"
                />
              </div>
            </div>
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
                <q-item-label>1 item</q-item-label>
              </q-item-section>
              <q-item-section class="text-right">
                <q-item-label>€34.46</q-item-label>
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
                <q-item-label>€34.46 </q-item-label>
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
import { ref } from "vue";

const newsletterEmail = ref("");

const quantities = ref([1, 2, 1, 1, 1, 1, 1, 1]);

const removeItem = (index: number) => {
  console.log("Removing item at index:", index);
  // Tutaj możesz dodać logikę usuwania produktu z koszyka
};

const subscribeNewsletter = () => {
  if (newsletterEmail.value) {
    console.log("Subscribing to newsletter:", newsletterEmail.value);
    // Tutaj możesz dodać logikę subskrypcji
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
</style>
