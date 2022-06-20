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
});

export default {
  copy() {
    if (state.editType == 1 && state.form.currentIndex > -1) {
      state.copyContent = state.form.allFormList[state.form.currentIndex];
    }
  },
  paste() {
    if (state.editType == 1 && state.copyContent) {
      const pasteControl = JSON.parse(JSON.stringify(state.copyContent));
      pasteControl.data.fieldName = pasteControl.ControlType + "_" + _.generateMixed(3);
      state.form.allFormList.push(pasteControl);
      state.form.formListLen = state.form.allFormList.length;
      state.form.formUpdate = true;
    }
  },
  delete() {
    if (state.editType == 1) {
      state.form.allFormList.splice(state.form.currentIndex, 1);
      state.form.curControl = {};
      state.form.formUpdate = true;
    }
  },
  onTop() {
    if (state.editType == 1) {
      if (state.form.currentIndex > 0) {
        const temp = state.form.allFormList.splice(state.form.currentIndex, 1);
        state.form.currentIndex -= 1;
        state.form.allFormList.splice(state.form.currentIndex, 0, ...temp);
      }
    }
  },
  onBottom() {
    if (state.editType == 1) {
      if (state.form.currentIndex < state.form.allFormList.length - 1) {
        const temp = state.form.allFormList.splice(state.form.currentIndex, 1);
        state.form.currentIndex += 1;
        state.form.allFormList.splice(state.form.currentIndex, 0, ...temp);
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
  moveBottom() {
    if (state.form.currentIndex < state.form.allFormList.length - 1) {
      state.form.currentIndex += 1;
    }
  },
  set(name:any, value: any) {
    (state as any)[name] = value;
    console.log('admin store set ', name, ' ', value);
  },

  get(name: any){
    return (state as any)[name];
  },
  commit(event: string){
    this[event]();
  }
};

// const store = createStore({
//   state: <any>{
//     editType: 1, // 存储编辑器类型， 1 表单
//     copyContent: null,
//   },
//   modules: {
//     form,
//   },
//   mutations: {
//     copy(state) {
//       if (state.editType == 1 && state.form.currentIndex > -1) {
//         state.copyContent = state.form.allFormList[state.form.currentIndex];
//       }
//     },
//     paste(state) {
//       if (state.editType == 1 && state.copyContent) {
//         const pasteControl = JSON.parse(JSON.stringify(state.copyContent));
//         pasteControl.data.fieldName = pasteControl.ControlType + "_" + _.generateMixed(3);
//         state.form.allFormList.push(pasteControl);
//         state.form.formListLen = state.form.allFormList.length;
//         state.form.formUpdate = true;
//       }
//     },
//     delete(state) {
//       if (state.editType == 1) {
//         state.form.allFormList.splice(state.form.currentIndex, 1);
//         state.form.curControl = {};
//         state.form.formUpdate = true;
//       }
//     },
//     onTop(state) {
//       if (state.editType == 1) {
//         if (state.form.currentIndex > 0) {
//           const temp = state.form.allFormList.splice(state.form.currentIndex, 1);
//           state.form.currentIndex -= 1;
//           state.form.allFormList.splice(state.form.currentIndex, 0, ...temp);
//         }
//       }
//     },
//     onBottom(state) {
//       if (state.editType == 1) {
//         if (state.form.currentIndex < state.form.allFormList.length - 1) {
//           const temp = state.form.allFormList.splice(state.form.currentIndex, 1);
//           state.form.currentIndex += 1;
//           state.form.allFormList.splice(state.form.currentIndex, 0, ...temp);
//         }
//       }
//     },
//     clear(state) {
//       if (state.editType == 1) {
//         state.form.allFormList.length = 0;
//         state.form.formUpdate = true;
//       }
//     },
//     moveTop(state) {
//       if (state.form.currentIndex > 0) {
//         state.form.currentIndex -= 1;
//       }
//     },
//     moveBottom(state) {
//       if (state.form.currentIndex < state.form.allFormList.length - 1) {
//         state.form.currentIndex += 1;
//       }
//     },
//   },
// });

// export default store;
