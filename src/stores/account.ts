import { defineStore } from "pinia";
import http from "@/services/http";

export const useAccountStore = defineStore("account", {
  state: () => ({
    account: [],
  }),
  actions: {
    async fetchAccount() {
        const { data } = await http.get("/api/v1/account");
        this.account = data;
        // store data in sessionStorage
        sessionStorage.setItem("account", JSON.stringify(this.account));
    },
  },
  getters: {
    getAccount: (state) => state.account,
  },
});
