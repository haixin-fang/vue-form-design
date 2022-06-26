import type { UiControl } from "./controller/ui";
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
}

export interface Controls {
  uiControl: UiControl;
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
