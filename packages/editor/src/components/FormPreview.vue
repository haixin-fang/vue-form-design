<template>
  <CustomDialog
    ref="previewDialog"
    :showDialog="previewShow"
    @close="handlePreviewShow"
    dialogclass="previewDialog"
  >
    <!-- <div class="previewList">
        <div> -->
    <!-- </div> -->
    <!-- <div>
          <div ref="JsonViewerDialog" ></div>
        </div> -->
    <!-- </div> -->
    <div class="page_box" :class="pageType + '_layout'">
      <dynamicform
        :formResult="formResult"
        :allFormList="allFormList"
        :globalConfig="globalDatas"
        ref="dynamicform"
      />
    </div>
    <el-footer class="my-Footer" style="text-align: center">
      <el-button type="primary" @click="resetForm">重置表单</el-button>
      <el-button type="primary" @click="getData">获取数据</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </el-footer>
    <custom-dialog ref="codeDialog" dialogclass="codeDialog" width="1000">
      <div class="custom_code">
        <codemirror
          v-model="code"
          placeholder="Code goes here..."
          mode="text/json"
          :style="{ height: '400px' }"
          :extensions="extensions"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
        />
      </div>
      <el-footer
        class="my-Footer"
        style="
          text-align: center;
          position: absolute;
          bottom: 0;
          width: 100%;
          display: flex;
          align-items: center;
        "
      >
        <el-button
          type="primary"
          @click="copyJson"
          class="copy_btn"
          data-clipboard-action="copy"
          :data-clipboard-text="code"
          >复制json</el-button
        >
        <el-button type="primary" @click="saveFile">保存为文件</el-button>
        <el-button @click="closeCodeDialog">关闭</el-button>
      </el-footer>
    </custom-dialog>
  </CustomDialog>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import formStore from "@/controller/form";
import { Dynamicform } from "starfish-form";
import uiControl from "@/controller/ui";
import Clipboard from "clipboard";
import { json } from "@codemirror/lang-json";
import { Codemirror } from "vue-codemirror";
export default defineComponent({
  components: {
    Dynamicform,
    Codemirror,
  },
  setup() {
    const previewShow = computed(() => formStore.get("previewShow"));
    const allFormList = computed(() => formStore.get("AllFormResult"));
    const formResult = computed(() => formStore.get("formResult"));
    const globalDatas = computed(() => formStore?.get("globalDatas"));
    const pageType = computed(() => uiControl?.get("pageType"));
    const extensions = [json()];
    const codeDialog = ref();
    const code = ref();
    let clipboard: Clipboard;
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
      extensions,
      code,
      pageType,
      codeDialog,
      globalDatas,
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
        if (!clipboard) {
          clipboard = new Clipboard(".copy_btn");
        }
        clipboard.on("success", () => {
          window.VApp.$message.success("复制成功");
        });
        clipboard.on("error", () => {
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
