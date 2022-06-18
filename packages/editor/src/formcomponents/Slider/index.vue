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
      <el-slider v-model="item.data.default" v-if="drag" :min="Number(item.data.min)" :max="Number(item.data.max)"></el-slider>
      <el-slider v-model="data[item.data.fieldName]"  v-if="!drag" :min="Number(item.data.min)" :max="Number(item.data.max)"></el-slider>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  ControlType: "Slider", // 必须与文件名匹配
  nameCn: "滑块",
  icon: "icon-icon_huakuai",
  formConfig: {
    data() {
      return {
        fieldName: "",
        label: "标签名称",
        tip: "",
        showRule: "{}",
        required: false,
        rule: "[]",
        default: 0,
        min: 0,
        max: 100
      };
    },
    morenConfig() {
      return [
        {
          ControlType: "InputNumber",
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
            fieldName: "min",
            tip: "",
            label: "最小范围",
            placeholder: "",
            showRule: "{}",
            required: false,
            rule: "[]",
          },
        },
        {
          ControlType: "Text",
          data: {
            fieldName: "max",
            tip: "",
            label: "最大范围",
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