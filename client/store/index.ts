import { createStore } from "vuex";
import form from "./form";

export interface GlobalDataProps {
  form: any;
}
const store = createStore({
  state: {
    editType: 1, // 存储编辑器类型， 1 表单
  },
  modules: {
    form,
  },
});

export default store;
