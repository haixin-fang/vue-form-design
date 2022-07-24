import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import Editor from "./Editor.vue";
import "starfish-form/dist/style.css";
import "@/styles/index.scss";
import "jsoneditor/dist/jsoneditor.min.css";
import CustomDialog from "@/common/CustomDialog.vue";
import ConditionSelect from "@/common/ConditionSelect.vue";
import HighConditionSelect from "@/common/ConditionSelect/ConditionModule.vue";
import Shape from "~editor/Shape.vue";
import StarfishForm from "starfish-form";
import JSONEditor from "jsoneditor";
import vm from "./utils/vm";
import flex from "./utils/_";
import draggable from "vuedraggable";
const app = createApp(Editor);
window.VApp = app;
app.config.globalProperties.$EventBus = vm;
app.config.globalProperties.$Flex = flex;
// 如果想在方法中使用自定义的方法,可以挂载到window中
window.VueContext = {
  $Flex: flex,
};
window.JSONEditor = JSONEditor;
app.component("CustomDialog", CustomDialog);
app.component("ConditionSelect", ConditionSelect);
app.component("HighConditionSelect", HighConditionSelect);
app.component('draggable', draggable)
app.component('Shape', Shape)
app.use(StarfishForm).use(ElementPlus, {
  locale: zhCn,
});
app.mount("#app");
