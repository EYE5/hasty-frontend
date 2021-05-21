import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
