import { App, defineAsyncComponent } from "vue";
import "./styles/index.scss";
import { getFormConfig } from "./utils/fieldConfig";
import _ from "@/utils/_";
// import Text from "./components/Text/index.vue";
// import TextArea from "./components/TextArea/index.vue";
// import Switch from "./components/Switch/index.vue";
// import Radio from "./components/Radio/index.vue";
// import KeyValueConfig from "./common/KeyValueConfig.vue";
// import KeyValueConfigMult from "./common/KeyValueConfigMult.vue";
// import CheckBox from "./components/CheckBox/index.vue";
// import JsonEditor from "./components/JsonEditor/index.vue";
// import Rule from "./components/Rule/index.vue";
// import ColorSelect from "./components/ColorSelect/index.vue";
// import Date from "./components/Date/index.vue";
// import Time from "./components/Time/index.vue";
// import DateTime from "./components/DateTime/index.vue";
// import InputNumber from "./components/InputNumber/index.vue";
// import Slider from "./components/Slider/index.vue";
// import Selected from "./components/Selected/index.vue";
// import Selecteds from "./components/Selecteds/index.vue";
// import RichText from "./components/RichText/index.vue";
// import ShowRule from "./components/ShowRule/index.vue";

// // 布局
// import Grid from './layout/grid.vue';
// import TableLayout from './layout/table.vue';
// import Info from './layout/Info.vue';
// import Divider from "./layout/Divider.vue";
// import Collapse from './layout/collapse.vue';
// import Tabs from './layout/Tabs.vue';

// // 配置公共组件
// import ListConfig from './common/listConfig.vue';
// import Panel from './common/panel.vue';
// import RadioGroup from './common/radiogroup.vue';
// import formAction from './common/formAction.vue';
// import Action from './common/action.vue';

// const formcomponents: any = {};
// formcomponents[Text.ControlType] = Text;
// formcomponents[TextArea.ControlType] = TextArea;
// formcomponents[Switch.ControlType] = Switch;
// formcomponents[Radio.ControlType] = Radio;
// formcomponents[KeyValueConfig.ControlType] = KeyValueConfig;
// formcomponents[KeyValueConfigMult.ControlType] = KeyValueConfigMult;
// formcomponents[CheckBox.ControlType] = CheckBox;
// formcomponents[JsonEditor.ControlType] = JsonEditor;
// formcomponents[ColorSelect.ControlType] = ColorSelect;
// formcomponents[Date.ControlType] = Date;
// formcomponents[Time.ControlType] = Time;
// formcomponents[DateTime.ControlType] = DateTime;
// formcomponents[InputNumber.ControlType] = InputNumber;
// formcomponents[Slider.ControlType] = Slider;
// formcomponents[Selected.ControlType] = Selected;
// formcomponents[Selecteds.ControlType] = Selecteds;
// formcomponents[RichText.ControlType] = RichText;
// // 布局
// formcomponents[Grid.ControlType] = Grid;
// formcomponents[TableLayout.ControlType] = TableLayout;
// formcomponents[Collapse.ControlType] = Collapse;
// formcomponents[Tabs.ControlType] = Tabs;
// formcomponents[Divider.ControlType] = Divider;
// formcomponents[Info.ControlType] = Info;

// // 公共
// formcomponents[ListConfig.ControlType] = ListConfig;
// formcomponents[Panel.ControlType] = Panel;
// formcomponents[Rule.ControlType] = Rule;
// formcomponents[ShowRule.ControlType] = ShowRule;
// formcomponents[RadioGroup.ControlType]= RadioGroup;
// formcomponents[formAction.ControlType] = formAction;
// formcomponents[Action.ControlType] = Action;

const utilFuns: any = {};
const files = import.meta.glob(["./common/*", "./components/*/*", "./layout/*", "!./components/RichText/index.vue", "!./components/JsonEditor/index.vue"], { eager: true });
Object.keys(files).forEach((fileName) => {
  const result = files[fileName].default;
  utilFuns[result.ControlType] = result;
});

// 把size过大组件异步加载

// 富文本
const RichText = defineAsyncComponent(() => import("./components/RichText/index.vue"));
RichText.ControlType = "RichText"; // 必须与文件名匹配
RichText.nameCn = "富文本";
RichText.icon = "icon-textEdit";
RichText.formConfig = getFormConfig("RichText");
utilFuns[RichText.ControlType] = RichText;
// json编辑器
const jsonEditor = defineAsyncComponent(() => import("./components/JsonEditor/index.vue"));
jsonEditor.ControlType = "JsonEditor"; // 必须与文件名匹配
jsonEditor.nameCn = "JSON编辑";
jsonEditor.icon = "icon-json-full";
jsonEditor.formConfig = getFormConfig("JsonEditor", [{ fieldName: "default", component: "JsonEditor" }]);
jsonEditor.rule = _.getJsonValidate();
utilFuns[jsonEditor.ControlType] = jsonEditor;

const install = (app: App) => {
  app.config.globalProperties.$formcomponents = utilFuns;
  for (const key in utilFuns) {
    app.component(key, utilFuns[key]);
  }
};

export { default as Dynamicform } from "./starfish-form.vue";

export default {
  install,
};
