import { supabase } from "src/api/supabase";
import { defineStore, acceptHMRUpdate } from "pinia";

export type VatRate = {
  id: number;
  name: string;
  tax_rate: number;
};

export const useVatRatesStore = defineStore("vatRates", {
  state: () => ({}),
  getters: {},
  actions: {
    async getVatRates(): Promise<VatRate[] | null> {
      const { data, error } = await supabase.from("vat_rates").select("*");
      if (error) {
        console.warn(
          `Error in "getVatRates" function, details: ${error.details}`
        );
        return null;
      }
      const vatRates: VatRate[] = data;
      return vatRates;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVatRatesStore, import.meta.hot));
}
