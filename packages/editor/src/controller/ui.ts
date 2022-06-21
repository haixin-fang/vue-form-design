import { reactive, toRaw } from "vue";
import { UiState, setColumnWidth, GetColumnWidth } from "@/type";

const DEFAUTL_LEFT_COLUMN_WIDTH = 300;
const DEFAUTL_RIGHT_COLUMN_WIDTH = 378;
/**
 * 编辑器各模块的宽度
 */
const defaultColumnWidth = {
  left: DEFAUTL_LEFT_COLUMN_WIDTH,
  center: window.document.body.clientWidth - DEFAUTL_LEFT_COLUMN_WIDTH - DEFAUTL_RIGHT_COLUMN_WIDTH,
  right: DEFAUTL_RIGHT_COLUMN_WIDTH,
};


const DIALOG_WIDTH = 500

const state = reactive<UiState>({
  columnWidth: defaultColumnWidth,
  dialogWidth: DIALOG_WIDTH
});

class Ui {
  public get<T>(name: keyof typeof state): T {
    return (state as any)[name];
  }
  public set<T>(name: keyof typeof state, value: T) {
    if (name === "columnWidth") {
      this.setColumnWidth(value);
    }
  }
  private setColumnWidth({ left, center, right }: setColumnWidth) {
    const columnWidth = {
      ...toRaw(this.get<GetColumnWidth>("columnWidth")),
    };
    if (left) {
      columnWidth.left = left;
    }
    if (right) {
      columnWidth.right = right;
    }

    if (!center || center == "auto") {
      const bodyWidth = window.document.body.clientWidth;
      columnWidth.center = bodyWidth - (columnWidth?.left || 0) - (columnWidth?.right || 0);
      if (columnWidth.center < 0) {
        columnWidth.left = defaultColumnWidth.left;
        columnWidth.center = defaultColumnWidth.center;
        columnWidth.right = defaultColumnWidth.right;
      }
    } else {
      columnWidth.center = center;
    }

    state.columnWidth = columnWidth;
  }
}

export type UiControl = Ui;
export default new Ui();
