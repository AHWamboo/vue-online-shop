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
                v-model="sliderTitle"
                clearable
                clear-icon="close"
                filled
                label="Slider title"
                hint="Your slider title"
                lazy-rules
                :rules="[
                  (val) =>
                    (typeof val === 'string' && val.trim().length > 0) ||
                    'Please enter your slider title.',
                  (val) =>
                    !val ||
                    val.length <= 100 ||
                    'Please use maximum 100 characters.',
                ]"
              ></q-input>

              <q-input
                v-model="sliderDescription"
                filled
                clearable
                type="textarea"
                label="Slider description"
                hint="Please write your slider description"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              ></q-input>

              <q-input
                v-model="sliderLink"
                clearable
                clear-icon="close"
                filled
                label="Slider link"
                hint="Your slider link"
              ></q-input>

              <div>
                <q-file
                  v-model="file"
                  label="Pick one file"
                  filled
                  hint="Your slider image"
                />
              </div>

              <div v-if="currentSlider?.image_url" class="q-mt-md">
                <strong>Current image:</strong>
                <img
                  :src="currentSlider.image_url"
                  alt="Current slider image"
                  style="max-width: 300px; margin-top: 10px; display: block"
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
            <q-form class="q-gutter-md" @submit="onSubmit2">
              <q-input
                v-model="sliderTitle2"
                clearable
                clear-icon="close"
                filled
                label="Slider title"
                hint="Your slider title"
                lazy-rules
                :rules="[
                  (val) =>
                    (typeof val === 'string' && val.trim().length > 0) ||
                    'Please enter your slider title.',
                  (val) =>
                    !val ||
                    val.length <= 100 ||
                    'Please use maximum 100 characters.',
                ]"
              ></q-input>

              <q-input
                v-model="sliderDescription2"
                filled
                clearable
                type="textarea"
                label="Slider description"
                hint="Please write your slider description"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              ></q-input>

              <q-input
                v-model="sliderLink2"
                clearable
                clear-icon="close"
                filled
                label="Slider link"
                hint="Your slider link"
              ></q-input>

              <div>
                <q-file
                  v-model="file2"
                  label="Pick one file"
                  filled
                  hint="Your slider image"
                />
              </div>

              <div v-if="slider2?.image_url" class="q-mt-md">
                <strong>Current image:</strong>
                <img
                  :src="slider2.image_url"
                  alt="Current slider image"
                  style="max-width: 300px; margin-top: 10px; display: block"
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

          <q-tab-panel name="slider 3">
            <q-form class="q-gutter-md" @submit="onSubmit3">
              <q-input
                v-model="sliderTitle3"
                clearable
                clear-icon="close"
                filled
                label="Slider title"
                hint="Your slider title"
                lazy-rules
                :rules="[
                  (val) =>
                    (typeof val === 'string' && val.trim().length > 0) ||
                    'Please enter your slider title.',
                  (val) =>
                    !val ||
                    val.length <= 100 ||
                    'Please use maximum 100 characters.',
                ]"
              ></q-input>

              <q-input
                v-model="sliderDescription3"
                filled
                clearable
                type="textarea"
                label="Slider description"
                hint="Please write your slider description"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              ></q-input>

              <q-input
                v-model="sliderLink3"
                clearable
                clear-icon="close"
                filled
                label="Slider link"
                hint="Your slider link"
              ></q-input>

              <div>
                <q-file
                  v-model="file3"
                  label="Pick one file"
                  filled
                  hint="Your slider image"
                />
              </div>

              <div v-if="slider3?.image_url" class="q-mt-md">
                <strong>Current image:</strong>
                <img
                  :src="slider3.image_url"
                  alt="Current slider image"
                  style="max-width: 300px; margin-top: 10px; display: block"
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
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useSlidersStore } from "src/stores/sliders";
import type { Slider } from "src/stores/sliders";

const tab = ref("slider 1");
const sliders = ref<Slider[] | null>(null);

// Slider 1 form fields
const sliderTitle = ref("");
const sliderDescription = ref("");
const sliderLink = ref("");
const file = ref(null);

// Slider 2 form fields
const sliderTitle2 = ref("");
const sliderDescription2 = ref("");
const sliderLink2 = ref("");
const file2 = ref(null);

// Slider 3 form fields
const sliderTitle3 = ref("");
const sliderDescription3 = ref("");
const sliderLink3 = ref("");
const file3 = ref(null);

const store = useSlidersStore();

const currentSlider = computed(() => {
  if (!sliders.value || sliders.value.length === 0) return null;
  const tabNumber = tab.value.split(" ")[1];
  if (!tabNumber) return null;
  const sliderIndex = parseInt(tabNumber) - 1;
  return sliders.value[sliderIndex] || null;
});

const slider2 = computed(() => {
  if (!sliders.value || sliders.value.length < 2) return null;
  return sliders.value[1] || null;
});

const slider3 = computed(() => {
  if (!sliders.value || sliders.value.length < 3) return null;
  return sliders.value[2] || null;
});

// Update form fields when sliders data changes
watch(
  [currentSlider, slider2, slider3],
  ([newSlider1, newSlider2, newSlider3]) => {
    if (newSlider1) {
      sliderTitle.value = newSlider1.header || "";
      sliderDescription.value = newSlider1.description || "";
      sliderLink.value = newSlider1.link || "";
    }
    if (newSlider2) {
      sliderTitle2.value = newSlider2.header || "";
      sliderDescription2.value = newSlider2.description || "";
      sliderLink2.value = newSlider2.link || "";
    }
    if (newSlider3) {
      sliderTitle3.value = newSlider3.header || "";
      sliderDescription3.value = newSlider3.description || "";
      sliderLink3.value = newSlider3.link || "";
    }
  },
  { immediate: true }
);

function onSubmit() {
  console.log("onSubmit slider 1", {
    header: sliderTitle.value,
    description: sliderDescription.value,
    link: sliderLink.value,
    file: file.value,
  });
}

function onSubmit2() {
  console.log("onSubmit slider 2", {
    header: sliderTitle2.value,
    description: sliderDescription2.value,
    link: sliderLink2.value,
    file: file2.value,
  });
}

function onSubmit3() {
  console.log("onSubmit slider 3", {
    header: sliderTitle3.value,
    description: sliderDescription3.value,
    link: sliderLink3.value,
    file: file3.value,
  });
}

onMounted(async () => {
  const result = await store.getSliders();
  sliders.value = result;
});
</script>

<style scoped>
:deep(.q-tab__icon) {
  color: #040f16 !important;
}

:deep(.q-tab__label) {
  color: #040f16 !important;
}
</style>
