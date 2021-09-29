import { Module } from "vuex";
interface allFormList {
  [key: string]: any;
}
const form: Module<allFormList, any> = {
  state: {
    allFormList: [], // 存储所有选择的表单控件
    curControl: {}, // 选中的表单控件
    currentIndex: "", // 选中的控件的索引
  },
  mutations: {
    updateAllFormList(state, allFormList) {
      state.allFormList = allFormList;
    },
    setFormCurrentIndex(state, index) {
      state.currentIndex = index;
      if (index >= 0) {
        state.curControl = state.allFormList[index];
      } else {
        state.curControl = {};
      }
    },
  },
  getters: {
    getControlItems(state) {
      return state.curControl && state.curControl.controlItems;
    },
  },
};

export default form;
