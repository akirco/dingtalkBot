import { defineStore } from "pinia";
import Request from "@/api/request";
const request = new Request();

interface BotInfo {
  botId?: any;
  uid: any;
  baseUrl?: string;
  accessToken: string;
  secret: string;
}

export const useBotStore = defineStore(
  "bot",
  () => {
    let botInfo: BotInfo = reactive({
      uid: "",
      accessToken: "",
      secret: "",
    });
    let bot = reactive({
      list: [] as any[],
    });

    async function addBot({ uid, accessToken, secret }: BotInfo) {
      if (uid && accessToken && secret) {
        const botInfo = await request.post("/bot/insert", {
          uid,
          accessToken,
          secret,
        });
        if ((botInfo as any).code !== 200) {
          ElMessage.error("请检查数据合法性");
        }
        ElMessage.success("添加成功！");
      } else {
        ElMessage.error("不能添加空数据！");
      }
    }
    return {
      botInfo,
      addBot,
      bot,
    };
  },
  {
    persist: {
      key: "bot",
      storage: window.sessionStorage,
      paths: ["bot"],
    },
  }
);
