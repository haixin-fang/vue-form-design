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
      <div  v-if="drag">
        <el-input v-model="item.data.default" :placeholder="item.data.placeholder" size="small" />
        <el-color-picker v-model="item.data.default"  show-alpha ></el-color-picker>
      </div>
      <div v-if="!drag" >
        <el-input v-model="data[item.data.fieldName]" :placeholder="item.data.placeholder" size="small"/>
        <el-color-picker v-model="data[item.data.fieldName]"  show-alpha></el-color-picker>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  ControlType: "ColorSelect", // 必须与文件名匹配
  nameCn: "颜色选择",
  icon: "icon-sen103",
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
        default: '#409EFF',
      };
    },
    morenConfig() {
      return [
        {
          ControlType: "ColorSelect",
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
<style scoped lang='scss'>
.control{
  width: 240px;
  >div{
    display: flex;
    align-items: center;
  }
}
</style>
