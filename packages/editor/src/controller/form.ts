import { reactive } from "vue";
import history from "@/controller/history";
import { AllFormItem, FormState, BaseFormConfig } from "@/type";
import type {fieldTds, fieldsTrs} from 'starfish-form/src/utils/fieldConfig';
const state = reactive<FormState>({
  allFormList: [], // 存储所有选择的表单控件
  curControl: {}, // 选中的表单控件
  currentIndex: -1, // 选中的控件的索引
  currentId: "",
  preview: false, // 开启预览进行表单验证
  previewShow: false, // 预览是否展示
  save: false, // 保存
  saveTimetemp: new Date().getTime(), //上一次保存的时间戳
  // 下一次保存的时候判断表单是否变更了，而不用变更就改变vuex的save，但是我们监听了save会形成死循环
  formUpdate: false, // 判断表单是否更新
  AllFormResult: [], // 预览和存储到数据库最终结果
  formResult: {}, // 用户在动态表单输入的配置结果
  globalDatas: {},
});

export { state };

class Form {
  updateAllFormList(allFormList: AllFormItem[]) {
    console.log("allForm", allFormList);
    state.allFormList = allFormList;
    // 解决属性面板表单和jsontab切换后,数据不同步问题
    if (state.currentIndex != -1) {
      state.curControl = allFormList[state.currentIndex];
    }
  }
  setHistory() {
    history?.setValue({
      allFormList: window.VueContext.$Flex.deepClone(state.allFormList),
      currentIndex: state.currentIndex,
      currentId: state.currentId,
      curControl: window.VueContext.$Flex.deepClone(state.allFormList[state.currentIndex]),
    });
  }
  setFormCurrentIndex(index: number) {
    state.currentIndex = index;
  }
  setFormCurrentId(id: string) {
    state.currentId = id;
    if (id) {
      const result = this.getCurrentItem(id);
      state.curControl = result || {};
    } else {
      state.curControl = {};
    }
  }
  getCurrentItem(id: string) {
    let result;
    state.allFormList.find((item) => {
      if (item.id == id) {
        result = item;
        return item;
      } else if (item.layout) {
        const res = this.getLayoutCurCtrol(item, id);
        if (res) {
          result = res;
          return item;
        }
      }
    });
    return result;
  }
  getLayoutCurCtrol(item: AllFormItem, id: string): AllFormItem | undefined {
    let result;
    if (item.ControlType == "TableLayout") {
      const trs = item.data.trs;
      if (trs && trs.length > 0) {
        trs.find((trItem: fieldsTrs) => {
          return trItem.tds.find((tdItem: fieldTds) => {
            return tdItem.list.find((listItem: AllFormItem) => {
              if (listItem.layout) {
                if (listItem.id == id) {
                  result = listItem;
                } else {
                  result = this.getLayoutCurCtrol(listItem, id);
                }
                return result;
              } else if (listItem.id == id) {
                result = listItem;
                return result;
              }
            });
          });
        });
      }
    } else if (item.ControlType == "Grid") {
      const columns = item.data.columns;
      if (columns && columns.length > 0) {
        columns.find((colItem: any) => {
          return colItem.list.find((listItem: any) => {
            if (listItem.layout) {
              if (listItem.id == id) {
                result = listItem;
              } else {
                result = this.getLayoutCurCtrol(listItem, id);
              }
              return result;
            } else if (listItem.id == id) {
              result = listItem;
              return result;
            }
          });
        });
      }
    } else if (item.ControlType == "Collapse" || item.ControlType == "Tabs") {
      const items = item.data.items;
      if (items && items.length > 0) {
        items.find((colItem: any) => {
          return colItem.list.find((listItem: any) => {
            if (listItem.layout) {
              if (listItem.id == id) {
                result = listItem;
              } else {
                result = this.getLayoutCurCtrol(listItem, id);
              }
              return result;
            } else if (listItem.id == id) {
              result = listItem;
              return result;
            }
          });
        });
      }
    }
    return result;
  }
  // 获取默认值和键名组成新对象
  handleDynamicForm() {
    state.formResult = this.getDynamicForm(state.AllFormResult);
    console.log("formResult", state.formResult);
  }
  getDynamicForm(list: BaseFormConfig[]) {
    const data: Record<string, any> = {};
    list.forEach((item: BaseFormConfig) => {
      if (item.layout) {
        if (item.ControlType == "Grid" && item.data.columns) {
          item.data.columns.forEach((colItem: { list: any }) => {
            Object.assign(data, this.getDynamicForm(colItem.list));
          });
        } else if (item.ControlType == "TableLayout") {
          const trs = item.data.trs;
          if (trs && trs.length > 0) {
            trs.forEach((trItem: any) => {
              trItem.tds.forEach((tdItem: { list: BaseFormConfig[] }) => {
                Object.assign(data, this.getDynamicForm(tdItem.list));
              });
            });
          }
        } else if (item.ControlType == "Collapse" || item.ControlType == "Tabs") {
          const items = item.data.items;
          if(items){
            items.forEach((colItem: { list: any }) => {
              Object.assign(data, this.getDynamicForm(colItem.list));
            });
          }
        }
      } else if (!item.layout) {
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
      }
    });
    return data;
  }
  openPreview(preview: boolean) {
    state.preview = preview;
  }
  setSave(type: boolean) {
    state.save = type;
  }
  setFormUpdate(type: boolean) {
    state.formUpdate = type;
  }
  getControlItems(): AllFormItem[] {
    return state.curControl && state.curControl.controlItems;
  }
  getAllFormList(): AllFormItem[] {
    return state.allFormList;
  }
  setAllFormList(item: AllFormItem): void {
    state.allFormList.push(item);
  }
  set(name: keyof typeof state, value: any) {
    (state as any)[name] = value;
  }

  get(name: keyof typeof state) {
    return (state as any)[name];
  }
}


export type formContrl = Form;

export default new Form();
