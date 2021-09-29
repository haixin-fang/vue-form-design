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
];
const afterBaseFormConfig = [
  {
    ControlType: "Text",
    data: {
      fieldName: "label",
      tip: "",
      label: "字段名称",
      placeholder: "请输入字段名称",
      value: "",
      showRule: "{}",
      required: true,
      rule: "[]",
    },
  },
];
const myMixin = {
  initControlItems() {
    return [beforeBaseFormCofig, afterBaseFormConfig];
  },
};

export { myMixin };
