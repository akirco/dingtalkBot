import { defineStore } from "pinia";
export const useLogInfoStore = defineStore({
  id: "logInfo",
  state: () => ({
    login: false,
  }),
  getters: {
    loginProp: (state) => state.login,
  },
  actions: {},
});
