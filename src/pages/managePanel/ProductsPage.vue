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
  <q-page class="q-pa-md">
    <div class="row justify-left">
      <div class="col-12 col-md-12 col-sm-12">
        <h2 class="brand-red">Products Page</h2>
        <div class="text-subtitle1 q-pa-sm">
          Use <kbd>SHIFT</kbd> to select / deselect a range and
          <kbd>CTRL</kbd> to add to selection
        </div>

        <q-table
          flat
          bordered
          ref="tableRef"
          title="Products"
          :rows="rows"
          :columns="columns"
          row-key="id"
          selection="multiple"
          v-model:selected="selected"
        >
          <template v-slot:top>
            <div class="row items-center justify-between q-pa-sm">
              <div class="text-h6">Products</div>
              <q-btn
                label="Delete selected"
                class="products-table-delete-button"
                icon="delete"
                color="negative"
                @click="deleteSelected"
                :disable="selected.length === 0"
              />
            </div>
          </template>

          <template v-slot:header-selection="scope">
            <q-checkbox v-model="scope.selected" color="dark" />
          </template>

          <template v-slot:body-selection="scope">
            <q-checkbox v-model="scope.selected" color="dark" />
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                size="sm"
                color="primary"
                icon="edit"
                @click="editProduct(props.row.id)"
                flat
                round
              />
              <q-btn
                size="sm"
                color="red"
                icon="delete"
                @click="openRemoveModal(props.row.id)"
                flat
                round
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

const $q = useQuasar();
const store = useProductsStore();
const { getAllProducts } = storeToRefs(store);
const productsTable = ref<Product[]>([]);
const tableRef = ref();
const selected = ref([]);
const removeModal = ref(false);

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

const deleteSelected = async () => {
  console.log(`Delete selected pressed! ${selected.value.length}`);
  // const idsToDelete = selected.value.map((item: ProductRow) => item.id);
  // await store.deleteProducts(idsToDelete);
  // await getProducts();
  // selected.value = [];
};

const editProduct = async (productId: number) => {
  console.log(`Edit product pressed! Product ID: ${productId}`);
  // TODO: Implement product editing logic
  // For example, navigate to edit page or open edit modal
};

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
