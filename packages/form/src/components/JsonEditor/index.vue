<template>
  <div class="starfish-formitem" :class="drag ? 'formCover' : ''">
    <div class="label">
      <label>{{ item.data.label }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="top">
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
      let jsonEditorDialog:any = null;
      /**
       * jsoneditor对象
       */
      let jsonEditors:any = null;
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
            data[fieldName] = jsonEditors?.getText();
          },
        };
        jsonEditors = new window.JSONEditor(container, options);
        if (props.drag) {
          jsonEditors?.set(_.tryParseJson(item.data.default));
        } else {
          jsonEditors?.set(_.tryParseJson(data[item.data.fieldName]));
        }
      }
      onMounted(() => {
        initJson();
      });
      watch(
        () => props.item,
        (newValue: any) => {
          if (props.drag) {
            jsonEditors?.set(_.tryParseJson(newValue.data.default));
          } else {
            const data: any = props.data;
            const item: any = props.item;
            jsonEditors?.set(_.tryParseJson(data[item.data.fieldName]));
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
          jsonEditorDialog = new window.JSONEditor(container, options);
          jsonEditorDialog?.set(_.tryParseJson(jsoneditor.value.getText()));
        },
        closeDialog() {
          myDialog.value.close();
        },
        saveJson() {
          jsonEditors?.set(_.tryParseJson(jsonEditorDialog.getText()));
          const data: any = props.data;
          const item: any = props.item;
          const fieldName = item.data.fieldName;
          data[fieldName] = jsonEditors?.getText();
          myDialog.value.close();
        },
      };
    },
  });
</script>

