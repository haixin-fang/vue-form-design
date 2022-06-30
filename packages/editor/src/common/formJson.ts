/**
 * 属性面板全局表单配置
 */
const globalFormList = [
  {
    ControlType: "Switch",
    nameCn: "开关",
    data: {
      fieldName: "Inline",
      label: "Inline布局",
      tip: "",
      value: "",
      showRule: "{}",
      required: false,
      rule: "[]",
      default: false,
    },
  },
  {
    ControlType: "Selected",
    nameCn: "选择器",
    data: {
      fieldName: "layout",
      label: "布局",
      tip: "",
      placeholder: "",
      showRule: "{}",
      required: false,
      rule: "[]",
      itemConfig: {
        value: "3",
        items: [
          {
            label: "一行一列",
            value: "1",
            select: true,
            id: 1,
          },
          {
            label: "一行二列",
            value: "2",
            select: false,
            id: 2,
          },
          {
            label: "一行三列",
            value: "3",
            select: false,
            id: 3,
          },
        ],
        id: 3,
      },
    },
  },
  {
    ControlType: "Selected",
    nameCn: "选择器",
    data: {
      fieldName: "labelAlign",
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
    ControlType: "Slider",
    nameCn: "滑块",
    data: {
      fieldName: "labelWidth",
      label: "标签宽度",
      tip: "",
      showRule: "{}",
      required: false,
      rule: "[]",
      default: 0,
      min: 0,
      max: "400",
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
];



export {
    globalFormList,
}
