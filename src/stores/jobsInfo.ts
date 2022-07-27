import { defineStore } from "pinia";
import Request from "@/api/request";
const requset = new Request();

interface JobsInfo {}

export const useBotStore = defineStore("jobs", () => {
  let jobsInfo: JobsInfo = reactive({});

  return {
    jobsInfo,
  };
});
