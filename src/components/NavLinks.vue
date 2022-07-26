<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useLogInfoStore } from "@/store/logInfo";
import IconMoon from "@/components/icons/IconMoon.vue";
import feather from "@/assets/img/feather.png";

function toogleTheme() {
  const body = document.querySelector("html");
  body?.classList.toggle("dark");
}
</script>
<template>
  <nav
    class="firefox:bg-opacity-90 sticky top-0 z-30 bg-white/95 bg-opacity-30 backdrop-blur backdrop-filter lg:z-50 lg:border-slate-900/10 dark:bg-transparent lg:border-b"
  >
    <div class="m-auto flex items-center w-auto">
      <img :src="feather" alt="dingTalkBot" class="w-[50px] h-[50px] feather" />
      <RouterLink to="/" class="hover:text-orange-800">Home</RouterLink>
      <RouterLink to="/link" class="hover:text-orange-800">Link</RouterLink>
      <RouterLink to="/about" class="hover:text-orange-800">About</RouterLink>
    </div>
    <div class="w-auto flex items-center" id="right-nav">
      <IconMoon
        class="h-[24px] w-[24px] leading-6 mr-5 ml-5 cursor-pointer"
        @click="toogleTheme"
      />
    </div>
  </nav>
</template>
<style scoped></style>
