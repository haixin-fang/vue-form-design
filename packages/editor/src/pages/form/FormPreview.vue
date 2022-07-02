<template>
  <teleport to="body">
    <CustomDialog ref="previewDialog" :showDialog="previewShow" @close="handlePreviewShow">
      <div class="previewList">
        <div>
          <dynamicform :formResult="formResult" :allFormList="allFormList" ref="dynamicform" />
        </div>
        <div>
          <div ref="JsonViewerDialog" ></div>
        </div>
      </div>
    </CustomDialog>
  </teleport>
</template>
<script lang="ts">
  import { computed, defineComponent, nextTick, ref, watch, getCurrentInstance } from "vue";
  // import dynamicform from "~editor/dynamicform/index.vue";
  import formStore from "@/store/form";
  import { Dynamicform } from "starfish-form";
  import uiControl from "@/controller/ui";
  export default defineComponent({
    components: {
      Dynamicform,
    },
    setup() {
      const previewShow = computed(() => formStore.get("previewShow"));
      const allFormList = computed(() => formStore.get("AllFormResult"));
      const formResult = computed(() => formStore.get("formResult"));
      const {proxy} = getCurrentInstance() as any;
      const dynamicform = ref();
      const previewDialog = ref<any>();
      let editor: any = null;
      const handlePreviewShow = () => {
        formStore.set("previewShow", false);
      };
      const handleFormResult = () => {
        // 配置组件时动态表单提交时进行校验
        dynamicform.value.ruleForm.validate(() => {
          console.log(dynamicform.value);
        });
      };

      watch(previewShow, async () => {
        if (!previewShow.value) {
          previewDialog.value.close();
        } else {
          previewDialog.value.init("表单预览", "icon-biaodan");
          await nextTick();
          const options = {
            modes: ["text"],
            mode: "code",
            search: false,
          };
          editor = new window.JSONEditor(JsonViewerDialog.value, options);
          editor?.set(proxy.$Flex.deepClone(formResult.value))
        }
      });

      watch(
        () => formResult,
        () => {
          console.log(333);
          editor?.set(proxy.$Flex.deepClone(formResult.value))
        },
        {
          deep: true,
        }
      );

      const JsonViewerDialog = ref();
      return {
        dialogWidth: computed(() => uiControl?.get("dialogWidth")),
        previewShow,
        previewDialog,
        handlePreviewShow,
        handleFormResult,
        JsonViewerDialog,
        allFormList,
        formResult,
        dynamicform,
      };
    },
  });
</script>
<style lang="scss">
  .previewList {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background: #f0f2f5;
    >div:first-child {
      width: 30%;
      height: 100%;
      background: white;
      overflow: auto;
    }
    >div:nth-child(2){
      width: 70%;
      height: 100%;
      display: flex;
      justify-content: center;
      >div{
        width: 60%;
      }
    }
  }
  .formconfig {
    height: 100%;
    overflow: scroll;
    @include scrollbar();
    .el-form {
      padding-bottom: 0;
    }
  }
</style>
