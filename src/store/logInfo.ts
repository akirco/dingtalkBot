import { defineStore } from "pinia";
export const useLogInfoStore = defineStore({
  id: "logInfo",
  state: () => ({
    login: false,
    token: "",
  }),
  getters: {
    loginProp: (state) => state.login,
  },
  actions: {
    setToken(){
      localStorage.setItem("token",this.token)
    }
  },
});
