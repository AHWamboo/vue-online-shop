<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-xl-4 col-md-7 col-sm-12 col-xs-12">
        <h2>Sign in!</h2>
        <q-form @submit="handleLogin" class="q-gutter-md">
          <q-input
            filled
            v-model="email"
            label="Your email@domain.com"
            hint="Your email address"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter your email.',
            ]"
          ></q-input>

          <q-toggle
            v-model="licenseAndTerms"
            label="I accept the license and terms"
          ></q-toggle>

          <div>
            <q-btn
              :label="loading ? 'Loading' : 'Send link'"
              type="submit"
              color="primary"
              :disabled="loading"
            ></q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.col {
  background: lightblue;
  margin-right: 10px;
}

.separator {
  padding: 5px;
}
</style>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { supabase } from "src/api/supabase";
import { ref } from "vue";

const $q = useQuasar();
const loading = ref(false);
const email = ref("");
const licenseAndTerms = ref(false);

const handleLogin = async () => {
  if (licenseAndTerms.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first.",
    });
  } else {
    try {
      loading.value = true;
      const { error } = await supabase.auth.signInWithOtp({
        email: email.value,
      });

      if (error) {
        throw error;
      }

      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Check your email for the login link!",
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading.value = false;
    }
  }
};
</script>
