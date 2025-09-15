import { defineStore, acceptHMRUpdate } from "pinia";
import { supabase } from "src/api/supabase";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  short_description: string;
  image_url: string;
  product_categories: { name: string }[];
  product_sub_categories: { name: string }[];
};

// trash bs - merge these two types Product and NewProduct, adding product_categories: { name: string }[]; and product_sub_categories: { name: string }[]; as a separate type and extend
export type NewProduct = {
  name: string;
  price: number;
  description: string;
  short_description: string;
  image_url: string;
  product_category: number;
  product_sub_category: number;
};

export type ProductByCategory = {
  id: number;
  image: string;
  name: string;
  price: number;
  attributes: { name: string; value: string }[];
};

export const useProductsStore = defineStore("products", {
  state: () => ({}),
  getters: {
    getAllProductCategories: async () => {
      const { data: productCategories, error } = await supabase
        .from("product_categories")
        .select("id, name");

      if (error) {
        console.warn(
          `Error in "getAllProductCategories" function, details: ${error.details}`
        );
        return null;
      }

      const response: {
        name: string;
      }[] = productCategories;

      const categoriesNames = response.map((item) => item.name); // trash bs - zobacz czy tego gdzies uzywasz?
      const categories = productCategories as { id: number; name: string }[];
      return { categoriesNames, categories };
    },
    getAllProducts: async () => {
      const { data: products, error } = await supabase.from("products").select(
        `
          id,
          name, 
          price, 
          description, 
          short_description, 
          image_url, 
          product_categories(name),
          product_sub_categories(name)
        `
      );

      if (error) {
        console.warn(
          `Error in "getAllProducts" function, details: ${error.details}`
        );
        return null;
      }

      const product: Product[] = products;
      return product;
    },
    getProductById: () => {
      return async (id: number) => {
        // trash bs - whether according to the fact that getter cannot be async, it should be here or in actions
        const { data: products, error } = await supabase
          .from("products")
          .select(
            `
              id,
              name, 
              price, 
              description,  
              short_description, 
              image_url, 
              product_categories(name),
              product_sub_categories(name)
            `
          )
          .eq("id", id)
          .single();

        if (error) {
          console.warn(
            `Error in "getProductById" function, details: ${error.details}`
          );
          return null;
        }

        const product: Product = products;
        return product;
      };
    },
  },
  actions: {
    addProduct: async (productDetails: NewProduct) => {
      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            name: productDetails.name,
            price: productDetails.price,
            description: productDetails.description,
            short_description: productDetails.short_description,
            image_url: productDetails.image_url,
            category_id: productDetails.product_category,
            sub_category_id: productDetails.product_sub_category,
          },
        ])
        .select();

      if (error) {
        console.warn(`Error in "addProduct" function, details: ${error.hint}`);
        return null;
      }

      const product = data; // trash bs - use type NewProduct or another
      return product;
    },
    getSubCategories: async (id: number) => {
      const { data: subCategories, error } = await supabase
        .from("product_sub_categories")
        .select("id, name")
        .eq("category_id", id);

      if (error) {
        console.warn(
          `Error in "getAllProductSubCategories" function, details: ${error.details}`
        );
        return null;
      }

      const categories = subCategories as { id: number; name: string }[];
      return categories;
    },
    getProductCategoriesTree: async () => {
      const { data, error } = await supabase.from("product_categories").select(`
        id,
        name,
        product_sub_categories (
          id,
          name
        )
        `);

      if (error) {
        console.warn(
          `Error in "getProductCategoriesTree" function, details: ${error.details}`
        );
        return null;
      }

      const productCategories = data.map((category) => ({
        categoryId: category.id,
        categoryName: category.name.toLowerCase(),
        subCategories: category.product_sub_categories.map((sub) => ({
          id: sub.id,
          name: sub.name.toLowerCase(),
        })),
      }));

      return productCategories;
    },
    getProductByCategory: async (
      category: string
    ): Promise<ProductByCategory[]> => {
      const { data, error } = await supabase.rpc(
        "get_products_by_category_with_attributes",
        {
          name_param: category,
        }
      );

      console.log("w getProductByCategory data");
      console.log(data);

      if (error) {
        console.warn(
          `Error in "getProductByCategory" function, details: ${error.details}`
        );
        return [];
      }

      return data;
    },
    // removeProduct: async (id: number) => { // trash bs - TODO
    //   const { error } = await supabase
    //     .from("contact_messages")
    //     .delete()
    //     .eq("id", id);

    //   if (error) {
    //     console.warn(`Error in "removeContactMessage": ${error.details}`);
    //     return false;
    //   }

    //   this.items = this.items.filter((m) => m.id !== id);
    //   return true;
    // },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductsStore, import.meta.hot));
}
