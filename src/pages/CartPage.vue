<template>
  <div class="row">
    <div class="col-6">
      <h4>First column</h4>
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Product category</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Product title</div>
            <div class="text-caption text-grey">Product short description</div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="https://cdn.quasar.dev/img/parallax2.jpg"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-6">
      <h4>Second column</h4>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>
