<template>
  <div class="nav">
    <div class="logo">
      starfish-vue3-lowcode
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
  /**
   * 2022.7.1想到的优化点
   * 新增json导入导出功能
   */
  export default defineComponent({
    setup() {
      const { proxy } = getCurrentInstance() as any;
      const formUpdate = computed(() => formStorm.get("formUpdate"));
      const handleFormSave = () => {
        /**
         * 2022.7.1想到的优化点
         * 保存逻辑应该可以优化
         * 1、可以重复保存,对程序来说无影响
         * 2、可以自动保存,如1min保存一次(前提是编辑页有改变)
         * 3、保存弹窗样式交互不行,需优化
         */
        if (formStorm.get("save") && !formUpdate.value) {
          proxy.$Flex.open("已保存，请不要重复保存");
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
          clearCanvas();
          formStorm.setFormCurrentIndex(-1);
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
