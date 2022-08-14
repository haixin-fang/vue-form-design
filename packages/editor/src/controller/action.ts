import { reactive } from "vue";
const state = reactive({
  action: [{
    funcName: 'mounted',
    funcStr: '',
    disabled: true
  }],
  currentAction: null
});

class Action {
  set(name: keyof typeof state, value: any) {
    (state as any)[name] = value;
  }

  get(name: keyof typeof state) {
    return (state as any)[name];
  }
}

export default new Action();
