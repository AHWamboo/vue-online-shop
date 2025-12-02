<template>
  <q-page class="q-pa-md">
    <div class="row">
      <q-breadcrumbs class="product-breadcrumbs" gutter="md">
        <q-breadcrumbs-el
          class="breadcrumb-label"
          label="Home"
        ></q-breadcrumbs-el>
        <q-breadcrumbs-el
          class="breadcrumb-label"
          :label="productCategory?.name"
        ></q-breadcrumbs-el>
        <q-breadcrumbs-el
          class="breadcrumb-label"
          :label="productSubCategory?.name"
        ></q-breadcrumbs-el>
        <q-breadcrumbs-el
          class="breadcrumb-label"
          :label="productName"
        ></q-breadcrumbs-el>
      </q-breadcrumbs>
    </div>
    <div class="row">
      <div class="col-12 col-md-5 left">
        <div class="row product-cover">
          <q-img :src="productImgUrl"></q-img>
        </div>

        <div class="row justify-center product-thumbs">
          <q-img
            :src="productImgUrl"
            spinner-color="red"
            style="height: 140px; max-width: 150px"
          ></q-img>
          <q-img
            :src="productImgUrl"
            spinner-color="red"
            style="height: 140px; max-width: 150px"
          ></q-img>
          <q-img
            :src="productImgUrl"
            spinner-color="red"
            style="height: 140px; max-width: 150px"
          ></q-img>
        </div>
      </div>
      <div class="col-12 col-md-7 right">
        <h1 class="product-title">{{ productName }}</h1>
        <span class="product-price">€{{ productPrice }}</span>
        <p class="product-description">
          {{ productDescription }}
        </p>
        <p class="product-description">
          {{ productShortDescription }}
        </p>

        <q-select
          v-model="productSize"
          class="product-size"
          outlined
          :options="['S', 'M', 'L', 'XL', 'XXL']"
          label="Size:"
        ></q-select>

        <div class="row">
          <q-input
            v-model.number="productQuantity"
            class="product-quantity"
            type="number"
            outlined
          />

          <q-btn
            class="add-to-cart-button"
            color="primary"
            icon="shopping_cart"
            size="lg"
            @click="addToCart"
          />

          <q-btn
            class="add-to-favorite-button"
            round
            color="red"
            icon="favorite_border"
            size="lg"
            @click="addToFavorite"
          />
        </div>

        <div class="row">
          <p class="share-label">Share:</p>
          <q-btn
            class="share-buttons"
            round
            color="blue-10"
            icon="facebook"
            size="lg"
            @click="addToFavorite"
          />
          <q-btn
            class="share-buttons share-on-x-button"
            round
            color="black"
            icon="X"
            size="lg"
            @click="addToFavorite"
          />
          <q-btn
            class="share-buttons"
            round
            color="red-8"
            icon="reddit"
            size="lg"
            @click="addToFavorite"
          />
        </div>

        <q-card class="product-tabs">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="description" label="Description" />
            <q-tab name="product-details" label="Product Details" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab">
            <q-tab-panel name="description">
              <div class="text-h6">Lorem ipsum dolor sit</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
              dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="product-details">
              <div class="text-h6">Lorem ipsum dolor sit 2</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
              dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
    <div class="row product-comments">
      <div class="col-12">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Single line item</q-item-label>
              <q-item-label caption lines="2"
                >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                adipiscit elit.</q-item-label
              >
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
              <q-icon name="star" color="yellow" />
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section>
              <q-item-label>Single line item 2</q-item-label>
              <q-item-label caption
                >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                adipiscit elit.</q-item-label
              >
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>Voted!</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section>
              <q-item-label>Single line item 3</q-item-label>
              <q-item-label caption
                >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                adipiscit elit.</q-item-label
              >
            </q-item-section>

            <q-item-section side top>
              <q-badge color="teal" label="10k" />
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section>
              <q-item-label>Single line item 4</q-item-label>
              <q-item-label caption
                >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                adipiscit elit.</q-item-label
              >
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>2 min ago</q-item-label>
              <div class="text-orange">
                <q-icon name="star" />
                <q-icon name="star" />
                <q-icon name="star" />
              </div>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section>
              <q-item-label>Single line item 5</q-item-label>
              <q-item-label caption
                >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                adipiscit elit.</q-item-label
              >
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>meta</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Product } from "src/stores/products";
import { useProductsStore } from "src/stores/products";
import { storeToRefs } from "pinia";
import { useCartStore } from "src/stores/cart";

const router = useRouter();
const route = useRoute();
const store = useProductsStore();
const cartStore = useCartStore();
const { getProductById } = storeToRefs(store);

const productSize = ref("S");
const productQuantity = ref(1);
const tab = ref("description");

const productName = ref();
const productPrice = ref();
const productDescription = ref();
const productShortDescription = ref();
const productImgUrl = ref();
const productCategory = ref();
const productSubCategory = ref();

async function getProductDetailsById(id: number): Promise<void> {
  const product: Product | null = await getProductById.value(Number(id));

  console.log("product BS: ", product);

  if (product) {
    productName.value = product.name;
    productPrice.value = product.price;
    productDescription.value = product.description;
    productShortDescription.value = product.short_description;
    productImgUrl.value = product.image_url;
    productCategory.value = product.product_categories;
    productSubCategory.value = product.product_sub_categories;
  } else {
    router.push({ name: "404" });
  }
}

getProductDetailsById(Number(route.params.id));

function addToCart() {
  const resolvedRoute = router.resolve(route);
  const fullUrl = `${window.location.origin}${resolvedRoute.href}`;
  cartStore.addProductToCart({
    id: Number(route.params.id),
    name: productName.value,
    price: productPrice.value,
    image_url: productImgUrl.value,
    quantity: productQuantity.value,
    product_url: fullUrl,
  });
}

function addToFavorite() {
  console.log("addToFavorite button was clicked");
}

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      getProductDetailsById(Number(newId));
    }
  }
);
</script>

<style scoped>
.product-breadcrumbs {
  margin-bottom: 1rem;
}

.breadcrumb-label {
  color: #232323;
  font-size: 16px;
  font-family: Manrope, sans-serif;
}

.product-cover {
  margin-bottom: 1.25rem;
}

.product-title {
  color: #232323;
  text-transform: uppercase;
  text-align: left;
  font-size: 34px;
  font-weight: 700;
  line-height: 1rem;
  margin-left: 1rem;
}

.product-price {
  color: rgb(122, 122, 122);
  font-family: Manrope, sans-serif;
  font-size: 32px;
  margin-left: 1rem;
}

.product-description {
  color: rgb(122, 122, 122);
  font-family: Manrope, sans-serif;
  margin-left: 1rem;
  margin-top: 1rem;
  font-size: 15px;
  margin-right: 1rem;
}

.product-size {
  background: #fff;
  max-width: 300px;
  margin-left: 1rem;
  margin-top: 2rem;
}

.product-quantity {
  background: #fff;
  max-width: 100px;
  margin-left: 1rem;
  margin-top: 2rem;
}

.add-to-cart-button {
  height: 56px;
  margin-top: 2rem;
  margin-left: 1rem;
}

.add-to-favorite-button {
  height: 56px;
  width: 56px;
  margin-top: 2rem;
  margin-left: 1rem;
}

.share-label {
  margin-top: 2rem;
  margin-left: 1rem;
  color: rgb(122, 122, 122);
  font-family: Manrope, sans-serif;
  font-size: 18px;
  padding-top: 15px;
}

.share-buttons {
  height: 56px;
  margin-top: 2rem;
  margin-left: 1rem;
}

.share-on-x-button span i {
  padding-bottom: 8px;
}

.product-tabs {
  margin-top: 2rem;
  margin-left: 1rem;
}

.product-comments {
  margin-top: 2rem;
}
</style>
