<script setup lang="ts">
import { LightningBoltIcon } from "@heroicons/vue/solid";
import { useBotStore } from "@/stores/botInfo";
import Request from "@/api/request";
import dateFormate from "@/utils/dateFormate";
import getAccessToken from "@/utils/getAccessToken";
import type { FormInstance } from "element-plus";

const botStore = useBotStore();
const { botInfo, bot, jobs } = storeToRefs(botStore);
const request = new Request();
const dialogFormVisible = ref(false);
const dialogTableVisible = ref(false);
const jobsForm = reactive({
  jobId: "",
  botId: "",
});
const gridData: any = ref([]);
const formRef = ref<FormInstance>();

const submit = (e: Event) => {
  e.preventDefault();
  const uid = localStorage.getItem("uid");
  if (uid) {
    const botIn = {
      uid: uid,
      accessToken: getAccessToken(botInfo.value.accessToken),
      secret: botInfo.value.secret,
    };
    botStore.addBot(botIn);
    request.get("/bot/query", { params: { uid } }).then((res) => {
      bot.value.list = res.data;
    });
  } else {
    ElMessage.warning("Token异常！请重新登录后尝试操作");
  }
};

onBeforeMount(() => {
  const uid = localStorage.getItem("uid");
  if (uid) {
    request.get("/bot/query", { params: { uid } }).then((res) => {
      bot.value.list = res.data;
    });
  }
});
// 操作按钮
function handleTasks(botId: string) {
  dialogFormVisible.value = true;
  const uid = localStorage.getItem("uid");
  if (uid) {
    botStore.queryJobsByNoCompleted(uid);
    jobsForm.botId = botId;
  }
}
function handleDatils(botId: number) {
  dialogTableVisible.value = true;
  request.get("/jobs/query", { params: { botId } }).then((res) => {
    for (const item of res.data) {
      const data = {
        botId: item.botId,
        complete: item.complete === 1 ? "Yes" : "No",
        created: dateFormate(item.created, "yyyy-MM-dd HH:mm:ss"),
        img1: item.img1,
        img2: item.img2,
        img3: item.img3,
        txt1: item.txt1,
        txt2: item.txt2,
      };
      gridData.value.push(data);
    }
  });
}
function handleDelete(botId: number) {
  request.delete(`/bot/delete/${botId}`).then((res) => {
    ElMessage.success("删除成功");
  });
  const uid = localStorage.getItem("uid");
  request.get("/bot/query", { params: { uid } }).then((res) => {
    bot.value.list = res.data;
  });
}

function clearData() {
  gridData.value = [];
}

function bindTasks(id: string) {
  const data = {
    botId: jobsForm.botId,
    id: id,
  };
  request.put("/jobs/bindBot", data).then((res) => {
    if (res.code === 200) {
      ElMessage.success("绑定成功！");
    }
  });
}

function resetForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.resetFields();
}
</script>
<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-6 md:gap-3">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            钉钉机器人
          </h3>
          <p>请谨慎操作！</p>
        </div>
        <div class="h-[400px]"></div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-3">
        <div class="shadow overflow-auto sm:rounded-md h-[450px]">
          <!-- start -->

          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Bot Information
            </h3>
          </div>
          <div class="border-gray-200">
            <dl>
              <div
                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6 dark:bg-gray-900 dark:text-white"
              >
                <dt class="text-sm font-medium text-gray-500">BotId</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4">
                  <ul
                    role="list"
                    class="border border-gray-200 rounded-md divide-y divide-gray-200"
                    v-for="(item, index) in bot.list"
                  >
                    <li
                      class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                    >
                      <div class="w-0 flex-1 flex items-center">
                        <LightningBoltIcon
                          class="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span class="ml-1 flex-1 w-0 truncate">
                          {{ item.botId }}号
                        </span>
                      </div>
                      <div class="ml-4 flex-shrink-0 space-x-3">
                        <el-button @click="handleTasks(item.botId)">
                          绑定任务
                        </el-button>
                        <el-button @click="handleDatils(item.botId)">
                          详情
                        </el-button>
                        <el-button @click="handleDelete(item.botId)">
                          删除
                        </el-button>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
          <!-- end -->
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md h-[450px]">
            <div class="px-4 py-5 bg-white sm:p-6 dark:bg-slate-800">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700"
                    >accessToken</label
                  >
                  <input
                    v-model="botInfo.accessToken"
                    type="text"
                    class="border-gray-200 border-2 rounded-lg py-2 px-8 dark:bg-slate-600"
                  />
                </div>
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700"
                    >secret</label
                  >
                  <input
                    v-model="botInfo.secret"
                    type="text"
                    class="border-gray-200 border-2 rounded-lg py-2 px-8 dark:bg-slate-600"
                  />
                </div>
              </div>
            </div>
            <div
              class="px-4 py-3 bg-gray-50 text-right sm:px-6 dark:bg-slate-800"
            >
              <button
                type="submit"
                @click="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      title="bind Jobs"
      @close="resetForm(formRef)"
    >
      <el-form :model="jobsForm" ref="formRef">
        <el-form-item label="Jobs">
          <el-select
            v-model="jobsForm.jobId"
            placeholder="Please select a jobs"
          >
            <el-option
              v-for="item in jobs"
              :label="item.remark"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="
              dialogFormVisible = false;
              bindTasks(jobsForm.jobId);
            "
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogTableVisible"
      title="机器人任务"
      width="50%"
      @close="clearData"
    >
      <el-table :data="gridData">
        <el-table-column property="botId" label="botId" width="200" />
        <el-table-column property="complete" label="完成情况" width="200" />
        <el-table-column property="created" label="创建时间" width="200" />
        <el-table-column property="img1" label="图1" width="200" />
        <el-table-column property="img2" label="图2" width="200" />
        <el-table-column property="img3" label="图3" width="200" />
        <el-table-column property="txt1" label="文1" width="200" />
        <el-table-column property="txt2" label="文2" width="200" />
      </el-table>
    </el-dialog>
  </div>
</template>
