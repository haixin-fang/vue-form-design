import { reactive } from "vue";
import { HistoryState, HistoryItem } from "@/type";
import formStore from "./form";

const state = reactive<HistoryState>({
  historyList: [],
  index: -1,
  maxStep: 20,
  historyFlag: false,
});

class History {
  public setValue(value: HistoryItem) {
    state.historyList.push(value);
    if(state.historyList.length > state.maxStep){
      state.historyList = state.historyList.slice(state.historyList.length - state.maxStep);
    }
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
      formStore?.set("currentId", state.historyList[state.index].currentId);
    }else{
      state.historyFlag = true;
      formStore?.set("allFormList", []);
      formStore?.set("currentIndex", -1);
      formStore?.set("curControl", {});
      formStore?.set("currentId", '');
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
  public get<T>(name: keyof typeof state):T {
    return (state as any)[name];
  }
  public set(name: keyof typeof state, value: any) {
    (state as any)[name] = value;
  }
}

export type hisContrl = History;

export default new History();
