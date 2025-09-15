import { supabase } from "src/api/supabase";
import { defineStore, acceptHMRUpdate } from "pinia";

export enum MessageStatus {
  active = "active",
  done = "done",
  removed = "removed",
}

export type ContactMessage = {
  topic: string | null;
  name: string | null;
  email: string | null;
  message: string | null;
  accept?: boolean;
  status?: MessageStatus;
};

export type AllContactMessages = ContactMessage & {
  id: number;
};

export const contactMessagesStore = defineStore("contactMessages", {
  state: () => ({
    items: [] as AllContactMessages[],
    messageId: null as number | null,
  }),
  getters: {
    active: (state) =>
      state.items.filter(
        (item: ContactMessage) => item.status === MessageStatus.active
      ),
    done: (state) =>
      state.items.filter(
        (item: ContactMessage) => item.status === MessageStatus.done
      ),
    removed: (state) =>
      state.items.filter(
        (item: ContactMessage) => item.status === MessageStatus.removed
      ),
  },
  actions: {
    addContactMessage: async ({
      topic,
      name,
      email,
      message,
      accept,
    }: ContactMessage) => {
      const { data, error } = await supabase
        .from("contact_messages")
        .insert([
          {
            topic: topic,
            name: name,
            email: email,
            message: message,
            accept: accept,
            status: MessageStatus.active,
          },
        ])
        .select();

      if (error) {
        console.warn(
          `Error in "addContactMessage" function, details: ${error.details}`
        );
        return null;
      }

      // TODO: trash bs - see if I should also update items from the store here
      // if (data?.length) this.items.unshift(data[0] as AllContactMessages);
      // return data?.[0] ?? null;

      return data;
    },
    async getContactMessages() {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.warn(
          `Error in "getContactMessages" function, details: ${error.details}`
        );
        return null;
      }

      this.items = (data ?? []) as AllContactMessages[];
      return this.items;
    },
    async markDone(
      id: number | null,
      status: MessageStatus = MessageStatus.done
    ) {
      const { data, error } = await supabase
        .from("contact_messages")
        .update({ status })
        .eq("id", id)
        .select();

      if (error) {
        console.warn(`Error in "markDone": ${error.details}`);
        return null;
      }

      const [message] = data;
      const updated = message as AllContactMessages | undefined;

      if (updated) {
        const messageId = this.items.findIndex((message) => message.id === id);
        if (messageId !== -1) {
          this.items[messageId] = updated;
        }
      }

      return updated;
    },
    async markRemoved(
      id: number | null,
      status: MessageStatus = MessageStatus.removed
    ) {
      const { data, error } = await supabase
        .from("contact_messages")
        .update({ status })
        .eq("id", id)
        .select();

      if (error) {
        console.warn(`Error in "markRemoved": ${error.details}`);
        return null;
      }

      const [message] = data;
      const removed = message as AllContactMessages | undefined;

      if (removed) {
        const messageId = this.items.findIndex((message) => message.id === id);
        if (messageId !== -1) {
          this.items[messageId] = removed;
        }
      }

      return removed;
    },
    async removeContactMessage(id: number) {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);

      if (error) {
        console.warn(`Error in "removeContactMessage": ${error.details}`);
        return false;
      }

      this.items = this.items.filter((m) => m.id !== id);
      return true;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(contactMessagesStore, import.meta.hot)
  );
}
