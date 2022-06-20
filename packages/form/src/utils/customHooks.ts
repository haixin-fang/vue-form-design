import { watch, getCurrentInstance, ComponentInternalInstance } from "vue";

function useWatch(data: any) {
  const vm = getCurrentInstance() as ComponentInternalInstance;
  watch(
    () => data,
    () => {
      vm.emit("change");
    }
  );
}

export { useWatch };
