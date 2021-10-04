import { Module } from "vuex";
interface allFormList {
  [key: string]: any;
}
const form: Module<allFormList, any> = {
  state: {
    allFormList: [], // 存储所有选择的表单控件
    curControl: {}, // 选中的表单控件
    currentIndex: "", // 选中的控件的索引
    preview: false, // 是否开启预览
    AllFormResult: {}, // 预览和存储到数据库最终结果
    formResult: {}, // 用户在动态表单输入的配置结果
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
    // 获取默认值和键名组成新对象
    handleDynamicForm(state){
      const formResult:any = localStorage.getItem('formResult')
      state.AllFormResult = JSON.parse(formResult)
      const data:any = {}
      state.AllFormResult.forEach((item: any) => {
        if(item.data.itemConfig){
          data[item.data.fieldName] = item.data.itemConfig.value
        }else{
          data[item.data.fieldName] = item.data.default
        }
      })
      state.formResult = data
    },
    openPreview(state, preview){
      state.preview = preview
    }
  },
  getters: {
    getControlItems(state) {
      return state.curControl && state.curControl.controlItems;
    },
    getAllFormList(state) {
      return state.allFormList
    }
  },
};

export default form;
