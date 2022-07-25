import { createApp, type AppConfig } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/assets/style/index.css";


const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
