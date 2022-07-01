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
  inline: {
    type: Boolean,
    default: false
  },
  labelalign: {
    type: String,
    default: 'top',
  },
  layout: {
    type: String,
    default: '1',
  },
  labelWidth: {
    type: Number,
    default: 400
  },
  suffix: {
    type: String,
    default: ':'
  }
};
