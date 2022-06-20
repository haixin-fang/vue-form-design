<template>
  <div class="editorHeadTop">
    <div class="component_pages_header">
      <el-footer class="my-Footer" style="height: 60px; padding-top: 10px; text-align: right; display: flex; justify-content: center; align-items: center">
        <el-button type="primary" plain @click="handleFormSave">保存</el-button>
        <el-button type="primary" plain @click="handleFormPre">预览</el-button>
        <!-- <el-button type="primary" plain @click="handleShortKey('copy')" >复制</el-button>
        <el-button type="primary" plain @click="handleShortKey('paste')" >粘贴</el-button>
        <el-button type="primary" plain @click="handleShortKey('cut')" >剪切</el-button>
        <el-button type="primary" plain @click="handleShortKey('onDelete')" >删除</el-button>
        <el-button type="primary" plain @click="handleShortKey('onTop')" >下移</el-button>
        <el-button type="primary" plain @click="handleShortKey('onBottom')" >上移</el-button> -->
      </el-footer>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, getCurrentInstance } from "vue";
  import formStorm from "@/store/form";
  import _ from "@/utils/_";
  export default defineComponent({
    setup() {
      const { proxy } = getCurrentInstance() as any;
      const formUpdate = computed(() => formStorm.get("formUpdate"));
      const handleFormSave = () => {
        if (formStorm.get("save") && !formUpdate.value) {
          _.open("已保存，请不要重复保存");
        } else {
          proxy.$EventBus.emit("setSave");
        }
      };
      const handleFormPre = () => {
        proxy.$EventBus.emit("openPreview");
      };

      // let handleShortKey = (type: string) => {
      //   let emue:any = {
      //     cut,
      //     paste,
      //     onDelete,
      //     onTop,
      //     onBottom,
      //     copy
      //   }
      //   emue[type]()
      // }
      return {
        handleFormSave,
        handleFormPre,
        // handleShortKey
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
