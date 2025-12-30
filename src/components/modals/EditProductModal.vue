<template>
  <q-dialog v-model="model">
    <q-layout view="Lhh lpR fff" container class="bg-white text-dark">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>{{ props.productName }}</q-toolbar-title>
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
              @click="updateProduct"
            />
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page padding>
          <div class="col-xl-4 col-md-7 col-sm-12 col-xs-12">
            <q-form class="q-gutter-md">
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

              <q-select
                v-model="selectedCategory"
                filled
                :options="productCategoriesList"
                hint="Choose product category"
                label="Product categories"
                @update:model-value="onProductCategoryChange"
              ></q-select>

              <q-select
                v-model="selectedSubCategory"
                filled
                :options="productSubCategoriesList"
                label="Product sub category"
                hint="Choose product sub category"
              ></q-select>

              <q-toggle
                v-model="productPopular"
                label="Popular"
                hint="Is the product popular?"
                :disable="isPopularToggleDisabled"
              ></q-toggle>
              <div
                v-if="shouldShowWarning"
                class="popular-limit-warning text-negative"
                role="alert"
              >
                <q-icon name="warning" size="xs" class="q-mr-xs" />
                <span class="warning-text"
                  >Maximum of 8 popular products allowed. Please unmark another
                  product as popular first.</span
                >
              </div>
            </q-form>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import TextInput from "../inputs/TextInput.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useProductsStore } from "src/stores/products";
import { useQuasar } from "quasar";

type CategoryOption = {
  // trash bs - whether this should be in the store or in a separate file types??
  label: string;
  value: number;
};

const store = useProductsStore();
const model = defineModel<boolean>({ required: true });
const { getAllProductCategories } = storeToRefs(store);
const popularProductsCount = ref(0);

const props = defineProps({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: String,
    default: "",
  },
  productDescription: {
    type: String,
    default: "",
  },
  productShortDescription: {
    type: String,
    default: "",
  },
  productImageUrl: {
    type: String,
    default: "",
  },
  productSelectedCategory: {
    type: Object,
    required: true,
  },
  productSelectedSubCategory: {
    type: Object,
    required: true,
  },
  productPopular: {
    type: Boolean,
    default: false,
  },
});

const $q = useQuasar();
const productName = ref(props.productName);
const productPrice = ref(props.productPrice);
const productDescription = ref(props.productDescription);
const productShortDescription = ref(props.productShortDescription);
const productImageUrl = ref(props.productImageUrl);
const selectedCategory = ref<CategoryOption | null>(null);
const selectedSubCategory = ref<CategoryOption | null>(null);
const productCategoriesList = ref();
const productSubCategoriesList = ref();
const productPopular = ref(props.productPopular);
const initialProductPopular = ref(props.productPopular);

const isPopularToggleDisabled = computed(() => {
  // If product is currently popular, allow to unmark it
  if (productPopular.value) {
    return false;
  }
  // If there are 8 or more popular products, disable toggle
  return popularProductsCount.value >= 8;
});

const shouldShowWarning = computed(() => {
  // Show warning only when:
  // 1. Toggle is disabled (8+ popular products)
  // 2. Product was NOT initially popular (we're trying to mark it as popular)
  return isPopularToggleDisabled.value && !initialProductPopular.value;
});

onMounted(async () => {
  await getCategories();
  if (selectedCategory.value) {
    await loadSubCategories(selectedCategory.value);
  }
  // Load popular products count
  await loadPopularProductsCount();
});

const loadPopularProductsCount = async () => {
  const popularProducts = await store.getPopularProducts();
  if (popularProducts) {
    // If current product is already popular, exclude it from count
    const currentProductId = store.productId;
    const count = currentProductId
      ? popularProducts.filter((p) => p.id !== currentProductId).length
      : popularProducts.length;
    popularProductsCount.value = count;
  }
};

watch(
  [
    () => props.productName,
    () => props.productPrice,
    () => props.productDescription,
    () => props.productShortDescription,
    () => props.productImageUrl,
    () => props.productSelectedCategory,
    () => props.productSelectedSubCategory,
    () => props.productPopular,
  ],
  async ([
    newName,
    newPrice,
    newDescription,
    newShortDescription,
    newImageUrl,
    newSelectedProductCategory,
    newSelectedSubProductCategory,
    newProductPopular,
  ]) => {
    productName.value = newName;
    productPrice.value = newPrice;
    productDescription.value = newDescription;
    productShortDescription.value = newShortDescription;
    productImageUrl.value = newImageUrl;
    productPopular.value = newProductPopular;
    initialProductPopular.value = newProductPopular;
    const newCategory = {
      label: newSelectedProductCategory.name,
      value: newSelectedProductCategory.id,
    };
    selectedCategory.value = newCategory;

    await loadSubCategories(newCategory);

    selectedSubCategory.value = {
      label: newSelectedSubProductCategory.name,
      value: newSelectedSubProductCategory.id,
    };
  }
);

const getCategories = async () => {
  const categories = await getAllProductCategories.value;

  if (categories) {
    productCategoriesList.value = categories.categories.map((option) => ({
      label: option.name,
      value: option.id,
    }));
  }
};

const loadSubCategories = async (category: CategoryOption) => {
  const subCategories = await store.getSubCategories(category.value);

  if (subCategories) {
    productSubCategoriesList.value = subCategories.map((option) => ({
      label: option.name,
      value: option.id,
    }));
  }
};

const onProductCategoryChange = async (selectedCategory: CategoryOption) => {
  await loadSubCategories(selectedCategory);
  selectedSubCategory.value = null;
};

const updateProduct = async () => {
  if (store.productId) {
    const update = await store.updateProduct(store.productId, {
      name: productName.value,
      price: Number(productPrice.value),
      description: productDescription.value,
      short_description: productShortDescription.value,
      image_url: productImageUrl.value,
      product_category: Number(selectedCategory.value?.value),
      product_sub_category: Number(selectedSubCategory.value?.value),
      popular: productPopular.value,
    });

    // Reload popular products count after update
    await loadPopularProductsCount();

    $q.notify({
      color: update ? "green-4" : "red-5",
      textColor: "white",
      icon: update ? "cloud_done" : "warning",
      message: update
        ? "The product has been updated."
        : "There was a problem while updating the product.",
    });
  }
};
</script>

<style scoped>
.popular-limit-warning {
  display: flex;
  align-items: flex-start;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
}

.warning-text {
  flex: 1;
}
</style>
