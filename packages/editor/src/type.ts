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
