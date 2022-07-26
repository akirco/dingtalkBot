<script setup lang="ts">
const submit = (e: Event) => {
  e.preventDefault();
  console.log("submit");
};
</script>
<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            钉钉机器人
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            请认真填写钉钉机器人信息，以便您的钉钉机器人能够正常工作。
          </p>
        </div>
        <div class="h-[400px]"></div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6 dark:bg-slate-800">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700"
                    >Secret</label
                  >
                  <input
                    type="text"
                    class="border-gray-200 border-2 rounded-lg py-2 px-8 dark:bg-slate-600"
                  />
                </div>
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700"
                    >WebHook</label
                  >
                  <input
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
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
