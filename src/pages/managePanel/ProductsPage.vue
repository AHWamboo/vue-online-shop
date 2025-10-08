<template>
  <MessageModal
    v-model="removeModal"
    icon="delete_forever"
    color="red"
    label="Are you sure you want to remove selected product?"
    submit-button-label="Remove"
    submit-button-color="red"
    @submit="removeProduct()"
  >
  </MessageModal>

  <EditProductModal
    v-model="editModal"
    :product-name="selectedProduct?.name || ''"
    :product-price="selectedProduct?.price?.toString() || ''"
    :product-description="selectedProduct?.description || ''"
    :product-short-description="selectedProduct?.short_description || ''"
    :product-image-url="selectedProduct?.image_url || ''"
    :categories-list="selectedProduct?.product_categories || {}"
    :product-sub-category="
      selectedProduct?.product_sub_categories?.[0]?.id || 0
    "
  ></EditProductModal>

  <q-page class="q-pa-md">
    <div class="row justify-left">
      <div class="col-12 col-md-12 col-sm-12">
        <h2 class="brand-red">Products Page</h2>
        <div class="text-subtitle1 q-pa-sm">
          Use key <kbd>SHIFT</kbd> to select / deselect a range and
          <kbd>CTRL</kbd> to add to selection
        </div>

        <q-table
          ref="tableRef"
          v-model:selected="selected"
          flat
          bordered
          title="Products"
          :rows="rows"
          :columns="columns"
          row-key="id"
          selection="multiple"
        >
          <template #top>
            <div class="row items-center justify-between q-pa-sm">
              <div class="text-h6">Products</div>
              <q-btn
                label="Delete selected"
                class="products-table-delete-button"
                icon="delete"
                color="negative"
                :disable="selected.length === 0"
                @click="deleteSelected"
              />
            </div>
          </template>

          <template #header-selection="scope">
            <q-checkbox v-model="scope.selected" color="dark" />
          </template>

          <template #body-selection="scope">
            <q-checkbox v-model="scope.selected" color="dark" />
          </template>

          <template #body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                size="sm"
                color="primary"
                icon="edit"
                round
                flat
                @click="openEditModal(props.row.id)"
              />
              <q-btn
                size="sm"
                color="red"
                icon="delete"
                round
                flat
                @click="openRemoveModal(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useQuasar, type QTableColumn } from "quasar";
import type { Product } from "src/stores/products";
import { useProductsStore } from "src/stores/products";
import { storeToRefs } from "pinia";
import MessageModal from "../../components/modals/MessageModal.vue";
import EditProductModal from "../../components/modals/EditProductModal.vue";

const $q = useQuasar();
const store = useProductsStore();
const { getAllProducts } = storeToRefs(store);
const productsTable = ref<Product[]>([]);
const tableRef = ref();
const selected = ref([]);
const removeModal = ref(false);
const editModal = ref(false);
const selectedProduct = ref<Product | null>(null);

const getProducts = async () => {
  const products = await getAllProducts.value;
  if (products) {
    productsTable.value = products;
  }
};

function openRemoveModal(id: number) {
  store.productId = id;
  removeModal.value = true;
}

async function openEditModal(id: number) {
  store.productId = id;
  console.log(`${store.productId}`);
  const productDetails = await store.getProductById(store.productId);
  console.log(productDetails);

  if (productDetails) {
    selectedProduct.value = productDetails;
    editModal.value = true;
  }
}

const deleteSelected = async () => {
  console.log(`Delete selected pressed! ${selected.value.length}`);
  // const idsToDelete = selected.value.map((item: ProductRow) => item.id);
  // await store.deleteProducts(idsToDelete);
  // await getProducts();
  // selected.value = [];
};

// const editProduct = async () => {
//   console.log(`Edit product pressed! Product ID`);
//   // TODO: Implement product editing logic
//   // For example, navigate to edit page or open edit modal
// };

const removeProduct = async () => {
  if (!store.productId) return;
  console.log(`Remove product pressed! Product ID: ${store.productId}`);
  const remove = await store.removeProduct(store.productId);

  store.productId = null;
  removeModal.value = false;

  $q.notify({
    color: remove ? "green-4" : "red-5",
    textColor: "white",
    icon: remove ? "cloud_done" : "warning",
    message: remove
      ? "The product has been removed."
      : "There was a problem while removing the product.",
  });
};

onMounted(async () => {
  await getProducts();
});

const rows = productsTable;

type ProductRow = {
  id: number;
  name: string;
  price: string;
  short_description: string;
  product_categories: { name: string };
  product_sub_categories: { name: string };
};

const columns: QTableColumn<ProductRow>[] = [
  {
    name: "id",
    field: "id",
    align: "left",
    label: "Id",
    sortable: true,
    sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "name",
    field: "name",
    align: "left",
    label: "Name",
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
    required: true,
  },
  {
    name: "price",
    field: "price",
    align: "left",
    label: "Price",
    sortable: true,
    sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "shortDescription",
    field: "short_description",
    align: "left",
    label: "Short description",
    format: (val: string) => `${val.substring(0, 45)}...`, // trash bs - jezeli text jest dlugosci product short description... to na froncie wyswietla sie to przed zakonczeniem kolumny i wyglada to jak bug
  },
  {
    name: "categoryName",
    field: (row) => row.product_categories.name,
    align: "left",
    label: "Category",
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },
  {
    name: "subCategoryName",
    field: (row) => row.product_sub_categories.name,
    align: "left",
    label: "Sub category",
    sortable: true,
    sort: (a: string, b: string) => a.localeCompare(b),
  },
  {
    name: "actions",
    field: () => "",
    align: "center",
    label: "Actions",
    sortable: false,
  },
];
</script>

<style scoped>
.products-table-delete-button,
.products-table-edit-button {
  margin-left: 10px;
}
</style>
