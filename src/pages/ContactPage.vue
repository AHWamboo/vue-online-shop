<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-xl-6 col-md-7 col-sm-12 col-xs-12">
        <h1 class="contact-label">Contact!</h1>
        <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-select
            filled
            v-model="topic"
            :options="messageTopics"
            label="Message topic"
            hint="Choose message topic"
          ></q-select>

          <q-input
            filled
            v-model="email"
            label="Your email@domain.com"
            hint="Your email address"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          ></q-input>

          <q-input
            filled
            v-model="name"
            label="Your name"
            hint="Name and surname"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          ></q-input>

          <q-input
            filled
            clearable
            type="textarea"
            v-model="message"
            label="Your message"
            hint="Please write your message"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          ></q-input>

          <q-toggle
            v-model="accept"
            label="I accept the license and terms"
          ></q-toggle>

          <div>
            <q-btn label="Submit" type="submit" color="primary"></q-btn>
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            ></q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
@use "../styles/variables.scss" as *;

.contact-label {
  text-align: center;
  color: $main-text-color;
}
</style>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { contactMessagesStore } from "src/stores/contactMessages";
import { ref } from "vue";

const $q = useQuasar();
const store = contactMessagesStore();
const name = ref(null);
const email = ref(null);
const message = ref(null);
const accept = ref(false);
const topic = ref(null);
const messageTopics = ["Item question", "Client support message", "Other"];

async function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    console.log(
      `
    Wiadomosc zostala wyslana!
    name: ${name.value}
    email: ${email.value}
    message: ${message.value}
    accept: ${accept.value}
    messageModel: ${topic.value}
    `
    );
    await store.addContactMessage({
      topic: topic.value,
      name: name.value,
      email: email.value,
      message: message.value,
      accept: accept.value,
    });
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Your message has been sent.",
    });
  }
}

function onReset() {
  name.value = null;
  email.value = null;
  name.value = null;
  message.value = null;
  accept.value = false;
  topic.value = null;
}
</script>
