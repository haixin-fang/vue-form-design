import { App } from "vue";

import './styles/formedit.scss';

import Text from "./components/Text/index.vue";
import TextArea from "./components/TextArea/index.vue";
import Switch from "./components/Switch/index.vue";
import Radio from "./components/Radio/index.vue";
import KeyValueConfig from "./components/KeyValueConfig/index.vue";
import KeyValueConfigMult from "./components/KeyValueConfigMult/index.vue";
import CheckBox from "./components/CheckBox/index.vue";
import JsonEditor from "./components/JsonEditor/index.vue";
import ColorSelect from "./components/ColorSelect/index.vue";
import Date from "./components/Date/index.vue";
import Time from "./components/Time/index.vue";
import DateTime from "./components/DateTime/index.vue";
import InputNumber from "./components/InputNumber/index.vue";
import Slider from "./components/Slider/index.vue";
// import Selected from './components/Selected/index.vue'
import Divider from "./components/Divider/index.vue";
import RichText from "./components/RichText/index.vue";

// 可以单个导入表单组件
export { default as SText } from "./components/Text/index.vue";
export { default as STextArea } from "./components/TextArea/index.vue";
export { default as SSwitch } from "./components/Switch/index.vue";
export { default as SRadio } from "./components/Radio/index.vue";
export { default as SKeyValueConfig } from "./components/KeyValueConfig/index.vue";
export { default as SKeyValueConfigMult } from "./components/KeyValueConfigMult/index.vue";
export { default as SCheckBox } from "./components/CheckBox/index.vue";
export { default as SJsonEditor } from "./components/JsonEditor/index.vue";
export { default as SColorSelect } from "./components/ColorSelect/index.vue";
export { default as SDate } from "./components/Date/index.vue";
export { default as STime } from "./components/Time/index.vue";
export { default as SDateTime } from "./components/DateTime/index.vue";
export { default as SInputNumber } from "./components/InputNumber/index.vue";
export { default as SSlider } from "./components/Slider/index.vue";
// export {default as SSelected} from "./components/Selected/index.vue";
export { default as SDivider } from "./components/Divider/index.vue";
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
// formcomponents[Selected.ControlType] = Selected
formcomponents[Divider.ControlType] = Divider;
formcomponents[RichText.ControlType] = RichText;

const install = (app: App) => {
  app.config.globalProperties.$formcomponents = formcomponents;
  app.component(Text.ControlType, Text);
  app.component(TextArea.ControlType, TextArea);
  app.component(Switch.ControlType, Switch);
  app.component(Radio.ControlType, Radio);
  app.component(KeyValueConfig.ControlType, KeyValueConfig);
  app.component(KeyValueConfigMult.ControlType, KeyValueConfigMult);
  app.component(CheckBox.ControlType, CheckBox);
  app.component(JsonEditor.ControlType, JsonEditor);
  app.component(ColorSelect.ControlType, ColorSelect);
  app.component(Date.ControlType, Date);
  app.component(Time.ControlType, Time);
  app.component(DateTime.ControlType, DateTime);
  app.component(InputNumber.ControlType, InputNumber);
  app.component(Slider.ControlType, Slider);
  // app.component(Selected.ControlType, Selected);
  app.component(Divider.ControlType, Divider);
  app.component(RichText.ControlType, RichText);
};

export default {
  install,
};
