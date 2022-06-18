import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import "@/styles/index.scss";
import "@/assets/jsoneditor.min.css"
import { formcomponents } from "./pages/Editor";
import CustomDialog from '@/components/CustomDialog/index.vue'
const app = createApp(App);

app.component('CustomDialog', CustomDialog);
const install: any = () => {
  if (install.installed) return;
  install.installed = true;
  for (const key in formcomponents) {
    app.component(formcomponents[key].ControlType, formcomponents[key]);
  }
};

if (typeof window !== "undefined") {
  install();
}
app.use(router).use(store).use(ElementPlus);
app.mount("#app");
