import { createApp, type AppConfig } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/assets/index.css";

import Message from './plugins/message'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.config.globalProperties.$message = Message;

app.mount("#app");
