export interface fileds {
  /**
   * 字段名称
   */
  fieldName: string;
  /**
   * 标签名称
   */
  label: string;
  /**
   * 提示信息
   */
  tip: string;
  /**
   * 占位内容
   */
  placeholder: string;
  /**
   * 表单显示规则
   */
  showRule: string;
  /**
   * 是否必填
   */
  required: boolean;
  /**
   * 校验规则
   */
  rule: string;
  /**
   * 默认内容
   */
  default: string;
}

/**
 * 配置
 */
const fields: fileds = {
  fieldName: "",
  label: "标签名称",
  tip: "",
  placeholder: "",
  showRule: "{}",
  required: false,
  rule: "[]",
  default: "",
};

const mapFiledToPlaceholder:any = {
    default: '默认值',
    placeholder: "输入占位文字"
}
// enum mapFiledToPlaceholder {
//     default =  '默认值',

// }

function setReturnConfig(componentName: string, fields: string, opts?: any) {
  return {
    ControlType: componentName,
    data: {
      fieldName: fields,
      label: mapFiledToPlaceholder[fields],
      placeholder: "请输入占位文字",
    },
  };
}






export { fields, setReturnConfig };
