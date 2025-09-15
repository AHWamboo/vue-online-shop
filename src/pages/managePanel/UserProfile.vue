<template>
  <q-page class="q-pa-md">
    <div class="row justify-left">
      <div class="col-xl-4 col-md-7 col-sm-12 col-xs-12">
        <h2 class="brand-red">User profile</h2>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            clearable
            clear-icon="close"
            filled
            v-model="username"
            label="Username"
            hint="Your profile user name"
            lazy-rules
            :rules="[
              (val) =>
                (typeof val === 'string' && val.trim().length > 0) ||
                'Please enter your username.',
              (val) =>
                !val || val.length <= 50 || 'Please use maximum 50 characters.',
            ]"
          ></q-input>

          <q-input
            clearable
            clear-icon="close"
            filled
            v-model="name"
            label="Name"
            hint="Your name"
            lazy-rules
            :rules="[
              (val) =>
                (typeof val === 'string' && val.trim().length > 0) ||
                'Please provide your name.',
              (val) =>
                !val || val.length <= 50 || 'Please use maximum 50 characters.',
            ]"
          ></q-input>

          <q-toggle v-model="avatarFileType" label="Avatar file type" />

          <q-input
            v-if="avatarFileType"
            v-model="file"
            filled
            type="file"
            hint="Upload your avatar file"
          />

          <q-input
            v-else
            clearable
            clear-icon="close"
            filled
            v-model="avatarUrl"
            label="Avatar url"
            hint="Your avatar url address"
            lazy-rules
            :rules="[
              (val) =>
                (typeof val === 'string' && val.trim().length > 0) ||
                'Please provide your avarat url.',
              (val) => val.length <= 2048 || 'Avarat url is too long.',
              (val) =>
                val.startsWith('https://') || 'Only HTTPS URLs are allowed.',
            ]"
          ></q-input>

          <q-input
            clearable
            clear-icon="close"
            filled
            v-model="websiteUrl"
            label="Website url"
            hint="Your website url address"
            lazy-rules
            :rules="[
              (val) =>
                (typeof val === 'string' && val.trim().length > 0) ||
                'Please provide your website url.',
              (val) => val.length <= 2048 || 'Website url is too long.',
              (val) =>
                val.startsWith('https://') || 'Only HTTPS URLs are allowed.',
            ]"
          ></q-input>

          <div>
            <q-btn label="Update user" type="submit" color="black"></q-btn>
          </div>
        </q-form>
      </div>
      <div id="avatar-img" class="col-xl-8 col-md-5 col-sm-12 col-xs-12">
        <q-img :src="avatarUrl" :ratio="1" />
      </div>
    </div>
  </q-page>
</template>

<style>
#avatar-img {
  text-align: center;
}

#avatar-img .q-img__image {
  width: 43%;
  height: 46%;
}
</style>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { supabase } from "src/api/supabase";
import type { UserProfile } from "src/stores/auth";
import { useAuthStore } from "src/stores/auth";
import { onMounted, ref } from "vue";

const authStore = useAuthStore();
const $q = useQuasar();
const username = ref("");
const name = ref("");
const avatarUrl = ref("");
const websiteUrl = ref("");
const avatarFileType = ref(false);
const file = ref(null);

onMounted(async () => {
  const loggedUserData: UserProfile | null = await authStore.getUser();
  if (loggedUserData) {
    username.value = loggedUserData.username;
    name.value = loggedUserData.full_name;
    avatarUrl.value = loggedUserData.avatar_url;
    websiteUrl.value = loggedUserData.website;
  }
});

async function updateProfile(userProfile: {
  username: string;
  name: string;
  avatarUrl: string;
  websiteUrl: string;
}) {
  const { username, name, avatarUrl, websiteUrl } = userProfile;

  const userId = (await authStore.getSession())?.user.id;

  const { data: userData, error } = await supabase
    .from("profiles")
    .update({
      username: username,
      full_name: name,
      avatar_url: avatarUrl,
      website: websiteUrl,
    })
    .eq("id", userId)
    .select();

  if (error) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: `An error occurred while updating the profile.`,
    });
    throw new Error(
      `Error in "updateProfile" function, details: ${error.code}`
    );
  }

  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
    message: "Check your email for the login link!",
  });

  return userData;
}

function onSubmit() {
  updateProfile({
    username: username.value,
    name: name.value,
    avatarUrl: avatarUrl.value,
    websiteUrl: websiteUrl.value,
  });

  console.log(file.value);
}
</script>
