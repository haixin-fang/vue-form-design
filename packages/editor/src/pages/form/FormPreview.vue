<template>
  <CustomDialog ref="previewDialog" :showDialog="previewShow" @close="handlePreviewShow">
    <!-- <div class="previewList">
        <div> -->
    <!-- </div> -->
    <!-- <div>
          <div ref="JsonViewerDialog" ></div>
        </div> -->
    <!-- </div> -->
    <div class="page_box" :class="pageType + '_layout'">
      <dynamicform :formResult="formResult" :allFormList="allFormList" ref="dynamicform" />
    </div>
    <el-footer class="my-Footer" style="text-align: center">
      <el-button type="primary" @click="resetForm">重置表单</el-button>
      <el-button type="primary" @click="getData">获取数据</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </el-footer>
    <custom-dialog ref="codeDialog" dialogclass="codeDialog" width="1000">
      <div class="custom_code">
        <codemirror v-model="code" placeholder="Code goes here..." :style="{ height: '400px' }" :autofocus="true" :indent-with-tab="true" :tab-size="2" />
      </div>
      <el-footer class="my-Footer" style="text-align: center">
        <el-button type="primary" @click="copyJson" class="copy_btn" data-clipboard-action="copy"
        :data-clipboard-text="code">复制json</el-button>
        <el-button type="primary" @click="saveFile">保存为文件</el-button>
        <el-button @click="closeCodeDialog">关闭</el-button>
      </el-footer>
    </custom-dialog>
  </CustomDialog>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, watch } from "vue";
  import formStore from "@/store/form";
  import { Dynamicform } from "starfish-form";
  import uiControl from "@/controller/ui";
  import Clipboard from 'clipboard'
  // import { Codemirror } from "vue-codemirror";
  // import { json } from "@codemirror/lang-json";
  export default defineComponent({
    components: {
      Dynamicform,
      // Codemirror,
    },
    setup() {
      const previewShow = computed(() => formStore.get("previewShow"));
      const allFormList = computed(() => formStore.get("AllFormResult"));
      const formResult = computed(() => formStore.get("formResult"));
      const pageType = computed(() => uiControl?.get("pageType"));
      const codeDialog = ref();
      const code = ref();
      // const extensions = [json()];
      const dynamicform = ref();
      const previewDialog = ref<any>();
      // let editor: any = null;
      const handlePreviewShow = () => {
        formStore.set("previewShow", false);
      };

      watch(previewShow, async () => {
        if (!previewShow.value) {
          previewDialog.value.close();
        } else {
          previewDialog.value.init("表单预览", "icon-biaodan");
          previewDialog.value.isFullScreen = true;
        }
      });
      const JsonViewerDialog = ref();
      return {
        // extensions,
        code,
        pageType,
        codeDialog,
        dialogWidth: computed(() => uiControl?.get("dialogWidth")),
        previewShow,
        previewDialog,
        handlePreviewShow,
        JsonViewerDialog,
        allFormList,
        formResult,
        dynamicform,
        resetForm() {
          dynamicform.value.reset();
        },
        closeDialog() {
          previewDialog.value.close();
        },
        getData() {
          dynamicform.value?.getValidate().then((valide: boolean) => {
            if (valide) {
              console.log("formResult", formResult.value);
              code.value = JSON.stringify(formResult?.value || {}, null, 4);
              codeDialog.value.show();
              codeDialog.value.init("表单数据", "icon-biaodan");
            } else {
              window.VApp.$message.error("校验失败");
            }
          });
        },
        closeCodeDialog() {
          codeDialog.value.close();
        },
        copyJson() {
          debugger
          const clipboard:any = new Clipboard(".copy_btn");
          clipboard.on("success", () => {
            window.VApp.$message.success("复制成功");
          });
          clipboard.on("error", (e) => {
            console.error(e)
            window.VApp.$message.error("复制失败");
          });
          setTimeout(() => {
            // 销毁实例
            clipboard.destroy();
          }, 20000);
        },
        saveFile(fileName = "demo.json") {
          let content = "data:application/json;charset=utf-8,";
          try {
            const result = code.value;
            content += result;
            const encodedUri = encodeURI(content);
            const actions = document.createElement("a");
            actions.setAttribute("href", encodedUri);
            actions.setAttribute("download", fileName);
            actions.click();
            window.VApp.$message.success("文件保存成功");
          } catch (e) {
            window.VApp.$message.error("文件保存失败");
          }
        },
      };
    },
  });
</script>
<style lang="scss">
  .previewList {
    // display: flex;
    // justify-content: space-between;
    // height: 100%;
    background: #f0f2f5;
    // >div:first-child {
    //   width: 30%;
    //   height: 100%;
    //   background: white;
    //   overflow: auto;
    // }
    // >div:nth-child(2){
    //   width: 70%;
    //   height: 100%;
    //   display: flex;
    //   justify-content: center;
    //   >div{
    //     width: 60%;
    //   }
    // }
  }
  .page_box {
    height: 85%;
    margin: 0 auto;
    overflow-y: auto;
    &.PC_layout {
      width: 100%;
      border: 10px solid transparent;
    }
    &.Pad_layout {
      width: 800px;
      border-radius: 15px;
      border: 10px solid #495060;
    }
    &.H5_layout {
      width: 443px;
      border-radius: 15px;
      border: 10px solid #495060;
    }
  }
  .custom_code {
    padding: 15px;
  }
  .my-Footer {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .codeDialog {
    height: auto !important;
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
