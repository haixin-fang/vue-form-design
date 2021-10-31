<template>
  <div class="editorHeadTop">
    <div class="component_pages_header">
      <button @click="handleFormSave">保存</button>
      <button @click="handleFormPre">预览</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed} from "vue";
import { useStore } from "vuex";
import _ from "@/utils/_";
export default defineComponent({
  setup() {
    let store = useStore();
    const formUpdate = computed(() => store.state.form.formUpdate)
    let handleFormSave = () => {
      debugger
      if (store.state.form.save && !formUpdate.value) {
        _.open("已保存，请不要重复保存");
      } else {
        if(store.state.form.save){
          store.commit('setSave', false)
        }else{
          store.commit('setSave', true)
        }
      }
    };
    let handleFormPre = () => {
      store.commit("openPreview", true);
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
