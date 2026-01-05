<template>
  <q-page class="q-pa-none">
    <q-carousel v-model="slide" animated infinite arrows>
      <q-carousel-slide
        :name="1"
        img-src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/sliders/main-slider/main-page-slider-1.jpg"
        ><div class="absolute custom-caption">
          <div class="text-h2">Header 1</div>
          <div class="text-subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            tristique in tortor et dignissim. Quisque non tempor leo. Maecenas
            egestas sem elit.
          </div>
        </div></q-carousel-slide
      >
      <q-carousel-slide
        :name="2"
        img-src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/sliders/main-slider/main-page-slider-2.jpg"
        ><div class="absolute-bottom custom-caption">
          <div class="text-h2">Header 2</div>
          <div class="text-subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            tristique in tortor et dignissim. Quisque non tempor leo. Maecenas
            egestas sem elit.
          </div>
        </div></q-carousel-slide
      >
      <q-carousel-slide
        :name="3"
        img-src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/sliders/main-slider/main-page-slider-3.jpg"
        ><div class="absolute-bottom custom-caption">
          <div class="text-h2">Header 3</div>
          <div class="text-subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            tristique in tortor et dignissim. Quisque non tempor leo. Maecenas
            egestas sem elit.
          </div>
        </div></q-carousel-slide
      >
    </q-carousel>

    <q-separator class="separator"></q-separator>

    <h2 class="products-section-title">POPULAR PRODUCTS</h2>

    <q-separator class="separator"></q-separator>

    <section data-e2e="popular-products-container">
      <div class="row justify-around popular-container">
        <div
          v-for="(product, index) in popularProducts.slice(0, 4)"
          :key="product.id"
          class="col-xl-2 col-md-3 col-sm-6 col-xs-12 popular"
        >
          <p v-if="index === 0" class="popular-picture-p">-20%</p>
          <q-img class="popular-picture" :src="product.image_url"></q-img>
          <p class="product-title">
            <router-link :to="`/product/${product.id}`">{{
              product.name
            }}</router-link>
          </p>
        </div>
      </div>

      <div class="row justify-around popular-container">
        <div
          v-for="(product, index) in popularProducts.slice(4, 8)"
          :key="product.id"
          class="col-xl-2 col-md-3 col-sm-6 col-xs-12 popular"
        >
          <p v-if="index === 0" class="popular-picture-p">-20%</p>
          <q-img class="popular-picture" :src="product.image_url"></q-img>
          <p class="product-title">
            <router-link :to="`/product/${product.id}`">{{
              product.name
            }}</router-link>
          </p>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { type PopularProduct, useProductsStore } from "src/stores/products";

const slide = ref(1);
const productsStore = useProductsStore();

const popularProducts = ref<PopularProduct[]>([]);

onMounted(async () => {
  popularProducts.value =
    (await productsStore.getPopularProducts()) as PopularProduct[];
});
</script>

<style scoped>
.col {
  background: lightblue;
  margin-right: 10px;
}

.separator {
  padding: 5px;
  margin: 0.5%;
}

.custom-caption {
  position: absolute;
  bottom: 28px;
  left: 90px;
  max-width: 340px;
  color: #fff;
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}

.popular {
  background: #b89b9b;
  position: relative;
  height: auto;
  margin-bottom: 1.563rem;
  overflow: hidden;
  background: #fff;
}

.product-title {
  font-size: 1rem;
  line-height: 2rem;
  display: grid;
  place-items: center;
  margin-bottom: 0px;
  padding: 4px;
}
.product-title a {
  color: inherit;
  text-decoration: none;
}

.popular-container {
  margin-bottom: 0.5%;
}

.popular-picture {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.popular-picture :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.popular-picture-p {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  pointer-events: none;
  min-width: 3.125rem;
  min-height: 1.875rem;
  font-weight: 600;
  background-color: #f39d72;
  width: fit-content;
  color: #fff;
  margin-top: 0.625rem;
  padding: 0.3125rem 0.4375rem;
  font-family: Manrope, sans-serif;
  font-size: 16px;
}

.products-section-title {
  margin: 0.5rem 0;
  font-weight: 500;
  text-align: center;
  color: #353535;
  font-size: 1.3125rem;
  font-family: Manrope, sans-serif;
}

@media (max-width: 1919px) {
  .popular {
    padding: 10px;
  }
  .popular-picture {
    height: 280px;
  }
}

@media (max-width: 1023px) {
  .popular {
    padding: 10px;
  }
  .popular-picture {
    height: 250px;
  }
}
</style>
