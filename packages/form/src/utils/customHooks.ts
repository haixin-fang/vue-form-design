import { watch, getCurrentInstance, ComponentInternalInstance } from "vue";

function useWatch(props: any) {
  const vm = getCurrentInstance() as ComponentInternalInstance;
  // 预览模式下才有效
  if (!props.data.fieldName && !props.item.controlItems) {
    watch(
      () => props.data[props.item.data.fieldName],
      (val, oldVal) => {
        if (props.item.data.action && props.item.data.action.onChange) {
          window.VApp.$Flex.funcExec(props.item.data.action.onChange, vm.proxy, [val, oldVal, props.data]);
        }
        vm.emit("change");
      },
      {
        deep: true,
      }
    );
  }
}

export { useWatch };
