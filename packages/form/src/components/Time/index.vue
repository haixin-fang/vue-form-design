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
      <el-time-select v-model="item.data.default" start="08:30" step="00:15" end="18:30" :placeholder="item.data.placeholder" v-if="drag"></el-time-select>
      <el-time-select v-model="data[item.data.fieldName]" start="08:30" step="00:15" end="18:30" :placeholder="item.data.placeholder" v-if="!drag"></el-time-select>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import fieldProps from '../../utils/fieldProps';
export default defineComponent({
  ControlType: "Time", // 必须与文件名匹配
  nameCn: "时间选择",
  icon: "icon-shijian",
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
          ControlType: "Time",
          data: {
            fieldName: "default",
            tip: "",
            label: "默认值",
            placeholder: "请输入",
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
    ...fieldProps
  },
  watch: {
    data: {
      handler() {
        this.$emit("change");
      },
      deep: true,
    },
  },
});
</script>
