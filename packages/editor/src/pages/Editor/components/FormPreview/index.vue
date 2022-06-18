<template>
  <CustomDialog ref="previewDialog" :showDialog="previewShow" @close="handlePreviewShow">
    <div class="formconfig">
      <dynamicform :formResult="formResult" :allFormList="allFormList" ref="dynamicform" />
    </div>
    <el-footer class="my-Footer" style="height: 60px; padding-top: 10px; text-align: right">
      <el-button type="primary" @click="ImitateSubmit">模拟提交</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </el-footer>
  </CustomDialog>
  <CustomDialog ref="myDialog">
    <el-main style="padding: 0">
      <el-container style="height: 100%">
        <el-main class="my-pageMain">
          <div ref="JsonViewerDialog" style="height: calc(100% - 24px)"></div>
        </el-main>
      </el-container>
    </el-main>
  </CustomDialog>
</template>
<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from "vue";
import dynamicform from "~editor/dynamicform/index.vue";
import { useStore } from "vuex";
import _ from "@/utils/_";
export default defineComponent({
  components: {
    dynamicform,
  },
  setup() {
    const store = useStore();
    const previewShow = computed(() => store.state.form.previewShow);
    const allFormList = computed(() => store.state.form.AllFormResult);
    const formResult = computed(() => store.state.form.formResult);
    const dynamicform = ref();
    const previewDialog = ref<any>();
    const handlePreviewShow = () => {
      store.state.form.previewShow = false;
    };
    const handleFormResult = () => {
      // 配置组件时动态表单提交时进行校验
      dynamicform.value.ruleForm.validate((valid: any, errFields: any) => {
        console.log(dynamicform.value);
      });
    };
    watch(previewShow, () => {
      if (!previewShow.value) {
        previewDialog.value.close();
      } else {
        previewDialog.value.init("表单预览", "icon-biaodan");
      }
    });

    // 模拟提交
    const myDialog = ref();
    const JsonViewerDialog = ref();
    const jsonEditorDialog = ref();
    const ImitateSubmit = async () => {
      myDialog.value.show();
      myDialog.value.init("模拟提交的假数据", "icon-json-full");
      await nextTick();
      const options = {
        modes: ["text"],
        mode: "code",
        search: false,
      };
      debugger
      const editor = new window.JSONEditor(JsonViewerDialog.value, options);
      editor.set(_.tryParseJson(JSON.stringify(formResult.value)));
    };

    const closeDialog = () => {
      store.commit('setPreviewShow', false)
    }
    return {
      previewShow,
      previewDialog,
      handlePreviewShow,
      handleFormResult,
      ImitateSubmit,
      closeDialog,
      jsonEditorDialog,
      JsonViewerDialog,
      myDialog,
      allFormList,
      formResult,
      dynamicform,
    };
  },
});
</script>
<style lang="scss">
.formconfig {
  height: 100%;
  overflow: scroll;
  @include scrollbar();
  .el-form {
    padding-bottom: 0;
  }
}
.submit {
  position: absolute;
  width: 150px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  bottom: 0;
}
</style>
