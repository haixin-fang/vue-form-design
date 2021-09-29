<template>
  <div class="starfish-formitem">
    <div class="label">
      <label>{{ item.data.label }}</label>
    </div>
    <div class="control">
      <el-input v-model="item.data.default" :placeholder="item.data.placeholder" v-if="drag" />
      <el-input v-model="data[item.data.fieldName]" :placeholder="item.data.placeholder" v-if="!drag" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  ControlType: "Text", // 必须与文件名匹配
  nameCn: "文本框",
  icon: "icon-wenbenkuang",
  formConfig: {
    data() {
      return {
        fieldName: "",
        label: "标签名称",
        tip: "",
        placeholder: "请输入",
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
            label: "输入提示",
            placeholder: "请输入输入提示",
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
