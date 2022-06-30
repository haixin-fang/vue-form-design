<template>
  <div class="nav">
    <div class="logo">
      <!-- starfish-vue3-lowcode -->
    </div>
    <div class="detailBtn">
      <el-button plain @click="handleFormSave" size="small">保存</el-button>
      <el-button plain @click="handleFormPre" size="small">预览</el-button>
      <el-button plain @click="handleClear" size="small">清空</el-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, getCurrentInstance } from "vue";
  import formStorm from "@/store/form";
  import { clearCanvas } from "@/utils/formKeycon";
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

      return {
        handleFormSave,
        handleFormPre,
        handleClear: () => {
          clearCanvas()
        },
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
    .logo {
      font-size: 20px;
      font-style: italic;
      color: #409eff;
      font-weight: bold;
    }
  }
</style>
