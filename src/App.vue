<script setup lang="ts">
import { RouterView } from 'vue-router';
import {defineAsyncComponent} from 'vue'
import NavLinks from '@/components/NavLinks.vue';

const LoginPanel = defineAsyncComponent({
    loader: () => import('@/components/LoginPanel.vue')
})
</script>

<template>
  <NavLinks />
  <RouterView />
  <Teleport to="#login">
    <LoginPanel />
  </Teleport>
</template>

<style>
@import '@/assets/base.css';
</style>
