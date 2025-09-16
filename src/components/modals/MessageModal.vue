<template>
  <q-dialog v-model="model" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar :icon="icon" :color="color" text-color="white" />
        <span class="q-ml-sm">{{ label }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          :label="submitButtonLabel"
          :color="submitButtonColor"
          v-close-popup
          @click="emit('submit')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ required: true });

defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  submitButtonLabel: {
    type: String,
    required: true,
  },
  submitButtonColor: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "submit"): void;
}>();
</script>

<style scoped></style>
