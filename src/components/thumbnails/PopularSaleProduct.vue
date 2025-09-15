<template>
  <div class="col-2 popular">
    <p class="popular-picture-p">-30%</p>
    <q-img
      class="popular-picture"
      src="https://pathetic-word.demo.prestashop.com/5-home_default/today-is-a-good-day-framed-poster.jpg"
    ></q-img>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.popular {
  background: #b89b9b;
  position: relative;
  height: auto;
  margin-bottom: 1.563rem;
  overflow: hidden;
  background: #fff;
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
  font-size: 1.3125rem; /* trash bs - move to common */
  font-family: Manrope, sans-serif;
}
</style>
