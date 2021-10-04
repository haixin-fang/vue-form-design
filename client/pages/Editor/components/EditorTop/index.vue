<template>
  <div class="editorHeadTop">
    <div class="component_pages_header">
      <button @click="handleFormSave">保存</button>
      <button @click="handleFormPre">预览</button>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { ElMessageBox, ElMessage } from "element-plus";
import _ from "@/utils/_";
export default defineComponent({
  setup() {
    let store = useStore();
    let allFormList = computed(() => store.getters.getAllFormList);
    const open = (message: string, title: string) => {
      ElMessageBox.alert(message, title, {
        confirmButtonText: "OK",
      });
    };
    let handleFormSave = () => {
      let result: any[] = [];
      allFormList.value.forEach((item: any) => {
        result.push({
          data: item.data,
          ControlType: item.ControlType,
          id: _.generateMixed(8),
        });
      });
     localStorage.setItem("formResult", JSON.stringify(result));
    };
    let handleFormPre = () => {
      handleFormSave();
      store.commit("openPreview", true);
      store.commit("handleDynamicForm");
    };
    return {
      handleFormSave,
      handleFormPre,
    };
  },
});
</script>
<style lang="scss" scoped>
.editorHeadTop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: $editor_header_top;
  //   background: green;
  .component_pages_header {
    width: 100%;
    height: 100%;
    box-shadow: 0 2px 3px 0 hsla(0, 0%, 39.2%, 0.06);
  }
}
</style>
