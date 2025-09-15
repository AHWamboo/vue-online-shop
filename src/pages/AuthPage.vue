<template>
  <h1>Auth page</h1>
</template>

<script setup lang="ts">
import { supabase } from "src/api/supabase";
import { onMounted } from "vue";

onMounted(async () => {
  console.log("Jestem na AuthPage.vue");
  const hash = window.location.hash.substring(1);
  console.log("window.location.hash");
  console.log(window.location.hash);

  console.log(hash);
  const params = new URLSearchParams(hash);
  console.log(params);

  const access_token = hash.match(/access_token=([^&]*)/)?.[1] || undefined;
  const refresh_token = params.get("refresh_token");

  console.log(access_token);
  console.log(refresh_token);

  if (access_token && refresh_token) {
    await supabase.auth.setSession({ access_token, refresh_token });
  }

  const user = await supabase.auth.getUser();

  console.log("await supabase.auth.getUser from App.vue");
  console.log(user);
});
</script>
