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
      <div v-if="drag">
        <el-input v-model="item.data.default" :placeholder="item.data.placeholder" size="small" />
        <el-color-picker v-model="item.data.default" show-alpha></el-color-picker>
      </div>
      <div v-if="!drag">
        <el-input v-model="data[item.data.fieldName]" :placeholder="item.data.placeholder" size="small" />
        <el-color-picker v-model="data[item.data.fieldName]" show-alpha></el-color-picker>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  export default defineComponent({
    ControlType: "ColorSelect", // 必须与文件名匹配
    nameCn: "颜色选择",
    icon: "icon-sen103",
    formConfig: getFormConfig("ColorSelect", [{ fieldName: "default", component: "ColorSelect" }]),
    props: {
      ...fieldProps,
    },
    setup(props) {
      useWatch(props.data);
    },
  });
</script>
<style scoped lang="scss">
  .control {
    width: 240px;
    > div {
      display: flex;
      align-items: center;
    }
  }
</style>
