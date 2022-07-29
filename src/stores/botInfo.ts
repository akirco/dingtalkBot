import { defineStore } from "pinia";
import Request from "@/api/request";
import type { Ref } from "vue";
const request = new Request();

interface BotInfo {
  botId?: any;
  uid: any;
  baseUrl?: string;
  accessToken: string;
  secret: string;
}

interface JobsInfo {
  id: any;
  uid: any;
  botId: any;
  remark: string;
  complete: any;
  created: string;
  updated: string;
  img1: string;
  img2: string;
  img3: string;
  txt1: string;
  txt2: string;
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
    let jobs: Ref<Array<JobsInfo>> = ref([]);

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
    async function queryJobsByNoCompleted(uid: string) {
      const result = await request.get("/jobs/queryTasks", { params: { uid } });
      if (result.code === 200) {
        jobs.value = result.data;
      }
    }
    return {
      bot,
      jobs,
      botInfo,
      addBot,
      queryJobsByNoCompleted,
    };
  },
  {
    persist: {
      key: "bot",
      storage: window.sessionStorage,
      paths: ["bot", "jobs"],
    },
  }
);
