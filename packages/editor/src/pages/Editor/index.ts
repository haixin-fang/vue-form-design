import Text from "@/formcomponents/Text/index.vue";
import TextArea from "@/formcomponents/TextArea/index.vue";
import Switch from "@/formcomponents/Switch/index.vue";
import Radio from '@/formcomponents/Radio/index.vue'
import KeyValueConfig from '@/formcomponents/KeyValueConfig/index.vue'
import KeyValueConfigMult from '@/formcomponents/KeyValueConfigMult/index.vue'
import CheckBox from '@/formcomponents/CheckBox/index.vue'
import JsonEditor from '@/formcomponents/JsonEditor/index.vue'
import ColorSelect from '@/formcomponents/ColorSelect/index.vue'
import Date from '@/formcomponents/Date/index.vue'
import Time from '@/formcomponents/Time/index.vue'
import DateTime from '@/formcomponents/DateTime/index.vue'
import InputNumber from '@/formcomponents/InputNumber/index.vue'
import Slider from '@/formcomponents/Slider/index.vue'
import Selected from '@/formcomponents/Selected/index.vue'
import Divider from '@/formcomponents/Divider/index.vue'
import RichText from '@/formcomponents/RichText/index.vue'
const formcomponents: any = {};
formcomponents[Text.ControlType] = Text;
formcomponents[TextArea.ControlType] = TextArea;
formcomponents[Switch.ControlType] = Switch;
formcomponents[Radio.ControlType] = Radio
formcomponents[KeyValueConfig.ControlType] = KeyValueConfig
formcomponents[KeyValueConfigMult.ControlType] = KeyValueConfigMult
formcomponents[CheckBox.ControlType] = CheckBox
formcomponents[JsonEditor.ControlType] = JsonEditor
formcomponents[ColorSelect.ControlType] = ColorSelect
formcomponents[Date.ControlType] = Date
formcomponents[Time.ControlType] = Time
formcomponents[DateTime.ControlType] = DateTime
formcomponents[InputNumber.ControlType] = InputNumber
formcomponents[Slider.ControlType] = Slider
formcomponents[Selected.ControlType] = Selected
formcomponents[Divider.ControlType] = Divider
formcomponents[RichText.ControlType] = RichText
export { formcomponents };
