import { createStore } from "vuex";
import form from "./form";
export interface GlobalDataProps {
  form: any;
}
const store = createStore({
  state: <any>{
    editType: 1, // 存储编辑器类型， 1 表单
    copyContent: null
  },
  modules: {
    form,
  },
  mutations: {
    copy(state){
      console.log('copy',state)
      const states:any = state
      if(states.editType == 1 && states.form.currentIndex > -1){
        states.copyContent = states.form.allFormList[states.form.currentIndex]
      }
    },
    paste(state){
      if(state.copyContent){
        state.form.allFormList.push(JSON.parse(JSON.stringify(state.copyContent)))
        console.log(state.form.allFormList)
      }
    }
  }
});

export default store;
