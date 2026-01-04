<template>
  <q-page class="q-pa-md">
    <div class="row justify-left">
      <div class="col-xl-4 col-md-7 col-sm-12 col-xs-12">
        <h2 class="brand-red">Index page slider</h2>
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
            <q-btn label="Update slider" type="submit" color="black"></q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";

const sliderHeader = ref("");
const sliderMessage = ref("");
const file = ref(null);

function onSubmit() {
  console.log("onSubmit");
}
</script>

<style></style>
