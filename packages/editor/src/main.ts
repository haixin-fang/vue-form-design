import { App } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import Editor from "./starfish-editor.vue";
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
import { basicSetup } from "codemirror";
import VueCodemirror from "vue-codemirror";
import FormStyle from '@/common/formStyle.vue';
// import FormAction from '@/common/formAction.vue';
import 'starfish-form/src/styles/index.scss';
import { javascript } from '@codemirror/lang-javascript'
// import { json } from '@codemirror/lang-json'
// import { css } from '@codemirror/lang-css'
export default {
  install: (app: App) => {
    app.config.globalProperties.$EventBus = vm;
    app.config.globalProperties.$Flex = flex;
    window.VApp = app.config.globalProperties;
    // 如果想在方法中使用自定义的方法,可以挂载到window中
    window.VueContext = {
      $Flex: flex,
    };
    window.JSONEditor = JSONEditor;
    app
      .use(ElementPlus, {
        locale: zhCn,
      })
      .use(StarfishForm);

    app.use(VueCodemirror, {
      // optional default global options
      autofocus: true,
      disabled: false,
      indentWithTab: true,
      tabSize: 2,
      placeholder: "Code goes here...",
      extensions: [basicSetup, javascript()],
      // ...
    });
    app.component("CustomDialog", CustomDialog);
    app.component("ConditionSelect", ConditionSelect);
    app.component("HighConditionSelect", HighConditionSelect);
    app.component("draggable", draggable);
    app.component("Shape", Shape);
    app.component('FormStyle', FormStyle);
    // app.component('FormAction',FormAction);

    app.component("StarfishEditor", Editor);
  },
};
// app.mount("#app");
