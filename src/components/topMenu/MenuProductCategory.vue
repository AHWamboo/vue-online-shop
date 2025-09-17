<template>
  <q-btn-dropdown
    v-for="productCategory in productCategoriesList"
    :key="productCategory.categoryName"
    split
    stretch
    flat
    :to="`/category/${productCategory.categoryName}`"
    :label="productCategory.categoryName"
  >
    <q-list>
      <q-item
        v-for="subCategory in productCategory.subCategories"
        :key="subCategory"
        v-close-popup
        :to="`/${productCategory.categoryName}/${subCategory.name}`"
        clickable
      >
        <q-item-section>
          <q-item-label class="sub-category-label">{{
            subCategory.name
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { useProductsStore } from "src/stores/products";
import { onMounted, ref } from "vue";

const store = useProductsStore();
const productCategoriesList = ref();

onMounted(async () => {
  const categoryTree = await store.getProductCategoriesTree();

  if (categoryTree) {
    productCategoriesList.value = categoryTree.map((category) => ({
      categoryName: category.categoryName,
      subCategories: category.subCategories,
    }));
  }
});
</script>

<style scoped>
.sub-category-label {
  text-transform: uppercase;
}
</style>
