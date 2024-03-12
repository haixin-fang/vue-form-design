<template>
  <CustomDialog dialogclass="preview" ref="previewDialog" @close="handleDialogClose">
    <Dynamicform v-model="formResult" :allFormList="list" @change="handleFormUpdate" ref="dynamicform" style="height: 100%; overflow: auto"></Dynamicform>
    <el-footer class="my-Footer" style="text-align: center">
      <el-button @click="goBack" type="primary">关闭</el-button>
      <el-button type="primary" @click="resetForm">重置表单</el-button>
      <el-button type="primary" @click="getData">获取数据</el-button>
      <el-button type="primary" @click="goValidate">校验</el-button>
    </el-footer>
  </CustomDialog>
</template>
<script lang="ts">
  import { computed } from "vue";
  import { defineComponent, ref, Ref, getCurrentInstance, ComponentInternalInstance, onMounted } from "vue";
  import Store from "../Server";
  export default defineComponent({
    components:{Dynamicform: () => import("starfish-form")},
    setup() {
      const list = computed(() => Store?.get("allFormList"));
      const previewDialog = ref();
      const dynamicform = ref();
      const formResult: Ref<any> = ref({});
      const { proxy } = getCurrentInstance() as ComponentInternalInstance;
      onMounted(() => {
        previewDialog.value.init("表单预览", "icon-biaodan");
        previewDialog.value.isFullScreen = true;
        previewDialog.value.show();
      });
      return {
        formResult,
        previewDialog,
        dynamicform,
        list,
        goBack() {
          proxy?.$router.go(-1);
        },
        getData() {
          (window as any).VApp.$alert(formResult.value);
        },
        handleDialogClose() {
          (proxy as any).goBack();
        },
        resetForm() {
          dynamicform.value.reset();
        },
        goValidate() {
          dynamicform.value.getValidate();
        },
        handleFormUpdate() {
          console.log("表单更新回调");
        },
      };
    },
  });
</script>
<style lang="scss">
  .preview {
    width: 100%;
    height: 100%;
    position: relative;
    .btnlist {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-top: 1px solid rgb(190, 186, 186);
      background: white;
      padding: 10px 0;
      z-index: 1;
    }
  }
</style>
