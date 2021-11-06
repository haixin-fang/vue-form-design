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
      <el-input-number v-model="item.data.default" :controls-position="item.data.type == 2?'right':''" :size="item.data.size" v-if="drag" />
      <el-input-number v-model="data[item.data.fieldName]" v-if="!drag" :controls-position="item.data.type == 2?'right':''" :size="item.data.size" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  ControlType: "InputNumber", // 必须与文件名匹配
  nameCn: "计数器",
  icon: "icon-jishuqi",
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
        default: 0,
        type: 1,
        size: 'large'
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
          ControlType: "Radio",
          data: {
            fieldName: "type",
            tip: "",
            label: "按钮位置",
            placeholder: "",
            showRule: "{}",
            required: false,
            rule: "[]",
            itemConfig: {
              value: "1",
              id: 1,
              items: [
                {
                  label: "默认",
                  value: "1",
                  select: true,
                  id: 1,
                },
                {
                  label: "右边",
                  value: "2",
                  select: false,
                  id: 2,
                },
              ],
            },
          },
        },
        {
          ControlType: "Radio",
          data: {
            fieldName: "size",
            tip: "",
            label: "计数器尺寸类型",
            placeholder: "",
            showRule: "{}",
            required: false,
            rule: "[]",
            itemConfig: {
              value: "large",
              id: 1,
              items: [
                {
                  label: "large",
                  value: "large",
                  select: true,
                  id: 1,
                },
                {
                  label: "medium",
                  value: "medium",
                  select: false,
                  id: 2,
                },
                {
                  label: "small",
                  value: "small",
                  select: false,
                  id: 3,
                },
                {
                  label: "mini",
                  value: "mini",
                  select: false,
                  id: 4,
                },
              ],
            },
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
      handler() {
        this.$emit("change");
      },
      deep: true,
    },
  },
});
</script>
