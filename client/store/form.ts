import { Module } from "vuex";
interface allFormList {
  [key: string]: any;
}
const form: Module<allFormList, any> = {
  state: {
    allFormList: [], // 存储所有选择的表单控件
    curControl: {}, // 选中的表单控件
    currentIndex: -1, // 选中的控件的索引
    preview: false, // 开启预览进行表单验证
    previewShow: false, // 预览是否展示
    save: false, // 保存
    // 下一次保存的时候判断表单是否变更了，而不用变更就改变vuex的save，但是我们监听了save会形成死循环
    formUpdate: false, // 判断表单是否更新
    AllFormResult: {}, // 预览和存储到数据库最终结果
    formResult: {}, // 用户在动态表单输入的配置结果
    formListLen: 0, // 表单控件个数
  },
  mutations: {
    updateAllFormList(state, allFormList) {
      state.allFormList = allFormList;
      state.formListLen = allFormList.length;
    },
    setFormCurrentIndex(state, index) {
      // 查看表单的json格式时，点击编辑区域外时不清空
      if(state.viewAndJson == 'json'){
        return
      }
      state.currentIndex = index;
      if (index >= 0) {
        state.curControl = state.allFormList[index];
      } else {
        state.curControl = {};
      }
    },
    // 获取默认值和键名组成新对象
    handleDynamicForm(state){
      debugger
      const formResult:any = localStorage.getItem('formResult')
      state.AllFormResult = JSON.parse(formResult)
      const data:any = {}
      state.AllFormResult.forEach((item: any) => {
        if(item.data.itemConfig){
          // 防止对数据进行劫持监听
          data[item.data.fieldName] = [...item.data.itemConfig.value]
        }else{
          data[item.data.fieldName] = item.data.default
        }
      })
      state.formResult = data
    },
    openPreview(state, preview){
      state.preview = preview
    },
    setSave(state, type){
      state.save = type
    },
    setFormUpdate(state, type){
      state.formUpdate = type
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
