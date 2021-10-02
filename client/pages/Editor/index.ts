import Text from "@/formcomponents/Text/index.vue";
import TextArea from "@/formcomponents/TextArea/index.vue";
import Switch from "@/formcomponents/Switch/index.vue";
import Radio from '@/formcomponents/Radio/index.vue'
import KeyValueConfig from '@/formcomponents/KeyValueConfig/index.vue'
const formcomponents: any = {};
formcomponents[Text.ControlType] = Text;
formcomponents[TextArea.ControlType] = TextArea;
formcomponents[Switch.ControlType] = Switch;
formcomponents[Radio.ControlType] = Radio
formcomponents[KeyValueConfig.ControlType] = KeyValueConfig
export { formcomponents };
