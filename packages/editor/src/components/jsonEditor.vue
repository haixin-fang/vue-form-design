<template>
  <div ref="jsonCenter"></div>
</template>
<script>
import { defineComponent, ref, computed, inject, toRaw } from "vue";
import JSONEditor from "jsoneditor";
export default defineComponent({
  setup() {
    const jsonCenter = ref();
    let jsonEditor = undefined;
    const { formStore } = inject("control") || {};
    const allmainList = computed(() => formStore?.get("allFormList"));
    const initFormToJson = (formlist) => {
      return window.VueContext.$Flex.initFormToJson(toRaw(formlist));
    };
    function initJsonCenter() {
      const jsonDom = jsonCenter.value;
      if (jsonEditor) {
        jsonEditor?.set(initFormToJson(allmainList.value));
      } else {
        const options = {
          modes: ["text", "code", "view"],
          mode: "code",
          search: false,
        };
        jsonEditor = new JSONEditor(jsonDom, options);
        jsonEditor?.set(initFormToJson(allmainList.value));
      }
      return jsonEditor
    }
    return {
      initJsonCenter,
      jsonCenter
    };
  },
});
</script>