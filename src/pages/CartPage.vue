<template>
  <div class="row">
    <div class="col-6 column-equal-width">
      <h4>Cart products</h4>
      <div class="column">
        <div class="col row inline">
          <div class="col text-left">Img</div>
          <div class="col text-left">Product details</div>
          <div class="col text-center">Counter</div>
          <div class="col text-center">Price</div>
          <div class="col text-right">Trash icon</div>
        </div>
        <div class="col row inline">
          <div class="col text-left">Img</div>
          <div class="col text-left">Product details</div>
          <div class="col text-center">Counter</div>
          <div class="col text-center">Price</div>
          <div class="col text-right">Trash icon</div>
        </div>
        <div class="col row inline">
          <div class="col text-left">Img</div>
          <div class="col text-left">Product details</div>
          <div class="col text-center">Counter</div>
          <div class="col text-center">Price</div>
          <div class="col text-right">Trash icon</div>
        </div>
        <div class="col row inline">
          <div class="col text-left">Img</div>
          <div class="col text-left">Product details</div>
          <div class="col text-center">Counter</div>
          <div class="col text-center">Price</div>
          <div class="col text-right">Trash icon</div>
        </div>
        <div class="col row inline">
          <div class="col text-left">Img</div>
          <div class="col text-left">Product details</div>
          <div class="col text-center">Counter</div>
          <div class="col text-center">Price</div>
          <div class="col text-right">Trash icon</div>
        </div>
        <div class="col row inline">
          <div class="col text-left">Img</div>
          <div class="col text-left">Product details</div>
          <div class="col text-center">Counter</div>
          <div class="col text-center">Price</div>
          <div class="col text-right">Trash icon</div>
        </div>
        <div class="col row inline">
          <div class="col text-left">Img</div>
          <div class="col text-left">Product details</div>
          <div class="col text-center">Counter</div>
          <div class="col text-center">Price</div>
          <div class="col text-right">Trash icon</div>
        </div>
        <div class="col row inline">
          <div class="col text-left">Img</div>
          <div class="col text-left">Product details</div>
          <div class="col text-center">Counter</div>
          <div class="col text-center">Price</div>
          <div class="col text-right">Trash icon</div>
        </div>
      </div>
    </div>
    <div class="col-6">
      <h4>Second column</h4>
      <q-card class="q-pa-md q-mb-md">
        <q-list bordered>
          <q-item>
            <q-item-section>
              <q-item-label>1 item</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>€34.46 </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Shipping</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>Free</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Total price</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>€34.46 </q-item-label>
            </q-item-section>
          </q-item>
          <q-btn color="primary" label="Proceed to checkout" />
        </q-list>
      </q-card>
      <q-card class="q-mt-md">
        <q-list bordered>
          <q-expansion-item
            icon="security"
            label="Security policy"
            default-opened
          >
            <q-card>
              <q-card-section>
                <a href="#" class="text-primary">Lorem ipsum</a> dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item icon="local_shipping" label="Delivery policy">
            <q-card>
              <q-card-section>
                <a href="#" class="text-primary">Lorem ipsum</a> dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item icon="assignment_return" label="Return policy">
            <q-card>
              <q-card-section>
                <a href="#" class="text-primary">Lorem ipsum</a> dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card>
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
