import { defineStore } from "pinia";
import Request from "@/api/request";
const requset = new Request();

interface JobsInfo {
  uid: any;
  remark: string;
  img1: string;
  img2: string;
  img3: string;
  txt1: string;
  txt2: string;
}

export const useJobsStore = defineStore("jobs", () => {
  let jobsInfo: JobsInfo = reactive({
    uid: null,
    remark: "",
    img1: "",
    img2: "",
    img3: "",
    txt1: "",
    txt2: "",
  });
  async function insertJobs(jobInfo: JobsInfo) {
    const result = await requset.post("/jobs/insert", jobInfo);
    if (result.code === 200) {
      ElMessage.success("新增任务完成！去绑定机器人吧！");
    }
  }

  return {
    jobsInfo,
    insertJobs,
  };
});
