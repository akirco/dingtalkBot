<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useLogInfoStore } from "@/store/logInfo";
import IconMoon from "@/components/icons/IconMoon.vue";
import feather from '@/assets/img/feather.png'

const toogleTheme = () => {
  const body = document.querySelector("html");
  body?.classList.toggle("dark");
};
const login = () => {
  console.log("Logging in...");
  const loginStore = useLogInfoStore();
  loginStore.login = true;
};

const register = () => {
  console.log("register...");
};
</script>
<template>
  <nav class="bg-gray-900 sticky z-99999 top-0">
    <div class="m-auto flex items-center w-auto">
      <img
        :src="feather"
        alt="dingTalkBot"
        class="w-[50px] h-[50px]"
      />
      <RouterLink to="/" class="hover:text-orange-800">Home</RouterLink>
      <RouterLink to="/link" class="hover:text-orange-800">Link</RouterLink>
      <RouterLink to="/about" class="hover:text-orange-800">About</RouterLink>
    </div>
    <div class="w-auto flex items-center" id="right-nav">
      <span
        @click="login"
        class="h-[40px] block leading-10 cursor-pointer hover:ring rounded"
        >Login</span
      >
      <span
        @click="register"
        class="h-[40px] block leading-10 text-gray-600 cursor-pointer"
        >Register</span
      >
      <IconMoon
        class="h-[24px] w-[24px] leading-6 mr-5 ml-5 cursor-pointer"
        @click="toogleTheme"
      />
    </div>
  </nav>
</template>
<style scoped></style>
