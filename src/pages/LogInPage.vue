<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-xl-4 col-md-7 col-sm-12 col-xs-12">
        <h2>Log in!</h2>
        <q-form class="q-gutter-md" @submit="onSubmit">
          <q-input
            v-model="email"
            filled
            label="Your email@domain.com"
            hint="Your email address"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter your email.',
            ]"
          ></q-input>

          <q-input
            v-model="name"
            filled
            label="Your password"
            hint="Your password"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter your password.',
            ]"
          ></q-input>

          <q-toggle v-model="remember" label="Remember me?"></q-toggle>

          <div>
            <q-btn label="Log in" type="submit" color="primary"></q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref } from "vue";

const $q = useQuasar();

const name = ref(null);
const email = ref(null);
const remember = ref(false);

async function onSubmit() {
  console.log(
    `
    Wiadomosc zostala wyslana!
    name: ${name.value}
    email: ${email.value}
    accept: ${remember.value}
    `
  );
  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
    message: "Your message has been sent.",
  });
}
</script>

<style scoped>
.col {
  background: lightblue;
  margin-right: 10px;
}

.separator {
  padding: 5px;
}
</style>
