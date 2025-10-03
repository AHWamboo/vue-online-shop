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
          <div class="col-xl-4 col-md-7 col-sm-12 col-xs-12">
            <q-form class="q-gutter-md" @submit="onSubmit">
              <TextInput
                v-model="productName"
                label="Name"
                hint="Your new product name"
                :validation-rules="[
                  (val) =>
                    (typeof val === 'string' && val.trim().length > 0) ||
                    'Please enter your product name.',
                  (val) =>
                    !val ||
                    String(val).length <= 50 ||
                    'Please use maximum 50 characters.',
                ]"
              ></TextInput>

              <TextInput
                v-model="productPrice"
                label="Price"
                hint="Your new product price"
                :validation-rules="[
                  (val) =>
                    (typeof val === 'string' && val.trim().length > 0) || //  trash bs - This validation will not work because the field type will be number, not string
                    'Please provide your product price.',
                  (val) =>
                    !val ||
                    String(val).length <= 50 ||
                    'Please use maximum 50 characters.',
                  (val) =>
                    !String(val).includes(',') ||
                    'Please use a period instead of a comma.',
                ]"
              ></TextInput>

              <TextInput
                v-model="productDescription"
                label="Description"
                hint="Your new product description"
                :validation-rules="[
                  (val) =>
                    (typeof val === 'string' && val.trim().length > 0) ||
                    'Please enter your product description.',
                  (val) =>
                    !val ||
                    String(val).length <= 1500 || // trash bs - check what the field length should be
                    'Please use maximum 1500 characters.',
                ]"
              ></TextInput>

              <TextInput
                v-model="productShortDescription"
                label="Short description"
                hint="Your new product short description"
                :validation-rules="[
                  (val) =>
                    (typeof val === 'string' && val.trim().length > 0) ||
                    'Please enter your product short description.',
                  (val) =>
                    !val ||
                    String(val).length <= 500 || // trash bs - check what the field length should be
                    'Please use maximum 500 characters.',
                ]"
              ></TextInput>

              <TextInput
                v-model="productImageUrl"
                label="Image url"
                hint="Your product image url address"
                :validation-rules="[
                  (val) =>
                    (typeof val === 'string' && val.trim().length > 0) ||
                    'Please provide your product image url.',
                  (val) =>
                    String(val).length <= 2048 ||
                    'Product image url is too long.',
                  (val) =>
                    String(val).startsWith('https://') ||
                    'Only HTTPS URLs are allowed.',
                ]"
              ></TextInput>
            </q-form>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script setup lang="ts">
import TextInput from "../../components/inputs/TextInput.vue";
import { ref } from "vue";

const model = defineModel<boolean>({ required: true });
const productName = ref("");
const productPrice = ref("");
const productDescription = ref("");
const productShortDescription = ref("");
const productImageUrl = ref("");

function onSubmit() {
  console.log("Form has been submitted!");
}

const emit = defineEmits<{
  (e: "submit"): void;
}>();
</script>

<style></style>
