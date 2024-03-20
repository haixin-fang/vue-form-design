import { App, defineAsyncComponent } from "vue";
import "./styles/index.scss";
import { getFormConfig } from "./utils/fieldConfig";
import _ from "@/utils/_";
import Loading from "@/common/Loading.vue";

const utilFuns: any = {};
const files: any = import.meta.glob(["./common/*", "./components/*/*", "./layout/*", "!./components/RichText/index.vue", "!./components/JsonEditor/index.vue", "!./components/Rule/index.vue", "!./common/formAction.vue"], { eager: true });
Object.keys(files).forEach((fileName) => {
  const result = files[fileName].default;
  if (fileName.indexOf(".vue") != -1) {
    utilFuns[result.ControlType] = result;
  }
});
// 富文本
const RichText = defineAsyncComponent({
  loader: () => import("./components/RichText/index.vue"),
  loadingComponent: Loading,
});
RichText.ControlType = "RichText"; // 必须与文件名匹配
RichText.nameCn = "富文本";
RichText.icon = "icon-textEdit";
RichText.formConfig = getFormConfig("RichText");
utilFuns[RichText.ControlType] = RichText;
// json编辑器
const jsonEditor = defineAsyncComponent({
  loader: () => import("./components/JsonEditor/index.vue"),
  loadingComponent: Loading,
});
jsonEditor.ControlType = "JsonEditor"; // 必须与文件名匹配
jsonEditor.nameCn = "JSON编辑";
jsonEditor.icon = "icon-json-full";
jsonEditor.formConfig = getFormConfig("JsonEditor", [{ fieldName: "default", component: "JsonEditor" }]);
jsonEditor.rule = _.getJsonValidate();
utilFuns[jsonEditor.ControlType] = jsonEditor;

const formAction = defineAsyncComponent({
  loader: () => import("./common/formAction.vue"),
  loadingComponent: Loading,
});
formAction.ControlType = "FormAction"; // 必须与文件名匹配
formAction.isHide = true;
utilFuns[formAction.ControlType] = formAction;
// 规则
const Rule = defineAsyncComponent({
  loader: () => import("./components/Rule/index.vue"),
  loadingComponent: Loading,
});
Rule.ControlType = "Rule"; // 必须与文件名匹配
Rule.rule = _.getJsonValidate();
utilFuns[Rule.ControlType] = Rule;
const install = (app: App) => {
  app.config.globalProperties.$formcomponents = utilFuns;
  // for (const key in utilFuns) {
  //   app.component(key, utilFuns[key]);
  // }
};
export const Dynamicform = defineAsyncComponent(() => import("./starfish-form.vue"));

export default {
  install,
};
