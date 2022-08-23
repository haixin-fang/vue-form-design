<template>
  <div class="starfish-formitem divider" :class="drag ? 'formCover' : ''">
    <div class="control">
      <div :style="{ color: item.data.color }">{{ item.data.label }}</div>
      <el-divider class="divider" :style="{ background: item.data.dividerColor }"></el-divider>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../utils/fieldConfig";
  import fieldProps from "../utils/fieldProps";
  import { useWatch } from "../utils/customHooks";
  export default defineComponent({
    ControlType: "Divider", // 必须与文件名匹配
    nameCn: "分割标题",
    icon: "icon-fengexian1",
    layout: true,
    formConfig: getFormConfig("Divider", [
      { fieldName: "color", component: "ColorSelect", label: "颜色设置" },
      { fieldName: "dividerColor", component: "ColorSelect", label: "线条颜色设置" },
    ], ['required', 'tip', 'rule']),
    props: {
      ...fieldProps,
    },
    setup(props) {
      useWatch(props);
    },
  });
</script>
