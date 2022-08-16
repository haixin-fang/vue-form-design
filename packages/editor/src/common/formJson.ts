const globalFormList = [
  {
    ControlType: "RadioGroup",
    nameCn: "选择器",
    data: {
      fieldName: "labelalign",
      label: "标签对齐方式",
      showRule: "{}",
      rule: "[]",
      itemConfig: {
        value: "right",
        items: [
          {
            label: "Top",
            value: "top",
            select: true,
            id: 1,
          },
          {
            label: "Left",
            value: "left",
            id: 2,
          },
          {
            label: "Right",
            value: "right",
            select: false,
            id: 4,
          },
        ],
        id: 4,
      },
    },
  },
  {
    ControlType: "RadioGroup",
    nameCn: "选择器",
    data: {
      fieldName: "size",
      label: "组件尺寸",
      showRule: "{}",
      rule: "[]",
      itemConfig: {
        value: "small",
        items: [
          {
            label: "large",
            value: "large",
            select: false,
            id: 1,
          },
          {
            label: "default",
            value: "default",
            select: false,
            id: 2,
          },
          {
            label: "small",
            value: "small",
            select: true,
            id: 3,
          },
        ],
        id: 3,
      },
    },
  },
  {
    ControlType: "InputNumber",
    data: {
      fieldName: "labelWidth",
      label: "标签宽度",
      tip: "",
      showRule: "{}",
      required: false,
      rule: "[]",
      default: 100,
    },
  },
  {
    ControlType: "Text",
    nameCn: "文本框",
    data: {
      fieldName: "suffix",
      label: "表单项后缀",
      tip: "",
      placeholder: "",
      showRule: "{}",
      required: false,
      rule: "[]",
      default: ":",
    },
  },
  {
    ControlType: "FormStyle",
    nameCn: "文本框",
    data: {
      fieldName: "styles",
      label: "表单样式表",
      tip: "",
      placeholder: "",
      showRule: "{}",
      required: false,
      rule: "[]",
      default: "",
    },
  },
  {
    ControlType: "Selecteds",
    nameCn: "文本框",
    dynamic: true,
    data: {
      fieldName: "csslist",
      label: "自定义Class",
      tip: "",
      placeholder: "",
      showRule: "{}",
      required: false,
      rule: "[]",
      itemConfig: {
        value: [],
        items: [],
      },
    },
  },
  {
    ControlType: "FormAction",
    nameCn: "文本框",
    data: {
      fieldName: "action",
      label: "动作面板",
      tip: "",
      placeholder: "",
      showRule: "{}",
      required: false,
      rule: "[]",
      default: [],
    },
  },
];

export { globalFormList };
