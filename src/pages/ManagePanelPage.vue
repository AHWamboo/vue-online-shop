<template>
  <h1>ManagePanelPage</h1>
</template>

<script setup lang="ts">
import { useAuthStore } from "src/stores/auth";
import { onMounted, ref } from "vue";

const authStore = useAuthStore();
const session = ref();

onMounted(async () => {
  session.value = await authStore.getSession();
  console.log("Session w ManagePanelPage.vue:", session.value);
});
</script>
