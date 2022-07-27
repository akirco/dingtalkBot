<script setup lang="ts">
import { PaperClipIcon } from "@heroicons/vue/solid";
import { useUserStore } from "@/stores/loginInfo";
const user = useUserStore();

const { isLogin, LoginInfo } = storeToRefs(user);

function submit(e: Event) {
  e.preventDefault();
  user.login(LoginInfo.value);
}
function logout(e: Event) {
  e.preventDefault();
  user.logout();
  isLogin.value = false;
}


onBeforeMount(() => {
  console.log("挂载前");
  const TOKEN = localStorage.getItem("token");
  if (TOKEN) {
    console.log("已登录");
    isLogin.value = true;
  } else {
    isLogin.value = false;
  }
});
onBeforeUnmount(() => {
  console.log("卸载前");
});
</script>
<template>
  <div class="dark:bg-gray-800">
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              用户信息
            </h3>
            <p class="mt-1 text-sm text-gray-600">信息列表</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form method="POST">
            <!-- 用户登陆 -->
            <div v-if="!isLogin" class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6 dark:bg-slate-800">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6">
                    <label class="block text-sm font-medium text-gray-700"
                      >用户名：</label
                    >
                    <input
                      v-model="LoginInfo.uname"
                      type="text"
                      class="border-gray-200 border-2 rounded-lg py-2 px-8 dark:bg-slate-600"
                    />
                  </div>
                  <div class="col-span-6">
                    <label class="block text-sm font-medium text-gray-700"
                      >密码：</label
                    >
                    <input
                      type="text"
                      v-model="LoginInfo.pwd"
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
                  Login
                </button>
              </div>
            </div>
            <!-- 用户信息 -->
            <div v-else="!isLogin" class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6 dark:bg-slate-800">
                <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    User Information
                  </h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    Personal details.
                  </p>
                </div>
                <div class="border-t border-gray-200 dark:border-gray-700">
                  <dl>
                    <div
                      class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 dark:bg-slate-700"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        User Name
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <!-- 用pina存储数据在登陆完成之后 -->
                        {{ LoginInfo.uname }}
                      </dd>
                    </div>
                    <div
                      class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 dark:bg-slate-700"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        is admin
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        {{ (LoginInfo.isAdmin as unknown) as number ===1 ?"Yes":"No" }}
                      </dd>
                    </div>
                    <div
                      class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 dark:bg-slate-700"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Complete tasks
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        暂时不实现
                      </dd>
                    </div>
                    <div
                      class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 dark:bg-slate-700"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Current tasks
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        暂时不实现
                      </dd>
                    </div>

                    <div
                      class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 dark:bg-slate-700"
                    >
                      <dt class="text-sm font-medium text-gray-500">Help</dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <ul
                          role="list"
                          class="border border-gray-200 rounded-md divide-y divide-gray-200"
                        >
                          <li
                            class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                          >
                            <div class="w-0 flex-1 flex items-center">
                              <PaperClipIcon
                                class="flex-shrink-0 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span class="ml-2 flex-1 w-0 truncate">
                                email: earlfx@163.com
                              </span>
                            </div>
                          </li>
                          <li
                            class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                          >
                            <div class="w-0 flex-1 flex items-center">
                              <PaperClipIcon
                                class="flex-shrink-0 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span class="ml-2 flex-1 w-0 truncate">
                                wechat: SFMorin
                              </span>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div
                class="px-4 py-3 bg-gray-50 text-right sm:px-6 dark:bg-slate-800"
              >
                <button
                  type="submit"
                  @click="logout"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
