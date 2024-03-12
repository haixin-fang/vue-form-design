<template>
  <div>
    <codemirror
      :value="internalValue"
      @input="onUpdateValue($event.target.innerText)"
      placeholder="json导入"
      mode="text/json"
      :style="{ height: '400px' }"
      :extensions="extensions"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { json } from "@codemirror/lang-json";
import {Codemirror} from "vue-codemirror";
export default defineComponent({
  components: {
    Codemirror,
  },
  props: {
    value: String, // 接收外部传递的值
  },
  emits: ["update:value"], // 定义emit事件名称
  setup(props, context) {
    const extensions = [json()];
    const internalValue = ref(""); // 内部状态变量

    function updateInternalValue(newVal) {
      internalValue.value = newVal;

      if (context.attrs["onUpdate"]) {
        context.attrs["onUpdate"](newVal); // 调用外部传递的onUpdate函数
      } else {
        context.emit("update:value", newVal); // 或者直接触发emit事件
      }
    }
    return {
      extensions,
      internalValue,
      onUpdateValue: updateInternalValue,
    };
  },
});
</script>