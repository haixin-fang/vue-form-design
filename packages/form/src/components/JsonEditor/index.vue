<template>
  <div class="starfish-formitem" :class="drag ? 'formCover' : ''">
    <div class="label">
      <label>{{ item.data.label }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="bottom-start">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control">
      <div id="jsoneditor" ref="jsoneditor">
        <div class="fullScreen" @click="showCustomDialog">
          <i class="iconfont icon-quanping"></i>
        </div>
      </div>
    </div>
    <CustomDialog ref="myDialog" :width="500">
      <el-main style="padding: 0">
        <el-container style="height: 100%">
          <el-main class="my-pageMain">
            <div ref="JsonViewerDialogDom" style="height: calc(100% - 24px)"></div>
          </el-main>
          <el-footer class="my-Footer" style="height: 60px; padding-top: 10px; text-align: right">
            <el-button type="primary" @click="saveJson">保存</el-button>
            <el-button @click="closeDialog">关闭</el-button>
          </el-footer>
        </el-container>
      </el-main>
    </CustomDialog>
  </div>
</template>
<script lang="ts">
  import { defineComponent, watch, ref, nextTick, onMounted } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  import _ from "@/utils/_";
  interface jsonEditor {
    [key: string]: any;
  }
  export default defineComponent({
    ControlType: "JsonEditor", // 必须与文件名匹配
    nameCn: "JSON编辑",
    icon: "icon-json-full",
    rule: _.getJsonValidate(),
    formConfig: getFormConfig("JsonEditor", [{ fieldName: "default", component: "JsonEditor" }]),
    props: {
      ...fieldProps,
    },
    setup(props) {
      /**
       * json dom
       */
      const jsoneditor = ref<jsonEditor>({});
      /**
       * dialog 初始化jsoneditor对象
       */
      const jsonEditorDialog = ref<jsonEditor>({});
      /**
       * jsoneditor对象
       */
      const jsonEditors = ref<jsonEditor>();
      /**
       * dialog dom
       */
      const JsonViewerDialogDom = ref<any>();
      const myDialog = ref<any>();
      useWatch(props.data);
      function initJson() {
        const container = jsoneditor.value;
        const data: any = props.data;
        const item: any = props.item;
        const fieldName = item.data.fieldName;
        const options = {
          modes: ["text", "code", "view"],
          mode: "code",
          search: false,
          onChange() {
            data[fieldName] = jsonEditors.value?.getText();
          },
        };
        jsonEditors.value = new window.JSONEditor(container, options);
        if (props.drag) {
          jsonEditors.value?.set(_.tryParseJson(item.data.default));
        } else {
          jsonEditors.value?.set(_.tryParseJson(data[item.data.fieldName]));
        }
      }
      onMounted(() => {
        initJson();
      });
      watch(
        () => props.item,
        (newValue: any) => {
          if (props.drag) {
            jsonEditors.value?.set(_.tryParseJson(newValue.data.default));
          } else {
            const data: any = props.data;
            const item: any = props.item;
            jsonEditors.value?.set(_.tryParseJson(data[item.data.fieldName]));
          }
        }
      );
      return {
        myDialog,
        jsoneditor,
        JsonViewerDialogDom,
        async showCustomDialog() {
          const myDialogDom: any = myDialog.value;
          myDialogDom.show();
          myDialogDom.init("JSON编辑", "icon-json-full");
          await nextTick();
          const container = JsonViewerDialogDom.value;
          const options = {
            modes: ["text", "code", "view"],
            mode: "code",
            search: false,
          };
          jsonEditorDialog.value = new window.JSONEditor(container, options);
          jsonEditorDialog.value?.set(_.tryParseJson(jsoneditor.value.getText()));
        },
        closeDialog() {
          myDialog.value.close();
        },
        saveJson() {
          jsonEditors.value?.set(_.tryParseJson(jsonEditorDialog.value.getText()));
          const data: any = props.data;
          const item: any = props.item;
          const fieldName = item.data.fieldName;
          data[fieldName] = jsonEditors.value?.getText();
          myDialog.value.close();
        },
      };
    },
    // methods: {
    //   showCustomDialog() {
    //     const myDialog: any = this.$refs.myDialog;
    //     myDialog.show();
    //     myDialog.init("JSON编辑", "icon-json-full");
    //     this.$nextTick(() => {
    //       const container = this.$refs.JsonViewerDialog;
    //       const options = {
    //         modes: ["text", "code", "view"],
    //         mode: "code",
    //         search: false,
    //       };
    //       this.jsonEditorDialog = new window.JSONEditor(container, options);
    //       this.jsonEditorDialog.set(_.tryParseJson(this.jsonEditor.getText()));
    //     });
    //   },
    // closeDialog() {
    //   const myDialog: any = this.$refs.myDialog;
    //   myDialog.close();
    // },
    // saveJson() {
    //   this.jsonEditor.set(_.tryParseJson(this.jsonEditorDialog.getText()));
    //   const data: any = this.data;
    //   const item: any = this.item;
    //   const fieldName = item.data.fieldName;
    //   data[fieldName] = this.jsonEditor.getText();
    //   const myDialog: any = this.$refs.myDialog;
    //   myDialog.close();
    // },
    // initJson() {
    //   const container = this.$refs.jsoneditor;
    //   const data: any = this.data;
    //   const item: any = this.item;
    //   const fieldName = item.data.fieldName;
    //   const that = this;
    //   const options = {
    //     modes: ["text", "code", "view"],
    //     mode: "code",
    //     search: false,
    //     onChange() {
    //       data[fieldName] = that.jsonEditor.getText();
    //     },
    //   };
    //   this.jsonEditor = new window.JSONEditor(container, options);
    //   if (this.drag) {
    //     this.jsonEditor.set(_.tryParseJson(item.data.default));
    //   } else {
    //     this.jsonEditor.set(_.tryParseJson(data[item.data.fieldName]));
    //   }
    // },
    // },
    // mounted() {
    //   this.initJson();
    // },
  });
</script>
<style scoped lang="scss">
  #jsoneditor {
    position: relative;
    z-index: 1;
    .fullScreen {
      position: absolute;
      right: 10px;
      line-height: 1;
      z-index: 2;
      top: 10px;
      color: white;
      font-size: 18px;
    }
  }
</style>
