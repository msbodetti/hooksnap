import { defineStore } from "pinia";
import http from "@/services/http";
import type { Profile } from "@/types/profiles";

export const useFavouritesStore = defineStore("favourites", {
  state: () => ({
    // @ts-ignore
    favourites: JSON.parse(sessionStorage.getItem("favourites")) || [],
    favouriteProfiles:
      // @ts-ignore
      JSON.parse(sessionStorage.getItem("favouriteProfiles")) ||
      ([] as Profile[]),
  }),
  actions: {
    async fetchFavourites() {
      const { data } = await http.get("/api/v1/favorites");
      this.favourites = data.favorites["123456"];
      // store data in sessionStorage
      sessionStorage.setItem("favourites", JSON.stringify(this.favourites));
    },
    async fetchFavouriteProfiles() {
      if (this.favourites.length > 0) {
        for (let i = 0; i < this.favourites.length; i++) {
          const profileId = this.favourites[i];
          const { data } = await http.get(`/api/v1/profile/${profileId}`);
          if (
            !this.favouriteProfiles.some(
              (profile: Profile) => profile.id === data.id
            )
          )
            this.favouriteProfiles.push(data);
        }
        sessionStorage.setItem(
          "favouriteProfiles",
          JSON.stringify(this.favouriteProfiles)
        );
      }
    },
    async addFavourite(profileId: number) {
      const response = await http.post("/api/v1/favorites", {
        profileId,
      });
      if (response.status === 200) {
        // @ts-ignore
        this.favourites.push(profileId);
        sessionStorage.setItem("favourites", JSON.stringify(this.favourites));
      }
    },
    async removeFavourite(profileId: number) {
      const response = await http.delete(`/api/v1/favorites/${profileId}`);
      //check if response is 200
      if (response.status === 200) {
        this.favourites = this.favourites.filter(
          (id: number) => id !== profileId
        );
        sessionStorage.setItem("favourites", JSON.stringify(this.favourites));
      }
    },
  },
  getters: {
    getFavourites: (state) => state.favourites,
    getFavouriteProfiles: (state) => state.favouriteProfiles,
  },
});
