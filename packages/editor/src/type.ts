import type { UiControl } from "./controller/ui";
import type { hisContrl } from "./controller/history";
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
  formStore: any;
  store: any;
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

export interface HistoryItem {
  allFormList: any[];
  currentIndex: number;
  currentId: string;
  curControl: any;
}

export type MenuItem = "delete" | "undo" | "redo" | "tree" | "save" | "preview" | "fullscreen" | "viewport" | "json-export" | "json-import";
export type MenuRight = 'viewport' | 'json-export' | 'json-import';
export type MenuBarData = {
  left: MenuItem[],
  rigth: MenuRight[],
  column: boolean
};
export interface FormState {
  /**
   * 存储所有选择的表单控件
   */
  allFormList: any[];
  /**
   * 选中的表单控件
   */
  curControl: any;
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
