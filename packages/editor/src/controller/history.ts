import { reactive } from "vue";
import { HistoryState, HistoryItem } from "@/type";
import formStore from "@/store/form";

const state = reactive<HistoryState>({
  historyList: [],
  index: -1,
  historyFlag: false,
});

class History {
  public setValue(value: HistoryItem) {
    state.historyList.push(value);
    state.index = state.historyList.length - 1;
  }
  public back() {
    if(state.index == -1)return;
    state.index -= 1;
    if (state.index > -1) {
      state.historyFlag = true;
      formStore?.set("allFormList", state.historyList[state.index].allFormList);
      formStore?.set("currentIndex", state.historyList[state.index].currentIndex);
      formStore?.set("curControl", state.historyList[state.index].curControl);
    }else{
      state.historyFlag = true;
      formStore?.set("allFormList", []);
      formStore?.set("currentIndex", -1);
      formStore?.set("curControl", {});
    }
  }
  public go() {
    if (state.index >= state.historyList.length -1) {
      return;
    }
    state.index += 1;
    state.historyFlag = true;
    formStore?.set("allFormList", state.historyList[state.index].allFormList);
    formStore?.set("currentIndex", state.historyList[state.index].currentIndex);
    formStore?.set("curControl", state.historyList[state.index].curControl);
  }
  public get<T>(name: keyof typeof state): T {
    return (state as any)[name];
  }
  public set(name: keyof typeof state, value: any) {
    (state as any)[name] = value;
  }
}

export type hisContrl = History;

export default new History();
