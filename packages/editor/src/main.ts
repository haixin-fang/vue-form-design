import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import router from "./router";
// import store from "./store";
import Editor from "./Editor.vue";
import "@/styles/index.scss";
import "@/assets/jsoneditor.min.css"
import CustomDialog from '@/common/CustomDialog.vue'
import StarfishForm from '@starfish/form'
import vm from './utils/vm';
import flex from './utils/_'
const app  = createApp(Editor);
app.config.globalProperties.$EventBus = vm;
app.config.globalProperties.$Flex = flex;
// 如果想在方法中使用自定义的方法,可以挂载到window中
window.VueContext = {
    $Flex: flex
}
app.component('CustomDialog', CustomDialog);
app.use(ElementPlus).use(StarfishForm);
app.mount("#app");
