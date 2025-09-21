<template>
  <q-dialog v-model="model">
    <q-layout view="Lhh lpR fff" container class="bg-white text-dark">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>Product title</q-toolbar-title>
          <q-btn v-close-popup flat round dense icon="close" />
        </q-toolbar>
      </q-header>

      <q-footer class="bg-white text-white" align="right">
        <q-toolbar>
          <q-toolbar-title>
            <q-btn v-close-popup flat label="Cancel" color="black" />
            <q-btn
              v-close-popup
              flat
              label="Edit product"
              color="primary"
              @click="emit('submit')"
            />
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page padding>
          <p>aaaa</p>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script setup lang="ts">
import { useProductsStore } from "src/stores/products";

const store = useProductsStore();
const model = defineModel<boolean>({ required: true });

function getProductData() {
  console.log(`In Edit product modal: ${store.productId}`);
}

getProductData();

const emit = defineEmits<{
  (e: "submit"): void;
}>();
</script>

<style></style>
