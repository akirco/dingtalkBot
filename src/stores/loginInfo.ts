import { defineStore } from "pinia";
import Request from "@/api/request";
const requset = new Request();

interface userInfo {
  uid?: string;
  uname: string;
  pwd: string;
  isAdmin?: string;
}

export const useUserStore = defineStore(
  "user",
  () => {
    const isLogin = ref(false);
    let LoginInfo: userInfo = reactive({
      uid: "",
      uname: "",
      pwd: "",
      isAdmin: "",
    });

    async function login({ uname, pwd }: userInfo) {
      try {
        const userInfo = await requset.post("/user/login", { uname, pwd });
        localStorage.setItem("token", userInfo.data.token as string);
        ElMessage.success("登录成功!");
        isLogin.value = true;
        LoginInfo.uid = userInfo.data.data.uid;
        LoginInfo.isAdmin = userInfo.data.data.isAdmin;
      } catch (error) {
        ElMessage.error("请检查用户名或密码是否正确！");
      }
    }
    function logout() {
      localStorage.clear();
      ElMessage.success("登出成功！");
    }
    return {
      login,
      isLogin,
      LoginInfo,
      logout,
    };
  },
  {
    persist: true,
  }
);
