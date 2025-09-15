import { defineStore } from "pinia";
import { supabase } from "src/api/supabase";

export type AllAttributes = { name: string; selected: string[] }[];

export const useCategoryStore = defineStore("category", {
  actions: {
    getCategoryTreeByName: async (name: string) => {
      const { data, error } = await supabase.rpc(
        "get_category_tree_with_attributes",
        {
          name_param: name,
        }
      );

      if (error) {
        console.warn(
          `Error in "getItemTreeById" function, details: ${error.details}`
        );
        return null;
      }

      const categoryTree = data;

      console.log("categoryTree");
      console.log(categoryTree);

      const allAttributes: AllAttributes = categoryTree.attributes.flatMap(
        (attr: { id: number; name: string; values: string[] }) =>
          attr.values.map((value: string) => ({
            name: value,
            selected: false,
          }))
      );

      console.log("allAttributes");
      console.log(allAttributes);

      return { categoryTree, allAttributes };
    },
  },
});
