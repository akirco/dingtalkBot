import { defineStore } from "pinia";
import Request from "@/api/request";
const requset = new Request();

interface botInfo {}

export const useUserStore = defineStore(
  "user",
  () => {
    const isLogin = ref(false);
    let BotInfo: botInfo = reactive({});

    return {};
  },
  {
    persist: true,
  }
);
