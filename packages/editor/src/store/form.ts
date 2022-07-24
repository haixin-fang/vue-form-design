import { reactive } from "vue";
import { globalData } from "@/common/formJson";
import history from "@/controller/history";
import { FormState } from "@/type";

const state = reactive<FormState>({
  allFormList: [], // 存储所有选择的表单控件
  curControl: {}, // 选中的表单控件
  currentIndex: -1, // 选中的控件的索引
  preview: false, // 开启预览进行表单验证
  previewShow: false, // 预览是否展示
  save: false, // 保存
  saveTimetemp: new Date().getTime(), //上一次保存的时间戳
  // 下一次保存的时候判断表单是否变更了，而不用变更就改变vuex的save，但是我们监听了save会形成死循环
  formUpdate: false, // 判断表单是否更新
  AllFormResult: [], // 预览和存储到数据库最终结果
  formResult: {}, // 用户在动态表单输入的配置结果
  globalDatas: globalData,
});

export { state };

export default {
  updateAllFormList(allFormList: any) {
    state.allFormList = allFormList;
    // 解决属性面板表单和jsontab切换后,数据不同步问题
    if ((state.currentIndex != -1)) {
      state.curControl = allFormList[state.currentIndex];
    }
  },
  setHistory() {
    history?.setValue({
      allFormList: window.VueContext.$Flex.deepClone(state.allFormList),
      currentIndex: state.currentIndex,
      curControl: window.VueContext.$Flex.deepClone(state.allFormList[state.currentIndex]),
    });
  },
  setFormCurrentIndex(index: any) {
    state.currentIndex = index;
    if (index && index != -1) {
      let result;
      state.allFormList.find((item) => {
        if (item.id == index) {
          result = item;
          return true;
        } else if (item.layout) {
          const res = this.getGridCurCtrol(item, index);
          if (res) {
            result = res;
            return true;
          }
        }
      });
      state.curControl = result || {};
    } else {
      state.curControl = {};
    }
  },
  getGridCurCtrol(item: any, id: string) {
    const columns = item.data.columns;
    let result;
    if (columns && columns.length > 0) {
      columns.find((colItem: any) => {
        return colItem.list.find((listItem: any) => {
          if (listItem.layout) {
            result = this.getGridCurCtrol(listItem, id);
          } else if (listItem.id == id) {
            result = listItem;
          }
        });
      });
    }
    return result;
  },
  setPreviewShow(type: any) {
    state.previewShow = type;
  },
  // 获取默认值和键名组成新对象
  handleDynamicForm() {
    const data: any = {};
    state.AllFormResult.forEach((item: any) => {
      if (item.data.itemConfig) {
        if (typeof item.data.itemConfig.value == "string") {
          data[item.data.fieldName] = item.data.itemConfig.value;
        } else {
          // 防止对数据进行劫持监听
          data[item.data.fieldName] = [...item.data.itemConfig.value];
        }
      } else {
        data[item.data.fieldName] = item.data.default;
      }
    });
    state.formResult = data;
  },
  openPreview(preview: any) {
    state.preview = preview;
  },
  setSave(type: any) {
    state.save = type;
  },
  setFormUpdate(type: any) {
    state.formUpdate = type;
  },
  getControlItems() {
    return state.curControl && state.curControl.controlItems;
  },
  getAllFormList() {
    return state.allFormList;
  },
  set(name: any, value: any) {
    (state as any)[name] = value;
    console.log("admin store set ", name, " ", value);
  },

  get(name: any) {
    return (state as any)[name];
  },
};
