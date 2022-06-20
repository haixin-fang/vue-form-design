import { PropType } from "vue";

interface FormConfig {
  [key: string]: string;
}

export default {
  drag: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object as PropType<FormConfig>,
    required: true,
  },
  item: Object,
};
