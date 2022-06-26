<template>
  <div class="nav">
    <div class="logo">starfish-vue3-lowcode</div>
    <div class="detailBtn">
      <el-button plain @click="handleFormSave" size="small">保存</el-button>
      <el-button plain @click="handleFormPre" size="small">预览</el-button>
    </div>
    <!-- <el-button type="primary" plain @click="handleShortKey('copy')" >复制</el-button>
        <el-button type="primary" plain @click="handleShortKey('paste')" >粘贴</el-button>
        <el-button type="primary" plain @click="handleShortKey('cut')" >剪切</el-button>
        <el-button type="primary" plain @click="handleShortKey('onDelete')" >删除</el-button>
        <el-button type="primary" plain @click="handleShortKey('onTop')" >下移</el-button>
        <el-button type="primary" plain @click="handleShortKey('onBottom')" >上移</el-button> -->
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
  .nav {
    height: $editor_nav;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $editor-nav-background-color;
    border-bottom: 1px solid #d8dee8;
    padding: 0 15px;
    .logo{
      font-size: 20px;
      font-style: italic;
      color: #409eff;
      font-weight: bold;
    }
  }
</style>
