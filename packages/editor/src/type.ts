import type { UiControl } from "./controller/ui";
import type { hisContrl } from "./controller/history";
import type { formContrl } from "./controller/form";
import type { shortCut } from "./controller/shortcut";
import type { FormConfig, fields } from "starfish-form/src/main";
/**
 * 组件名称枚举
 */
type ComponentListEnum = keyof typeof window.VApp.$formcomponents;

interface ColumnWidth {
  left: number;
  center: number;
  right: number;
}

export interface UiState {
  /**
   * 编辑器各模块宽度
   */
  columnWidth: ColumnWidth;
  /**
   * 弹窗宽度
   */
  dialogWidth: number;
  /**
   * 编辑器缩放比例
   */
  scale: number;
  /**
   * 编辑器是否全屏
   */
  isFullscreen: boolean;
  /**
   * 页面类型
   */
  pageType: string;
}

export interface Controls {
  uiControl: UiControl;
  hisContrl: hisContrl;
  formStore: formContrl;
  store: shortCut;
}

export interface setColumnWidth {
  left?: number;
  center?: number | "auto";
  right?: number;
}

export interface GetColumnWidth {
  left: number;
  center: number;
  right: number;
}

export interface HistoryState {
  /**
   * 存储的所有历史行为
   */
  historyList: HistoryItem[];
  /**
   * 当前所在的历史行为
   */
  index: number;
  /**
   * 是否正在执行后退或前进,是则阻止进入历史快走中
   */
  historyFlag: boolean;
}

export interface ShortCutState {
  form: FormState;
  copyContent: AllFormItem | Record<string, any>;
  curList: AllFormItem[];
}

export interface HistoryItem {
  allFormList: AllFormItem[];
  currentIndex: number;
  currentId: string;
  curControl: AllFormItem | Record<string, any>;
}

export type MenuItem = "delete" | "undo" | "redo" | "tree" | "save" | "preview" | "fullscreen" | "viewport" | "json-export" | "json-import";
export type MenuRight = "viewport" | "json-export" | "json-import";
export type MenuBarData = {
  left: MenuItem[];
  rigth: MenuRight[];
  column: boolean;
};
export interface FormState {
  /**
   * 存储所有选择的表单控件
   */
  allFormList: AllFormItem[];
  /**
   * 选中的表单控件
   */
  curControl: AllFormItem | Record<string, any>;
  /**
   * 选中的控件的id
   */
  currentId: string;
  /**
   * 选中的控件的索引
   */
  currentIndex: number;
  /**
   * 开启预览进行表单验证
   */
  preview: boolean;
  /**
   * 预览是否展示
   */
  previewShow: boolean;
  /**
   * 保存
   */
  save: boolean;
  /**
   * 上一次保存的时间戳
   */
  saveTimetemp: number;
  /**
   * 下一次保存的时候判断表单是否变更了，而不用变更就改变save，但是我们监听了save会形成死循环
   * 判断表单是否更新
   */
  formUpdate: boolean;
  /**
   * 预览和存储到数据库最终结果
   */
  AllFormResult: any[];
  /**
   * 用户在动态表单输入的配置结果
   */
  formResult: Record<string, any>;
  /**
   * 表单全局配置
   */
  globalDatas: Record<string, any>;
}

interface FormRule {
  fieldName: any[];
  label: any[];
}
export interface AllFormItem {
  /**
   * 组件渲染唯一标识
   */
  ControlType: ComponentListEnum;
  /**
   * 表单配置所需的表单配置列表
   */
  controlItems: FormConfig[];
  /**
   * 表单配置
   */
  data: fields;
  /**
   * 获取配置列表和配置方法列表
   */
  FormConfig: {
    data: () => fields;
    morenConfig: () => FormConfig[];
  };
  /**
   * 组件icon图标
   */
  icon: string;
  /**
   * 组件唯一id
   */
  id: string;
  /**
   * 组件名称
   */
  nameCn: string;
  /**
   * 是否是布局表单
   */
  layout: boolean;
  /**
   * 规则
   */
  rules: FormRule;
}

export interface BaseComponentItem {
  /**
   * 组件渲染唯一标识
   */
  ControlType: ComponentListEnum;
  /**
   * 组件icon图标
   */
  icon: string;
  /**
   * 组件名称
   */
  nameCn: string;
  /**
   * 是否是布局表单
   */
  layout: boolean;
  /**
   * 规则
   */
  rules?: FormRule;
}
