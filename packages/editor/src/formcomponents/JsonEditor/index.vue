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
    <CustomDialog ref="myDialog">
      <el-main style="padding: 0">
        <el-container style="height: 100%">
          <el-main class="my-pageMain">
            <div ref="JsonViewerDialog" style="height: calc(100% - 24px)"></div>
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
import { defineComponent } from "vue";
import _ from "@/utils/_";
export default defineComponent({
  ControlType: "JsonEditor", // 必须与文件名匹配
  nameCn: "JSON编辑",
  icon: "icon-json-full",
  rule: _.getJsonValidate(),
  formConfig: {
    data() {
      return {
        fieldName: "",
        label: "标签名称",
        tip: "",
        showRule: "{}",
        required: false,
        rule: "[]",
        default: "[]",
        json: true,
      };
    },
    morenConfig() {
      return [
        {
          ControlType: "JsonEditor",
          data: {
            fieldName: "default",
            tip: "",
            label: "默认值",
            placeholder: "",
            showRule: "{}",
            required: false,
            rule: "[]",
          },
        },
      ];
    },
  },
  props: {
    drag: Boolean,
    data: Object,
    item: Object,
  },
  data() {
    interface jsonEditor {
      [key: string]: any;
    }
    const jsonEditorType: jsonEditor = {};
    return {
      jsonEditor: jsonEditorType,
      jsonEditorDialog: jsonEditorType,
    };
  },
  watch: {
    item: {
      handler(newValue) {
        if (this.drag) {
          this.jsonEditor.set(_.tryParseJson(newValue.data.default));
        } else {
          const data: any = this.data;
          const item: any = this.item;
          this.jsonEditor.set(_.tryParseJson(data[item.data.fieldName]));
        }
      },
      deep: true,
    },
    data: {
      handler() {
        this.$emit("change");
      },
      deep: true,
    },
  },
  methods: {
    showCustomDialog() {
      const myDialog: any = this.$refs.myDialog;
      myDialog.show();
      myDialog.init("JSON编辑", "icon-json-full");
      this.$nextTick(() => {
        const container = this.$refs.JsonViewerDialog;
        const options = {
          modes: ["text", "code", "view"],
          mode: "code",
          search: false,
        };
        this.jsonEditorDialog = new window.JSONEditor(container, options);
        this.jsonEditorDialog.set(_.tryParseJson(this.jsonEditor.getText()));
      });
    },
    closeDialog() {
      const myDialog: any = this.$refs.myDialog;
      myDialog.close();
    },
    saveJson() {
      this.jsonEditor.set(_.tryParseJson(this.jsonEditorDialog.getText()));
      const data: any = this.data;
      const item: any = this.item;
      const fieldName = item.data.fieldName;
      data[fieldName] = this.jsonEditor.getText();
      const myDialog: any = this.$refs.myDialog;
      myDialog.close();
    },
    initJson() {
      const container = this.$refs.jsoneditor;
      const data: any = this.data;
      const item: any = this.item;
      const fieldName = item.data.fieldName;
      const that = this;
      const options = {
        modes: ["text", "code", "view"],
        mode: "code",
        search: false,
        onChange() {
          data[fieldName] = that.jsonEditor.getText();
        },
      };
      this.jsonEditor = new window.JSONEditor(container, options);
      if (this.drag) {
        this.jsonEditor.set(_.tryParseJson(item.data.default));
      } else {
        this.jsonEditor.set(_.tryParseJson(data[item.data.fieldName]));
      }
    },
  },
  mounted() {
    this.initJson();
  },
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
