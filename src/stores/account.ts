import { defineStore } from "pinia";
import http from "@/services/http";
import type { Account } from "@/types/account";

export const useAccountStore = defineStore("account", {
  state: () => ({
    // @ts-ignore
    account: JSON.parse(sessionStorage.getItem("account")) || ({} as Account),
  }),
  actions: {
    async fetchAccount() {
      const { data } = await http.get("/account");
      this.account = data;
      // store data in sessionStorage
      sessionStorage.setItem("account", JSON.stringify(this.account));
    },
  },
  getters: {
    getAccount: (state) => state.account,
  },
});
