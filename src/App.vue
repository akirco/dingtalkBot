<script setup lang="ts">
import { RouterView } from 'vue-router';
import LoginPanel from '@/components/LoginPanel.vue';
import NavLinks from '@/components/NavLinks.vue';
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
