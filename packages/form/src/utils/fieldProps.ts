import { PropType } from "vue";

interface FormConfig {
  [key: string]: any;
}

export default {
  drag: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object as PropType<FormConfig>,
    required: true,
    default(){
      return {}
    }
  },
  item: {
    type: Object,
    default(){
      return {}
    }
  },
  labelalign: {
    type: String,
    default: 'top'
  },
  labelWidth: {
    type: Number,
  },
  suffix: {
    type: String,
    default: ':'
  },
  size: {
    type: String,
    default: 'small'
  },
  styles: {
    type: String,
    default: ''
  },
  csslist: {
    type: Object as PropType<Array<string>>,
    default(){
      return [];
    }
  }
};
