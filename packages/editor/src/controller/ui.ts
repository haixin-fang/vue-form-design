import { reactive, toRaw } from "vue";
import { UiState, setColumnWidth, GetColumnWidth } from "@/type";

const DEFAUTL_LEFT_COLUMN_WIDTH = 300;
const DEFAUTL_RIGHT_COLUMN_WIDTH = 400;
/**
 * 编辑器各模块的宽度
 */
const defaultColumnWidth = {
  left: DEFAUTL_LEFT_COLUMN_WIDTH,
  center: window.document.body.clientWidth - DEFAUTL_LEFT_COLUMN_WIDTH - DEFAUTL_RIGHT_COLUMN_WIDTH,
  right: DEFAUTL_RIGHT_COLUMN_WIDTH,
};

const DIALOG_WIDTH = 500;
/**
 * 编辑器缩放比例
 */
const scale = 1;

const state = reactive<UiState>({
  columnWidth: defaultColumnWidth,
  dialogWidth: DIALOG_WIDTH,
  scale,
  isFullscreen: true,
});

class Ui {
  public get<T>(name: keyof typeof state): T {
    return (state as any)[name];
  }
  public set<T>(name: keyof typeof state, value: T) {
    if (name === "columnWidth") {
      this.setColumnWidth(value);
    } else if (name === "scale") {
      this.setScale(Number(value));
    } else {
      (state as any)[name] = value;
    }
  }

  private setScale(size: number) {
    const range = [0.2, 1.5];
    if (size >= range[0] && size <= range[1]) {
      state.scale = size;
    }
  }

  private setColumnWidth({ left, center, right }: setColumnWidth) {
    const columnWidth = {
      ...toRaw(this.get<GetColumnWidth>("columnWidth")),
    };
    if (left && left >= 0) {
      columnWidth.left = left;
    } else {
      columnWidth.left = defaultColumnWidth.left;
    }
    if (right != undefined && right >= 0) {
      columnWidth.right = right;
    } else {
      columnWidth.right = defaultColumnWidth.right;
    }

    if (!center || center == "auto") {
      const bodyWidth = window.document.body.clientWidth;
      columnWidth.center = bodyWidth - (columnWidth?.left || 0) - (columnWidth?.right || 0);
      if (columnWidth.center <= 0) {
        columnWidth.left = defaultColumnWidth.left;
        columnWidth.center = defaultColumnWidth.center;
        columnWidth.right = defaultColumnWidth.right;
      }
    } else {
      columnWidth.center = center;
    }

    state.columnWidth = columnWidth;
    console.log(1, defaultColumnWidth);
    console.log(2, columnWidth);
  }
}

export type UiControl = Ui;
export default new Ui();
