<template>
  <div class="row">
    <div class="col-6 column-equal-width">
      <h4>Cart products</h4>
      <div class="column">
        <div class="col">Product</div>
        <div class="col">Product</div>
        <div class="col">Product</div>
        <div class="col">Product</div>
        <div class="col">Product</div>
        <div class="col">Product</div>
        <div class="col">Product</div>
        <div class="col">Product</div>
      </div>
    </div>
    <div class="col-6">
      <h4>Second column</h4>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.column-equal-width .column > div {
  padding: 10px 15px;
  background: rgba(153, 153, 153, 0.15);
  border: 1px solid rgba(153, 153, 153, 0.2);
}

.column-equal-width .column + .column {
  margin-top: 1rem;
}
</style>
