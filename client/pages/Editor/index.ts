import Text from "@/formcomponents/Text/index.vue";
import TextArea from "@/formcomponents/TextArea/index.vue";
import Switch from "@/formcomponents/Switch/index.vue";
import Radio from '@/formcomponents/Radio/index.vue'
import KeyValueConfig from '@/formcomponents/KeyValueConfig/index.vue'
import KeyValueConfigMult from '@/formcomponents/KeyValueConfigMult/index.vue'
import CheckBox from '@/formcomponents/CheckBox/index.vue'
import JsonEditor from '@/formcomponents/JsonEditor/index.vue'
const formcomponents: any = {};
formcomponents[Text.ControlType] = Text;
formcomponents[TextArea.ControlType] = TextArea;
formcomponents[Switch.ControlType] = Switch;
formcomponents[Radio.ControlType] = Radio
formcomponents[KeyValueConfig.ControlType] = KeyValueConfig
formcomponents[KeyValueConfigMult.ControlType] = KeyValueConfigMult
formcomponents[CheckBox.ControlType] = CheckBox
formcomponents[JsonEditor.ControlType] = JsonEditor
export { formcomponents };
