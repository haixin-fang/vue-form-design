const beforeBaseFormCofig = [
  {
    ControlType: "Text",
    data: {
      fieldName: "fieldName",
      tip: "",
      label: "字段名称",
      placeholder: "请输入字段名称",
      value: "",
      showRule: "{}",
      required: true,
      rule: "[]",
    },
  },
  {
    ControlType: "Text",
    data: {
      fieldName: "label",
      tip: "",
      label: "标签名称",
      placeholder: "请输入标签名称",
      value: "标签名称",
      showRule: "{}",
      required: true,
      rule: "[]",
    },
  },
  
];
const afterBaseFormConfig:any[] = [
  {
    ControlType: "Switch",
    data: {
      fieldName: "required",
      tip: "",
      label: "是否必填",
      showRule: "{}",
      required: false,
      rule: "[]",
    },
  },
  {
    ControlType: "TextArea",
    data: {
      fieldName: "tip",
      tip: "",
      label: "提示",
      placeholder: "请输入提示",
      value: "标签名称",
      showRule: "{}",
      required: false,
      rule: "[]",
    },
  },
  {
    ControlType: "JsonEditor",
    data: {
      fieldName: "rule",
      tip: "",
      label: "校验规则",
      showRule: "{}",
      required: false,
      rule: "[]",
      default: "[]"
    },
  }
];
const myMixin = {
  initControlItems() {
    return [beforeBaseFormCofig, afterBaseFormConfig];
  },
};

export { myMixin };
