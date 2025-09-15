<template>
  <q-layout view="lHh Lpr lFf">
    <main-header-top-menu></main-header-top-menu>

    <q-page-container>
      <div class="row" id="main">
        <div class="col">
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import MainHeaderTopMenu from "src/components/topMenu/MainHeaderTopMenu.vue";
</script>

<style scoped></style>
