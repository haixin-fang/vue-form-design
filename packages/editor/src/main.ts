import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import router from "./router";
// import store from "./store";
import App from "./App.vue";
import "@/styles/index.scss";
import "@/assets/jsoneditor.min.css"
import CustomDialog from '@/components/CustomDialog/index.vue'
import StarfishForm from '@starfish/form'
const app  = createApp(App);

app.component('CustomDialog', CustomDialog);
app.use(ElementPlus).use(StarfishForm);
app.mount("#app");
