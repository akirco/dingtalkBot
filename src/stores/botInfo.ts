import { defineStore } from "pinia";
import Request from "@/api/request";
const requset = new Request();

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
    let botTable: any[] = reactive([]);

    async function addBot({ uid, accessToken, secret }: BotInfo) {
      if (uid && accessToken && secret) {
        const botInfo = await requset.post("/bot/insert", {
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
    async function getBotInfo() {
      const uid = localStorage.getItem("uid");
      const botDetails = await requset.get("/bot/query", { params: { uid } });
      console.log("botDetails:", botDetails.data);
      botTable.push(botDetails.data);
    }
    return {
      botInfo,
      botTable,
      addBot,
      getBotInfo,
    };
  });
