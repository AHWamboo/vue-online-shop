<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="col-12 col-md-2">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="all" label="All messages" icon="mail">
          <q-badge color="orange" floating>{{ store.active.length }}</q-badge>
        </q-tab>
        <q-tab name="done" label="Done" icon="done">
          <q-badge color="green" floating>{{ store.done.length }}</q-badge>
        </q-tab>
        <q-tab name="removed" label="Removed" icon="delete">
          <q-badge color="red" floating>{{ store.removed.length }}</q-badge>
        </q-tab>
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="all">
          <contact-messages-list
            :messages="pagedMessages"
            tab-name="all"
            :get-icon="getContactIcon"
            @open-message="openMessageModal"
            @action="openModal"
          />
        </q-tab-panel>

        <q-tab-panel name="done">
          <contact-messages-list
            :messages="pagedMessages"
            tab-name="done"
            :get-icon="getContactIcon"
            @open-message="openMessageModal"
            @action="openModal"
          />
        </q-tab-panel>

        <q-tab-panel name="removed">
          <contact-messages-list
            :messages="pagedMessages"
            tab-name="removed"
            :get-icon="getContactIcon"
            @open-message="openMessageModal"
            @action="openModal"
          />
        </q-tab-panel>
      </q-tab-panels>

      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-if="pagedMessages.length !== 0"
          v-model="page"
          color="black"
          :max="totalPages"
          :max-pages="5"
          :boundary-numbers="false"
        />
      </div>
    </div>

    <MessageModal
      v-model="moveToInboxModal"
      icon="move_to_inbox"
      color="black"
      label="Are you sure you want to move message to inbox?"
      submit-button-label="Move"
      submit-button-color="red"
      @submit="moveToInbox()"
    >
    </MessageModal>

    <MessageModal
      v-model="removeModal"
      icon="delete"
      color="red"
      label="Are you sure you want to remove the selected message?"
      submit-button-label="Remove"
      submit-button-color="red"
      @submit="markAsRemoved()"
    >
    </MessageModal>

    <MessageModal
      v-model="removeCompletely"
      icon="delete_forever"
      color="red"
      label="Are you sure you want to remove completely the selected message?"
      submit-button-label="Remove"
      submit-button-color="red"
      @submit="removeMessage()"
    >
    </MessageModal>

    <MessageModal
      v-model="doneModal"
      icon="done"
      color="green"
      label="Are you sure you want to mark the message as done?"
      submit-button-label="Done"
      submit-button-color="green"
      @submit="markAsDone()"
    >
    </MessageModal>

    <MessageModal
      v-model="removeDoneModal"
      icon="remove_done"
      color="orange"
      label="Are you sure you want to remove done status for this message?"
      submit-button-label="Remove"
      submit-button-color="orange"
      @submit="removeDone()"
    >
    </MessageModal>

    <q-dialog v-model="messageModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ messageModalBody?.topic }}</div>
        </q-card-section>

        <q-separator />

        <q-list>
          <q-card-section style="max-height: 50vh" class="scroll">
            <q-item-label class="text-bold">Name: </q-item-label>
            <q-item>{{ messageModalBody?.name }}</q-item>

            <q-item-label class="text-bold">E-mail: </q-item-label>
            <q-item>{{ messageModalBody?.email }}</q-item>

            <q-item-label class="text-bold">Message: </q-item-label>
            <q-item>{{ messageModalBody?.message }}</q-item>
          </q-card-section>

          <q-separator />
        </q-list>
        <q-card-actions align="right">
          <q-btn v-close-popup flat label="Cancel" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import type { ContactMessage } from "src/stores/contactMessages";
import {
  contactMessagesStore,
  MessageStatus,
} from "src/stores/contactMessages";
import { computed, onMounted, ref, watch } from "vue";
import MessageModal from "../../components/modals/MessageModal.vue";
import ContactMessagesList from "../../components/managePanel/ContactMessagesList/ContactMessagesList.vue";

export type ModalType = // trash bs - move these types to separate files
  "remove" | "done" | "removeDone" | "removeCompletely" | "moveToInbox";

const $q = useQuasar();
const store = contactMessagesStore();
const removeModal = ref(false);
const doneModal = ref(false);
const removeDoneModal = ref(false);
const removeCompletely = ref(false);
const moveToInboxModal = ref(false);
const messageModal = ref(false);
const tab = ref<"all" | "done" | "removed">("all");
const messageModalBody = ref<ContactMessage | undefined>();
const page = ref(1);
const pageSize = ref(10);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(currentList.value.length / pageSize.value))
);

const currentList = computed(() => {
  if (tab.value === "done") return store.done;
  if (tab.value === "removed") return store.removed;
  return store.active;
});

const pagedMessages = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return currentList.value.slice(start, start + pageSize.value);
});

watch([tab, () => currentList.value.length], () => {
  page.value = 1;
});

function openModal(id: number, type: ModalType) {
  store.messageId = id;

  switch (type) {
    case "remove":
      removeModal.value = true;
      break;
    case "done":
      doneModal.value = true;
      break;
    case "removeDone":
      removeDoneModal.value = true;
      break;
    case "moveToInbox":
      moveToInboxModal.value = true;
      break;
    case "removeCompletely":
      removeCompletely.value = true;
      break;
  }
}

async function markAsDone() {
  if (!store.messageId) return;

  const updated = await store.markDone(store.messageId);

  doneModal.value = false;
  store.messageId = null;

  $q.notify({
    color: updated ? "green-4" : "red-5",
    textColor: "white",
    icon: updated ? "cloud_done" : "warning",
    message: updated ? "Marked as done." : "There was a problem.",
  });
}

async function removeDone() {
  if (!store.messageId) return;

  const updated = await store.markDone(store.messageId, MessageStatus.active);

  removeDoneModal.value = false;
  store.messageId = null;

  $q.notify({
    color: updated ? "green-4" : "red-5",
    textColor: "white",
    icon: updated ? "cloud_done" : "warning",
    message: updated ? "Removed 'Done' status." : "There was a problem.",
  });
}

async function markAsRemoved() {
  if (!store.messageId) return;

  const removed = await store.markRemoved(store.messageId);

  removeModal.value = false;
  store.messageId = null;

  $q.notify({
    color: removed ? "green-4" : "red-5",
    textColor: "white",
    icon: removed ? "cloud_done" : "warning",
    message: removed ? "Marked as removed." : "There was a problem.",
  });
}

async function moveToInbox() {
  if (!store.messageId) return;

  const removed = await store.markRemoved(
    store.messageId,
    MessageStatus.active
  );

  moveToInboxModal.value = false;
  store.messageId = null;

  $q.notify({
    color: removed ? "green-4" : "red-5",
    textColor: "white",
    icon: removed ? "cloud_done" : "warning",
    message: removed ? "Message moved to inbox." : "There was a problem.",
  });
}

async function removeMessage() {
  if (!store.messageId) return;

  const removed = await store.removeContactMessage(store.messageId);

  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: removed ? "cloud_done" : "warning",
    message: removed
      ? "The message has been removed completely."
      : "There was a problem.",
  });
}

function openMessageModal(id: number) {
  messageModal.value = true;
  const message = store.items.find((m) => m.id === id);

  if (message) {
    messageModalBody.value = {
      topic: message?.topic,
      email: message.email,
      name: message.name,
      message: message.message,
    };
  }
}

function getContactIcon(iconName: string | null): string {
  switch (iconName) {
    case "Item question":
      return "forum";
    case "Client support message":
      return "support";
    case "Other":
      return "question_mark";
    default:
      return "help"; // trash bs -  add help support as an undefined icon
  }
}

onMounted(async () => {
  await store.getContactMessages();
});

watch(totalPages, () => {
  if (page.value > totalPages.value) {
    page.value = totalPages.value;
  }
});
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
