<script setup lang="ts">
import { PaperClipIcon } from "@heroicons/vue/solid";
import { useBotStore } from "@/stores/botInfo";
const botStore = useBotStore();
const { botInfo,botTable } = storeToRefs(botStore);

const submit = (e: Event) => {
  e.preventDefault();
  console.log("submit");
  const uid = localStorage.getItem("uid");
  if (uid) {
    const bot = {
      uid: uid,
      accessToken: botInfo.value.accessToken,
      secret: botInfo.value.secret,
    };
    botStore.addBot(bot);
    botStore.getBotInfo();
  } else {
    ElMessage.warning("Token异常！请重新登录后尝试操作");
  }
};
onBeforeMount(() => {
  botStore.getBotInfo();
});
</script>
<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-6 md:gap-3">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            钉钉机器人
          </h3>
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
                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 dark:bg-gray-900 dark:text-white"
              >
                <dt class="text-sm font-medium text-gray-500">botId</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul
                    role="list"
                    class="border border-gray-200 rounded-md divide-y divide-gray-200"
                  >
                    <li
                      class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                      v-for="i in 3"
                    >
                      <div class="w-0 flex-1 flex items-center">
                        <PaperClipIcon
                          class="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span class="ml-2 flex-1 w-0 truncate"> 1 </span>
                      </div>
                      <div class="ml-4 flex-shrink-0">
                        <a
                          href="#"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          详情
                        </a>
                        <a
                          href="#"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          编辑
                        </a>
                        <a
                          href="#"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          删除
                        </a>
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
  </div>
</template>
