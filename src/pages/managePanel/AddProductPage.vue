<template>
  <q-page class="q-pa-md">
    <div class="row justify-left">
      <div class="col-xl-4 col-md-7 col-sm-12 col-xs-12">
        <h2 class="brand-red">Add new product</h2>
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
                (typeof val === 'string' && val.trim().length > 0) || // trash bs - This validation will not work because the field type will be number, not string
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
                String(val).length <= 2048 || 'Product image url is too long.',
              (val) =>
                String(val).startsWith('https://') ||
                'Only HTTPS URLs are allowed.',
            ]"
          ></TextInput>

          <q-select
            v-model="productCategory"
            filled
            :options="productCategoriesList"
            hint="Choose product category"
            label="Product categories"
            @update:model-value="onProductCategoryChange"
          ></q-select>

          <q-select
            v-model="productSubCategory"
            filled
            :options="productSubCategoriesList"
            label="Product sub category"
            hint="Choose product sub category"
            :disable="!productSubCategoriesList"
          ></q-select>

          <div>
            <q-btn label="Add product" type="submit" color="black"></q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useProductsStore } from "src/stores/products";
import { onMounted, ref } from "vue";
import TextInput from "../../components/inputs/TextInput.vue";

type CategoryOption = {
  // trash bs - whether this should be in the store or in a separate file types?
  label: string;
  value: number;
};

const store = useProductsStore();
const { getAllProductCategories } = storeToRefs(store);

const $q = useQuasar();
const productName = ref("");
const productPrice = ref("");
const productDescription = ref("");
const productShortDescription = ref("");
const productImageUrl = ref("");

const productCategory = ref<CategoryOption | null>(null);

const productCategoriesList = ref();

const productSubCategory = ref<CategoryOption | null>(null);
const productSubCategoriesList = ref();

const getCategories = async () => {
  const categories = await getAllProductCategories.value;

  if (categories) {
    productCategoriesList.value = categories.categories.map((option) => ({
      label: option.name,
      value: option.id,
    }));
  }
};

onMounted(async () => {
  await getCategories();
});

const onProductCategoryChange = async (selectedCategory: CategoryOption) => {
  productSubCategoriesList.value = [];
  productSubCategory.value = null;

  const subCategories = await store.getSubCategories(selectedCategory.value);

  if (subCategories) {
    productSubCategoriesList.value = subCategories.map((option) => ({
      label: option.name,
      value: option.id,
    }));
  }
};

async function onSubmit() {
  console.log("Product has been submitted");
  console.log(`
    product name: ${productName.value},
    product price: ${productPrice.value},
    product description: ${productDescription.value},
    product short description: ${productShortDescription.value},
    product img url: ${productImageUrl.value},
    product category: ${productCategory.value?.value},
    product sub category: ${productSubCategory.value?.value},
  `);

  const addProduct = await store.addProduct({
    name: productName.value,
    price: +productPrice.value,
    description: productDescription.value,
    short_description: productShortDescription.value,
    image_url: productImageUrl.value,
    product_category: +productCategory.value!.value,
    product_sub_category: +productSubCategory.value!.value,
  });

  if (addProduct) {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: `Product "${productName.value}" has been added.`,
    });
  } else {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: `An error occurred while adding a product "${productName.value}".`,
    });
  }
}
</script>
