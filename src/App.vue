<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import IconMoon from "./components/icons/IconMoon.vue";
const toogleTheme = () => {
  const body = document.querySelector("html");
  body?.classList.toggle("dark");
};
</script>

<template>
  <nav class="bg-indigo-900 top-0 sticky">
    <div class="m-auto flex items-center w-auto">
      <img
        src="@/assets/feather.png"
        alt="dingTalkBot"
        class="w-[50px] h-[50px]"
      />
      <RouterLink to="/" class="hover:text-orange-800">Home</RouterLink>
      <RouterLink to="/about" class="hover:text-orange-800">Link</RouterLink>
      <RouterLink to="/about" class="hover:text-orange-800">About</RouterLink>
    </div>
    <div class="w-auto flex items-center">
      <RouterLink
        to="/login"
        class="h-[40px] block leading-10 hover:ring rounded"
        >Login</RouterLink
      >
      <RouterLink to="/register" class="h-[40px] block leading-10 text-gray-600"
        >Register</RouterLink
      >
      <IconMoon
        class="h-[24px] w-[24px] leading-6 mr-5 ml-5 cursor-pointer"
        @click="toogleTheme"
      />
    </div>
  </nav>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
</style>
