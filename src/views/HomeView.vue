<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { ref } from "vue";
const categories = ref(["UploadFile", "Settings", "Personal"]);

</script>
<template>
  <main class="w-full max-w-[1000px] top-20 left-0 right-0 m-auto fixed">
    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab
          v-for="category in categories"
          as="template"
          :key="category"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow dark:bg-slate-700 dark:text-white dark:ring-slate-600  dark:ring-offset-indigo-900'
                : 'text-gray-800 hover:bg-white/[0.12] hover:text-white dark:bg-slate-900 ',
            ]"
          >
            {{ category }}
          </button>
        </Tab>
      </TabList>
      <TabPanels class="mt-5">
        <TabPanel
          :class="[
            'rounded-xl bg-white p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ring-2  dark:bg-slate-800 dark:ring-black dark:ring-offset-slate-900',
          ]"
        >
          <KeepAlive include="file">
            <UploadFile name="file" />
          </KeepAlive>
        </TabPanel>
        <TabPanel
          :class="[
            'rounded-xl bg-white p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ring-2 dark:bg-slate-800 dark:ring-black dark:ring-offset-slate-900',
          ]"
        >
          <KeepAlive include="settings">
            <SettingsInfo name="settings" />
          </KeepAlive>
        </TabPanel>
        <TabPanel
          :class="[
            'rounded-xl bg-white p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ring-2 dark:bg-slate-800 dark:ring-black dark:ring-offset-slate-900',
          ]"
        >
          <KeepAlive include="info">
            <UserInfo name="info" />
          </KeepAlive>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </main>
</template>

<style scoped>
main {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
</style>
