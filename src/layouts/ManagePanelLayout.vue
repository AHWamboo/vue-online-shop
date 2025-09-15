<template>
  <q-layout view="lHh lpR fff">
    <q-header elevated class="bg-black text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-separator dark vertical inset></q-separator>

        <q-toolbar-title>
          <router-link to="/">Shop Demo App</router-link>
        </q-toolbar-title>
        <menu-link icon="arrow_right" label="Go to shop" to="/"></menu-link>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <router-link to="/managePanel">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="dashboard"></q-icon>
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>
        </router-link>
        <q-separator></q-separator>
        <router-link to="/managePanel/userProfile">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="manage_accounts"></q-icon>
            </q-item-section>
            <q-item-section>User profile</q-item-section>
          </q-item>
        </router-link>
        <q-separator></q-separator>
        <q-expansion-item
          icon="storefront"
          label="Products"
          expand-separator
          :content-inset-level="0.5"
        >
          <q-list>
            <router-link to="/managePanel/products">
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="list" />
                </q-item-section>
                <q-item-section>Products list</q-item-section>
              </q-item>
            </router-link>

            <router-link to="/managePanel/addProduct">
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="add_box" />
                </q-item-section>
                <q-item-section>Add new product</q-item-section>
              </q-item>
            </router-link>
          </q-list>
        </q-expansion-item>
        <router-link to="/managePanel/contactMessages">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="all_inbox"></q-icon>
            </q-item-section>
            <q-item-section>Contact messages</q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MenuLink from "../components/topMenu/MenuLink/MenuLink.vue";

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
a,
a:visited,
a:active,
a:focus {
  color: inherit;
  text-decoration: none;
  outline: none;
}
</style>
