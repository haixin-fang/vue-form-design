<template>
  <div class="starfish-formitem" :class="drag?'formCover': ''">
    <div class="label">
      <label>{{ item.data.label }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="bottom-start">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control">
      <el-switch v-model="item.data.default" v-if="drag" />
      <el-switch v-model="data[item.data.fieldName]" v-if="!drag" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  ControlType: "Switch", // 必须与文件名匹配
  nameCn: "开关",
  icon: "icon-kaiguanguan",
  formConfig: {
    data() {
      return {
        fieldName: "",
        label: "标签名称",
        tip: "",
        value: '',
        showRule: "{}",
        required: false,
        rule: "[]",
        default:  false,
      };
    },
    morenConfig() {
      return [
        {
          ControlType: "Switch",
          data: {
            fieldName: "default",
            tip: "",
            label: "默认值",
            showRule: "{}",
            required: false,
            default: false,
            rule: "[]",
          },
        }
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
