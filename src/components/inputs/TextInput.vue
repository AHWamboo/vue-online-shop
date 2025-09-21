<template>
  <q-input
    v-model="model"
    clearable
    clear-icon="close"
    filled
    :label="label"
    :hint="hint"
    lazy-rules
    :rules="validationRules"
  ></q-input>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
const model = defineModel<string | number | FileList | null | undefined>({
  required: true,
});

defineProps({
  label: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
    required: true,
  },
  validationRules: {
    type: Array as PropType<
      Array<(val: string | number | null | undefined) => boolean | string>
    >,
    required: false,
    default: () => [],
  },
});
</script>

<style></style>
