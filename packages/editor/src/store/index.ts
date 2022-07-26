import _ from "@/utils/_";
// import { createStore } from "vuex";
import { reactive } from "vue";
import { state as form } from "./form";
export interface GlobalDataProps {
  form: any;
}

const state = reactive({
  form: form,
  editType: 1, // 存储编辑器类型， 1 表单
  copyContent: null,
  curList:[], // 当前操作在哪个选中区间中
});

export default {
  copy(list: any) {
    if (state.editType == 1 && state.form.currentIndex > -1) {
      state.copyContent = list[state.form.currentIndex];
    }
  },
  paste(list: any) {
    if (state.editType == 1 && state.copyContent) {
      const pasteControl = window.VueContext.$Flex.deepClone(state.copyContent);
      pasteControl.data.fieldName = pasteControl.ControlType + "_" + _.generateMixed();
      pasteControl.id = _.generateMixed();
      list.push(pasteControl);
      state.form.formUpdate = true;
    }
  },
  delete(list: any) {
    if (state.editType == 1) {
      list.splice(state.form.currentIndex, 1);
      state.form.curControl = {};
      state.form.formUpdate = true;
      state.form.currentIndex = -1;
      state.form.currentId = "";
    }
  },
  onTop(list: any) {
    if (state.editType == 1) {
      if (state.form.currentIndex > 0) {
        const temp = list.splice(state.form.currentIndex, 1);
        state.form.currentIndex -= 1;
        list.splice(state.form.currentIndex, 0, ...temp);
      }
    }
  },
  onBottom(list: any) {
    if (state.editType == 1) {
      if (state.form.currentIndex < list.length - 1) {
        const temp = list.splice(state.form.currentIndex, 1);
        state.form.currentIndex += 1;
        list.splice(state.form.currentIndex, 0, ...temp);
      }
    }
  },
  clear() {
    if (state.editType == 1) {
      state.form.allFormList.length = 0;
      state.form.formUpdate = true;
    }
  },
  moveTop() {
    if (state.form.currentIndex > 0) {
      state.form.currentIndex -= 1;
    }
  },
  moveBottom(list:any) {
    if (state.form.currentIndex < list.length - 1) {
      state.form.currentIndex += 1;
    }
  },
  set(name: any, value: any) {
    (state as any)[name] = value;
    console.log("admin store set ", name, " ", value);
  },

  get(name: any) {
    return (state as any)[name];
  },
  commit(event: string) {
    this[event](state.curList);
  },
};
