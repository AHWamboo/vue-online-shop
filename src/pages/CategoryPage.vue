<template>
  <q-page class="q-pa-md bg-grey-2">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <div class="row q-col-gutter-md">
          <!-- Left column: filters -->
          <div class="col-12 col-md-2">
            <q-card class="q-pa-md q-mb-md">
              <div class="text-h6">FILTER BY</div>
              <q-list
                v-for="attribute in productCategoriesList?.attributes"
                :key="attribute.id"
              >
                <q-item-label class="text-bold attribute-name">{{
                  attribute?.name
                }}</q-item-label>

                <q-item
                  v-for="value in attribute.values"
                  :key="value"
                  tag="label"
                >
                  <q-checkbox
                    v-model="getAttributeByName(value).selected"
                    :label="value"
                    @update:model-value="
                      (val) => onFilterChange(attribute, value, val)
                    "
                  />
                </q-item>
              </q-list>
            </q-card>
          </div>

          <!-- Righ column -->
          <div class="col-12 col-md-10">
            <!-- Section: header, image, long description -->
            <q-card class="q-pa-md q-mb-md">
              <div class="row items-center q-col-gutter-md">
                <div class="col-12 col-md-8">
                  <div class="text-h5 text-uppercase">
                    {{ productCategoriesList?.name }}
                  </div>
                  <p>
                    {{ productCategoriesList?.long_description }}
                  </p>
                </div>
                <div class="col-12 col-md-4">
                  <q-img
                    class="category-picture"
                    :src="productCategoriesList?.image"
                    spinner-color="red"
                    fit="fill"
                  />
                </div>
              </div>
            </q-card>

            <!-- Section: Subcategories -->
            <q-card class="q-pa-md q-mb-md">
              <div class="text-h6 q-mb-md">Subcategories</div>
              <div class="row q-col-gutter-md">
                <div
                  v-for="subcategory in productCategoriesList?.subcategories"
                  :key="subcategory.id"
                  class="col-6 col-sm-4 col-md-3"
                >
                  <q-img class="subcategory-img" :src="subcategory.image" />
                  <div class="text-center text-primary">
                    {{ subcategory.name }}
                  </div>
                </div>
              </div>
            </q-card>

            <!-- Category products -->
            <q-card class="q-pa-md">
              <!-- Products info and sorting -->
              <div class="row items-center justify-between q-mb-md">
                <div class="row items-center">
                  <div class="q-mr-sm">Sort by:</div>
                  <q-select
                    v-model="sortBy"
                    dense
                    outlined
                    :options="['Price Low to High', 'Newest']"
                    style="min-width: 150px"
                    @update:model-value="(val) => onSortByChange(val)"
                  />
                </div>
              </div>

              <!-- Products list -->
              <div class="row q-col-gutter-md">
                <div
                  v-for="product in filteredProducts"
                  :key="product.id"
                  class="col-6 col-sm-4 col-md-3"
                >
                  <q-card class="q-pa-sm">
                    <!-- <div class="text-negative text-bold"> // trash bs - consider using this one as discount flag
                      -{{ product.discount }}%
                    </div> -->
                    <q-img
                      class="category-product-picture"
                      :src="product.image"
                      :alt="product.name"
                    />
                    <div class="q-mt-sm text-caption text-center">
                      {{ product.name }}
                    </div>
                    <div class="text-center">
                      <s class="text-grey">old price</s>
                      <span class="text-bold text-black q-ml-sm">{{
                        product.price
                      }}</span>
                    </div>
                  </q-card>
                </div>
                <div
                  v-if="filteredProducts.length === 0"
                  class="text-grey q-mt-md"
                >
                  No products match your filters.
                </div>
              </div>

              <!-- Footer: information and pagination -->
              <div class="text-caption q-mt-md">
                Showing {{ filteredProducts.length }} item(s)
              </div>
            </q-card>
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useCategoryStore } from "src/stores/category";
import type { ProductByCategory } from "src/stores/products";
import { useProductsStore } from "src/stores/products";
import { useRoute } from "vue-router";

const sortBy = ref("Newest");
const route = useRoute();
const store = useCategoryStore();
const store2 = useProductsStore();
const productCategoriesList = ref();
const productAttributes = ref();
const products = ref<ProductByCategory[]>([]);
const selectedFiltersValues = ref<string[]>([]);

async function setCategory(name: string) {
  const categoryTree = await store.getCategoryTreeByName(name);
  productCategoriesList.value = categoryTree?.categoryTree;
  productAttributes.value = categoryTree?.allAttributes;

  products.value = await store2.getProductByCategory(name); // trash bs - use different name than store2
}

const filteredProducts = computed(() => {
  if (selectedFiltersValues.value.length === 0) {
    return products.value;
  }

  return products.value.filter((product) => {
    const productAttrValues = (product.attributes ?? []).map(
      (attribute) => attribute.value
    );
    return selectedFiltersValues.value.some((selectedVal) =>
      productAttrValues.includes(selectedVal)
    );
  });
});

onMounted(async () => {
  const categoryName = route.params.categoryName as string;

  if (categoryName) {
    await setCategory(categoryName);
  }
});

watch(
  () => route.params.categoryName,
  (newCategory, oldCategory) => {
    if (newCategory !== oldCategory) {
      setCategory(newCategory as string);
    }
  }
);

function getAttributeByName(name: string) {
  return productAttributes.value.find(
    (attr: { name: string; selected: boolean }) => attr.name === name
  );
}

function onFilterChange(
  attribute: { name: string },
  value: string,
  checked: boolean
) {
  getAttributeByName(value).selected = checked;

  if (checked) {
    if (!selectedFiltersValues.value.includes(value)) {
      selectedFiltersValues.value.push(value);
    }
  } else {
    const elementIndex = selectedFiltersValues.value.findIndex(
      (element) => element === value
    );
    selectedFiltersValues.value.splice(elementIndex, 1);
  }

  console.log(
    "klik:",
    attribute.name,
    value,
    checked,
    `selected filters: ${selectedFiltersValues.value}`
  );
}

function onSortByChange(sortValue: string) {
  console.log("filter changed:", sortValue, `selected filter: ${sortBy.value}`);
}
</script>

<style scoped>
.category-picture {
  max-width: 100%;
  height: 200px;
}

.category-product-picture {
  max-width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 8px;
}

.attribute-name {
  text-transform: uppercase;
}

.subcategory-img {
  height: 250px;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>
