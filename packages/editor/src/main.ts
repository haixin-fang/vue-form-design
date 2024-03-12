import { App, defineAsyncComponent } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "@/styles/index.scss";
import "jsoneditor/dist/jsoneditor.min.css";
import StarfishForm from "starfish-form";
import vm from "./utils/vm";
import flex from "./utils/_";
import "starfish-form/dist/style.css";
export default {
  install: (app: App) => {
    app.config.globalProperties.$EventBus = vm;
    app.config.globalProperties.$Flex = flex;
    window.VApp = app.config.globalProperties;
    // 如果想在方法中使用自定义的方法,可以挂载到window中
    window.VueContext = {
      $Flex: flex,
    };
    app.use(StarfishForm);
    app.component(
      "CustomDialog",
      defineAsyncComponent(() => import("@/common/CustomDialog.vue"))
    );
    app.component(
      "ConditionSelect",
      defineAsyncComponent(() => import("@/common/ConditionSelect.vue"))
    );
    app.component(
      "HighConditionSelect",
      defineAsyncComponent(() => import("@/common/ConditionSelect/ConditionModule.vue"))
    );
    app.component(
      "draggable",
      defineAsyncComponent(() => import("vuedraggable"))
    );
    app.component(
      "Shape",
      defineAsyncComponent(() => import("~editor/Shape.vue"))
    );
    app.component(
      "FormStyle",
      defineAsyncComponent(() => import("@/common/formStyle.vue"))
    );
    app.component(
      "StarfishEditor",
      defineAsyncComponent(() => import("./starfish-editor.vue"))
    );
  },
};
// app.mount("#app");
