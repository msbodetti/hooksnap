import { defineStore } from "pinia";
import http from "@/services/http";
import type { Profile } from "@/types/profiles";

export const useProfileStore = defineStore("profiles", {
  state: () => ({
    profiles:
      // @ts-ignore
      JSON.parse(sessionStorage.getItem("profiles")) || ([] as Profile[]),
    profile: {} as Profile,
  }),
  actions: {
    async fetchProfiles() {
      const { data } = await http.get("/api/v1/profiles");
      this.profiles = data.profiles;

      // store data in sessionStorage
      sessionStorage.setItem("profiles", JSON.stringify(this.profiles));
    },
    async fetchProfile(profileId: number) {
      const { data } = await http.get(`/api/v1/profile/${profileId}`);
      this.profile = data;
    },
  },
  getters: {
    getProfiles: (state) => state.profiles,
    getProfile: (state) => state.profile,
  },
});
