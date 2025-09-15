<template>
  <div v-if="messages.length !== 0">
    <q-list
      bordered
      class="rounded-borders"
      v-for="message in messages"
      :key="message.id"
    >
      <q-item>
        <q-item-section avatar>
          <q-icon :name="getIcon(message.topic)" color="black" size="36px" />
        </q-item-section>

        <q-item-section class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">{{ message.topic }} </q-item-label>
          <q-item-label class="q-mt-sm">{{ message.email }} </q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">Client name: </span>
            <span class="text-grey-8">{{ message.name }}</span>
          </q-item-label>
          <q-item-label caption lines="1">{{ message.message }} </q-item-label>
          <q-item-label
            lines="1"
            class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
          >
            <span class="cursor-pointer" @click="onOpenMessage(message.id)"
              >Open message</span
            >
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="text-grey-8 q-gutter-xs">
            <template v-if="tabName === 'all'">
              <q-btn
                size="14px"
                flat
                dense
                round
                icon="done"
                color="green"
                @click="onAction(message.id, 'done')"
              />
              <q-btn
                size="14px"
                flat
                dense
                round
                icon="delete"
                color="red"
                @click="onAction(message.id, 'remove')"
              />
            </template>

            <template v-else-if="tabName === 'done'">
              <q-btn
                size="14px"
                flat
                dense
                round
                icon="remove_done"
                color="orange"
                @click="onAction(message.id, 'removeDone')"
              />
              <q-btn
                size="14px"
                flat
                dense
                round
                icon="delete"
                color="red"
                @click="onAction(message.id, 'remove')"
              />
            </template>

            <template v-else-if="tabName === 'removed'">
              <q-btn
                size="14px"
                flat
                dense
                round
                icon="forward_to_inbox"
                color="black"
                @click="onAction(message.id, 'moveToInbox')"
              />
              <q-btn
                size="14px"
                flat
                dense
                round
                icon="delete_forever"
                color="red"
                @click="onAction(message.id, 'removeCompletely')"
              />
            </template>
          </div>
        </q-item-section>
      </q-item>

      <q-separator size="2px" />
    </q-list>
  </div>
  <div v-else class="col-12 col-md-2 no-messages-error">
    <div class="col-12 col-md-2 no-messages-error">
      <p class="no-message-dude">┐(‘～`)┌</p>
      <p class="no-message-label">No messages.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModalType } from "@/pages/managePanel/ContactMessages.vue";
import type { AllContactMessages } from "src/stores/contactMessages";

defineProps<{
  messages: AllContactMessages[];
  tabName: string;
  getIcon: (topic: string | null) => string;
}>();

const emit = defineEmits<{
  (e: "openMessage", id: number): void;
  (e: "action", id: number, type: ModalType): void;
}>();

function onOpenMessage(id: number) {
  emit("openMessage", id);
}

function onAction(id: number, type: ModalType) {
  emit("action", id, type);
}
</script>

<style scoped>
.no-messages-error {
  text-align: center;
  margin-top: 1%;
}

.no-message-dude {
  font-size: 3rem;
}

.no-message-label {
  font-size: 2rem;
}
</style>
