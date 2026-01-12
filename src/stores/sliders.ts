import { supabase } from "src/api/supabase";
import { defineStore, acceptHMRUpdate } from "pinia";

export type Slider = {
  id: string;
  image_url: string;
  title: string;
  description: string;
  link: string;
};

export const useSlidersStore = defineStore("sliders", {
  state: () => ({}),
  getters: {},
  actions: {
    async getSliders(): Promise<Slider[] | null> {
      const { data, error } = await supabase.from("sliders").select("*");
      if (error) {
        console.warn(
          `Error in "getSliders" function, details: ${error.details}.`
        );
        return null;
      }
      const sliders: Slider[] = data;
      return sliders;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSlidersStore, import.meta.hot));
}
