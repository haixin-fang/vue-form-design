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
      <el-date-picker v-model="item.data.default" type="date" :placeholder="item.data.placeholder"  v-if="drag">
      </el-date-picker>
      <el-date-picker v-model="data[item.data.fieldName]" type="date" :placeholder="item.data.placeholder"  v-if="!drag">
      </el-date-picker>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  ControlType: "Date", // 必须与文件名匹配
  nameCn: "日期选择",
  icon: "icon-24gl-calendar",
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
          ControlType: "Date",
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
    drag: Boolean,
    data: Object,
    item: Object,
  },
  watch: {
    data: {
      handler(){
        this.$emit('change')
      },
      deep: true
    }
  },
});
</script>
