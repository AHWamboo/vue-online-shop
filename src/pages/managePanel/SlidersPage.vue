<template>
  <q-page class="q-pa-md">
    <h2 class="brand-red q-mb-md">Index page slider</h2>

    <div class="row">
      <div class="col-auto">
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="slider 1" icon="image" label="Slider 1" />
          <q-tab name="slider 2" icon="image" label="Slider 2" />
          <q-tab name="slider 3" icon="image" label="Slider 3" />
        </q-tabs>
      </div>

      <div class="col q-ml-md">
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          transition-prev="fade"
          transition-next="fade"
        >
          <q-tab-panel name="slider 1">
            <q-form class="q-gutter-md" @submit="onSubmit">
              <q-input
                v-model="sliderHeader"
                clearable
                clear-icon="close"
                filled
                label="Slider header"
                hint="Your slider header"
                lazy-rules
                :rules="[
                  (val) =>
                    (typeof val === 'string' && val.trim().length > 0) ||
                    'Please enter your slider header.',
                  (val) =>
                    !val ||
                    val.length <= 100 ||
                    'Please use maximum 100 characters.',
                ]"
              ></q-input>

              <q-input
                v-model="sliderMessage"
                filled
                clearable
                type="textarea"
                label="Slider message"
                hint="Please write your slider message"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              ></q-input>

              <div>
                <q-file
                  v-model="file"
                  label="Pick one file"
                  filled
                  hint="Your slider image"
                />
              </div>

              <div>
                <q-btn
                  label="Update slider"
                  type="submit"
                  color="black"
                ></q-btn>
              </div>
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="slider 2">
            <div class="text-h6">forma slider 2</div>
          </q-tab-panel>

          <q-tab-panel name="slider 3">
            <div class="text-h6">forma slider 3</div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";

const sliderHeader = ref("");
const sliderMessage = ref("");
const file = ref(null);
const tab = ref("slider 1");

function onSubmit() {
  console.log("onSubmit");
}
</script>

<style scoped>
:deep(.q-tab__icon) {
  color: #040f16 !important;
}

:deep(.q-tab__label) {
  color: #040f16 !important;
}
</style>
