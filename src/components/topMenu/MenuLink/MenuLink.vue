<template>
  <router-link :to="props.to"
    ><q-btn stretch flat :icon="props.icon" :label="props.label"></q-btn
  ></router-link>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
a {
  color: white;
}
</style>
