import { defineStore } from "pinia";
import {ElMessage} from "element-plus";
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
      const userInfo = await requset.post("/user/login", { uname, pwd });
      if (userInfo.code === 500) {
        ElMessage.info("服务端异常，请联系开发者！");
      } else if (userInfo.code === 404) {
        ElMessage.warning("用户名或密码为空！");
      } else {
        localStorage.setItem("token", userInfo.data.token as string);
        localStorage.setItem("uid", userInfo.data.data.uid);
        ElMessage.success("登录成功!");
        isLogin.value = true;
        LoginInfo.uid = userInfo.data.data.uid;
        LoginInfo.isAdmin = userInfo.data.data.isAdmin;
      }
    }
    function logout() {
      localStorage.clear();
      sessionStorage.clear();
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
    persist: {
      key: "user",
      storage: window.sessionStorage,
      paths: ["LoginInfo.uname", "LoginInfo.isAdmin"],
    },
  }
);
