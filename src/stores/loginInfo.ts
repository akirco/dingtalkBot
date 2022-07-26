import { defineStore, acceptHMRUpdate } from "pinia";
import Request from "@/api/request";
const requset = new Request();

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    name: "",
    isLogin: false,
  }),
  actions: {
    logout() {},
    async login(uname: string, pwd: string) {
      const userInfo = await requset.post("/user/login", { uname, pwd });
      console.log("userInfo",userInfo); 
      localStorage.setItem("token",(userInfo.data.token as string))
      this.$patch({
        name: uname,
        ...userInfo,
      });
      ElMessage.success("login success!");
      this.isLogin = true;
    },
  },
});
if (import.meta.hot) {
  console.log("hot", import.meta.hot);
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
