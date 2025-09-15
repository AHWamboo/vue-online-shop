<template>
  <q-header elevated data-e2e="main-menu">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />
      <q-separator dark vertical inset></q-separator>

      <q-toolbar-title :shrink="false">
        <router-link to="/">Shop Demo App</router-link>
      </q-toolbar-title>

      <menu-link icon="person_outline" label="Sign in" to="/signIn"></menu-link>
      <q-separator dark vertical></q-separator>

      <menu-link icon="key" label="Log in" to="/logIn"></menu-link>
      <q-separator dark vertical></q-separator>
      <menu-link
        icon="alternate_email"
        label="Contact"
        to="/contact"
      ></menu-link>
      <q-separator dark vertical></q-separator>

      <menu-link icon="shopping_bag" label="Cart" to="/cart"></menu-link>
    </q-toolbar>
    <q-toolbar>
      <menu-product-category></menu-product-category>
    </q-toolbar>
  </q-header>

  <q-drawer v-model="leftDrawerOpen" bordered>
    <q-list>
      <q-item-label header> Essential Links </q-item-label>

      <EssentialLink
        v-for="link in linksList"
        :key="link.title"
        v-bind="link"
      />
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import MenuLink from "src/components/topMenu/MenuLink/MenuLink.vue";
import MenuProductCategory from "src/components/topMenu/MenuProductCategory.vue";
import EssentialLink from "src/components/EssentialLink.vue";
import { ref } from "vue";

const linksList = [
  {
    title: "Title 1",
    caption: "Caption 1",
    icon: "school",
    link: "http://localhost:9000/#/signIn",
  },
  {
    title: "Title 2",
    caption: "Caption 2",
    icon: "code",
    link: "http://localhost:9000/#/signIn",
  },
  {
    title: "Title 3",
    caption: "Caption 3",
    icon: "chat",
    link: "http://localhost:9000/#/signIn",
  },
  {
    title: "Title 4",
    caption: "Caption 4",
    icon: "record_voice_over",
    link: "http://localhost:9000/#/signIn",
  },
  {
    title: "Title 5",
    caption: "Caption 5",
    icon: "rss_feed",
    link: "http://localhost:9000/#/signIn",
  },
  {
    title: "Title 6",
    caption: "Caption 6",
    icon: "public",
    link: "http://localhost:9000/#/signIn",
  },
  {
    title: "Title 7",
    caption: "Caption 7",
    icon: "favorite",
    link: "http://localhost:9000/#/signIn",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
#main {
  background: #f6f6f6;
}

a,
a:visited,
a:active,
a:focus {
  color: inherit;
  text-decoration: none;
  outline: none;
}
</style>
