<script setup lang="ts"></script>
<template>
  <div class="h-full w-full flex-col flex" id="container">
    <div class="m-auto">
      <div class="h-[600px] w-[1000px] flex" id="login_panel">
        <div class="h-full w-1/2" id="left-bg"></div>
        <div class="h-full w-1/2 bg-white" id="right-form">2</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#login_panel {
  border-radius: 23px;
  background: #32325d;
  box-shadow: 50px 50px 100px #21213d, -50px -50px 100px #43437d;
}
#container {
  background: url("../assets/img/Moon.svg");
}
#left-bg {
  background: url("../assets/img/lbg.jpg");
  border-top-left-radius: 23px;
  border-bottom-left-radius: 23px;
}
#right-form {
  border-top-right-radius: 23px;
  border-bottom-right-radius: 23px;
}
</style>
