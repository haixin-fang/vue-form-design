<template>
  <div class="starfish-formitem">
    <div class="label">
      <label>{{ item.data.label }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="bottom-start">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control">
      <el-input type="textarea" v-model="item.data.default" :placeholder="item.data.placeholder" v-if="drag" />
      <el-input type="textarea" v-model="data[item.data.fieldName]" :placeholder="item.data.placeholder" v-if="!drag" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  ControlType: "TextArea", // 必须与文件名匹配
  nameCn: "文本域",
  icon: "icon-textarea",
  formConfig: {
    data() {
      return {
        fieldName: "",
        label: "标签名称",
        tip: "",
        placeholder: "",
        showRule: "{}",
        required: false,
        rule: "[]",
        default: "",
      };
    },
    morenConfig() {
      return [
        {
          ControlType: "Text",
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
        {
          ControlType: "Text",
          data: {
            fieldName: "placeholder",
            tip: "",
            label: "输入占位文字",
            placeholder: "请输入占位文字",
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
});
</script>
