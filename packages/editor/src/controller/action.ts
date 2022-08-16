import { reactive } from "vue";

const state = reactive({
  action: [
    {
      funcName: "mounted",
      type: "mounted",
      methods: 'mounted',
      funcStr: "",
      disabled: true,
    },
    {
      funcName: "updated",
      type: "updated",
      methods: 'updated',
      funcStr: "",
      disabled: true,
    },
  ],
  currentAction: null,
});

class Action {
  set(name: keyof typeof state, value: any) {
    (state as any)[name] = value;
  }

  get(name: keyof typeof state) {
    return (state as any)[name];
  }
}

export {state};

export type ActionForm =  Action;
 
export default new Action();
