import { App } from "vue";
import "./styles/formedit.scss";

import Text from "./components/Text/index.vue";
import TextArea from "./components/TextArea/index.vue";
import Switch from "./components/Switch/index.vue";
import Radio from "./components/Radio/index.vue";
import KeyValueConfig from "./common/KeyValueConfig.vue";
import KeyValueConfigMult from "./common/KeyValueConfigMult.vue";
import CheckBox from "./components/CheckBox/index.vue";
import JsonEditor from "./components/JsonEditor/index.vue";
import Rule from "./components/Rule/index.vue";
import ColorSelect from "./components/ColorSelect/index.vue";
import Date from "./components/Date/index.vue";
import Time from "./components/Time/index.vue";
import DateTime from "./components/DateTime/index.vue";
import InputNumber from "./components/InputNumber/index.vue";
import Slider from "./components/Slider/index.vue";
import Selected from "./components/Selected/index.vue";
import Selecteds from "./components/Selecteds/index.vue";
import RichText from "./components/RichText/index.vue";
import ShowRule from "./components/ShowRule/index.vue";

// 布局
import Grid from './layout/grid.vue';
import TableLayout from './layout/table.vue';
import Info from './layout/Info.vue';
import Divider from "./layout/Divider.vue";
import Collapse from './layout/collapse.vue';
import Tabs from './layout/Tabs.vue';

// 配置公共组件
import ListConfig from './common/listConfig.vue';
import Panel from './common/panel.vue';

export { default as Dynamicform } from "./Form.vue";

// 可以单个导入表单组件
export { default as SText } from "./components/Text/index.vue";
export { default as STextArea } from "./components/TextArea/index.vue";
export { default as SSwitch } from "./components/Switch/index.vue";
export { default as SRadio } from "./components/Radio/index.vue";
export { default as SKeyValueConfig } from "./common/KeyValueConfig.vue";
export { default as SKeyValueConfigMult } from "./common/KeyValueConfigMult.vue";
export { default as SCheckBox } from "./components/CheckBox/index.vue";
export { default as SJsonEditor } from "./components/JsonEditor/index.vue";
export { default as SColorSelect } from "./components/ColorSelect/index.vue";
export { default as SDate } from "./components/Date/index.vue";
export { default as STime } from "./components/Time/index.vue";
export { default as SDateTime } from "./components/DateTime/index.vue";
export { default as SInputNumber } from "./components/InputNumber/index.vue";
export { default as SSlider } from "./components/Slider/index.vue";
export { default as SSelected } from "./components/Selected/index.vue";
export { default as SSelecteds } from "./components/Selecteds/index.vue";
export { default as SDivider } from "./layout/Divider.vue";
export { default as Rules } from "./components/Rule/index.vue";
export { default as SRichText } from "./components/RichText/index.vue";

const formcomponents: any = {};
formcomponents[Text.ControlType] = Text;
formcomponents[TextArea.ControlType] = TextArea;
formcomponents[Switch.ControlType] = Switch;
formcomponents[Radio.ControlType] = Radio;
formcomponents[KeyValueConfig.ControlType] = KeyValueConfig;
formcomponents[KeyValueConfigMult.ControlType] = KeyValueConfigMult;
formcomponents[CheckBox.ControlType] = CheckBox;
formcomponents[JsonEditor.ControlType] = JsonEditor;
formcomponents[ColorSelect.ControlType] = ColorSelect;
formcomponents[Date.ControlType] = Date;
formcomponents[Time.ControlType] = Time;
formcomponents[DateTime.ControlType] = DateTime;
formcomponents[InputNumber.ControlType] = InputNumber;
formcomponents[Slider.ControlType] = Slider;
formcomponents[Selected.ControlType] = Selected;
formcomponents[Selecteds.ControlType] = Selecteds;
formcomponents[RichText.ControlType] = RichText;
// 布局
formcomponents[Grid.ControlType] = Grid;
formcomponents[TableLayout.ControlType] = TableLayout;
formcomponents[Collapse.ControlType] = Collapse;
formcomponents[Tabs.ControlType] = Tabs;
formcomponents[Divider.ControlType] = Divider;
formcomponents[Info.ControlType] = Info;

// 公共
formcomponents[ListConfig.ControlType] = ListConfig;
formcomponents[Panel.ControlType] = Panel;
formcomponents[Rule.ControlType] = Rule;
formcomponents[ShowRule.ControlType] = ShowRule;

const install = (app: App) => {
  app.config.globalProperties.$formcomponents = formcomponents;
  // formcomponents.forEach((item:any) => {
  //   app.component(item.ControlType, item);
  // })
  for(const key in formcomponents){
    app.component(key, formcomponents[key]);
  }
  // app.component(Text.ControlType, Text);
  // app.component(TextArea.ControlType, TextArea);
  // app.component(Switch.ControlType, Switch);
  // app.component(Radio.ControlType, Radio);
  // app.component(KeyValueConfig.ControlType, KeyValueConfig);
  // app.component(KeyValueConfigMult.ControlType, KeyValueConfigMult);
  // app.component(CheckBox.ControlType, CheckBox);
  // app.component(JsonEditor.ControlType, JsonEditor);
  // app.component(ColorSelect.ControlType, ColorSelect);
  // app.component(Date.ControlType, Date);
  // app.component(Time.ControlType, Time);
  // app.component(DateTime.ControlType, DateTime);
  // app.component(InputNumber.ControlType, InputNumber);
  // app.component(Slider.ControlType, Slider);
  // app.component(Selected.ControlType, Selected);
  // app.component(Selecteds.ControlType, Selecteds);
  // app.component(Rule.ControlType, Rule);
  // app.component(RichText.ControlType, RichText);
  // app.component(ShowRule.ControlType, ShowRule);
  // app.component(Grid.ControlType, Grid);
  // app.component(ListConfig.ControlType, ListConfig);
  // app.component(TableLayout.ControlType, TableLayout);
  // app.component(Info.ControlType, Info);
  // app.component(Divider.ControlType, Divider);
  // app.component(Panel.ControlType, Panel)
};

export default {
  install,
};
