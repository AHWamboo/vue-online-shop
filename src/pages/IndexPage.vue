<template>
  <q-page class="q-pa-none">
    <q-carousel animated v-model="slide" infinite arrows>
      <q-carousel-slide
        :name="1"
        img-src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/sliders/main-slider/main-page-slider-1.jpg"
        ><div class="absolute custom-caption">
          <div class="text-h2">Header 1</div>
          <div class="text-subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            tristique in tortor et dignissim. Quisque non tempor leo. Maecenas
            egestas sem elit
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
            egestas sem elit
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
            egestas sem elit
          </div>
        </div></q-carousel-slide
      >
    </q-carousel>

    <q-separator class="separator"></q-separator>

    <h2 class="products-section-title">POPULAR PRODUCTS</h2>

    <q-separator class="separator"></q-separator>

    <section data-e2e="popular-products-container">
      <div class="row justify-around popular-container">
        <div class="col-xl-2 col-md-3 col-sm-6 col-xs-12 popular">
          <p class="popular-picture-p">-20%</p>
          <q-img
            class="popular-picture"
            src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/hummingbird-printed-t-shirt.jpg"
          ></q-img>
          <p class="product-title">Hummingbird printed t-shirt</p>
        </div>
        <div class="col-xl-2 col-md-3 col-sm-6 col-xs-12 popular">
          <q-img
            class="popular-picture"
            src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/brown-bear-printed-sweater.jpg"
          ></q-img>
          <p class="product-title">Brown bear printed sweater</p>
        </div>
        <div class="col-xl-2 col-md-3 col-sm-6 col-xs-12 popular">
          <q-img
            class="popular-picture"
            src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/the-adventure-begins-framed-poster.jpg"
          ></q-img>
          <p class="product-title">Adventure begins framed poster</p>
        </div>
        <div class="col-xl-2 col-md-3 col-sm-6 col-xs-12 popular">
          <q-img
            class="popular-picture"
            src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/today-is-a-good-day-framed-poster.jpg"
          ></q-img>
          <p class="product-title">Good day framed poster</p>
        </div>
      </div>

      <div class="row justify-around popular-container">
        <div class="col-xl-2 col-md-3 col-sm-6 col-xs-12 popular">
          <p class="popular-picture-p">-20%</p>
          <q-img
            class="popular-picture"
            src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/mug-today-is-a-good-day.jpg"
          ></q-img>
          <p class="product-title">Mug today is a good day</p>
        </div>
        <div class="col-xl-2 col-md-3 col-sm-6 col-xs-12 popular">
          <q-img
            class="popular-picture"
            src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/mug-the-best-is-yet-to-come.jpg"
          ></q-img>
          <p class="product-title">Mug best is yet to come</p>
        </div>
        <div class="col-xl-2 col-md-3 col-sm-6 col-xs-12 popular">
          <q-img
            class="popular-picture"
            src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/mug-the-adventure-begins.jpg"
          ></q-img>
          <p class="product-title">Adventure begins mug</p>
        </div>
        <div class="col-xl-2 col-md-3 col-sm-6 col-xs-12 popular">
          <q-img
            class="popular-picture"
            src="https://fzlwitffxljqlligkttm.supabase.co/storage/v1/object/public/online-shop-pictures/products/category-products/mug-today-is-a-good-day.jpg"
          ></q-img>
          <p class="product-title">Mug today is a good day</p>
        </div>
      </div>
    </section>
  </q-page>
</template>

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

.popular-container {
  margin-bottom: 0.5%;
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
}

@media (max-width: 1023px) {
  .popular {
    padding: 10px;
  }
}
</style>

<script setup lang="ts">
import { ref } from "vue";

const slide = ref(1);
</script>
