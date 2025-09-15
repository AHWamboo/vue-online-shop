import type { User } from "@supabase/supabase-js";
import { defineStore } from "pinia";
import { supabase } from "src/api/supabase";

type AuthUser = User | null;

export type UserProfile = {
  // trash bs - add it to getUser function as a return type and to consts
  id: string;
  updated_at: string;
  username: string;
  full_name: string;
  avatar_url: string;
  website: string;
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as AuthUser,
  }),

  actions: {
    setUser(user: AuthUser) {
      this.user = user;
    },

    async getSession() {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        this.setUser(data.session.user);
      }
      return data?.session;
    },

    async signOut() {
      await supabase.auth.signOut();
      this.user = null;
    },

    async getUser(): Promise<UserProfile | null> {
      // trash bs - this one should be in getters: {}
      const userId = (await this.getSession())?.user.id; // trash bs - handle errors here

      const { data: dataProfile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.warn(`Error in "getUser" function, details: ${error.details}`);
        return null;
      }

      const userProfile: UserProfile = dataProfile;
      return userProfile;
    },
  },
});
