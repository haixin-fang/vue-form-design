import _ from "@/utils/_";
// import { createStore } from "vuex";
import { reactive } from "vue";
import { state as form } from "./form";
import { AllFormItem, ShortCutState } from "@/type";

const state = reactive<ShortCutState>({
  form: form,
  copyContent: {},
  curList: [], // 当前操作在哪个选中区间中
});

/**
 * 快捷键对表单的处理
 */
class ShortCut {
  copy(list: AllFormItem[]) {
    if (state.form.currentIndex > -1) {
      state.copyContent = list[state.form.currentIndex];
    }
  }
  paste(list: AllFormItem[]) {
    if (state.copyContent) {
      const pasteControl = window.VueContext.$Flex.deepClone(state.copyContent);
      pasteControl.data.fieldName = pasteControl.ControlType + "_" + _.generateMixed();
      pasteControl.id = _.generateMixed();
      list.push(pasteControl);
      state.form.formUpdate = true;
    }
  }
  delete(list: AllFormItem[]) {
    list.splice(state.form.currentIndex, 1);
    state.form.curControl = {};
    state.form.formUpdate = true;
    state.form.currentIndex = -1;
    state.form.currentId = "";
  }
  onTop(list: AllFormItem[]) {
    if (state.form.currentIndex > 0) {
      const temp = list.splice(state.form.currentIndex, 1);
      state.form.currentIndex -= 1;
      list.splice(state.form.currentIndex, 0, ...temp);
    }
  }
  onBottom(list: AllFormItem[]) {
    if (state.form.currentIndex < list.length - 1) {
      const temp = list.splice(state.form.currentIndex, 1);
      state.form.currentIndex += 1;
      list.splice(state.form.currentIndex, 0, ...temp);
    }
  }
  clear() {
    state.form.allFormList.length = 0;
    state.form.formUpdate = true;
  }
  moveTop() {
    if (state.form.currentIndex > 0) {
      state.form.currentIndex -= 1;
    }
  }
  moveBottom(list: AllFormItem[]) {
    if (state.form.currentIndex < list.length - 1) {
      state.form.currentIndex += 1;
    }
  }
  set(name: keyof ShortCutState, value: any) {
    state[name] = value;
  }

  get(name: keyof ShortCutState) {
    return state[name];
  }
  commit(event: string) {
    this[event](state.curList);
  }
}

export type shortCut = ShortCut;

export default new ShortCut();
