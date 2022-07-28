<template>
  <div class="starfish-formitem" :class="drag ? 'formCover' : ''">
    <div class="control">
      <div :style="{ color: item.data.color }">{{ item.data.label }}</div>
      <div class="divider" :style="{ background: item.data.dividerColor }"></div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  export default defineComponent({
    ControlType: "Divider", // 必须与文件名匹配
    nameCn: "分割标题",
    icon: "icon-fengexian1",
    formConfig: getFormConfig("Divider", [
      { fieldName: "default", component: "Text" },
      { fieldName: "color", component: "ColorSelect" },
      { fieldName: "dividerColor", component: "ColorSelect" },
    ]),
    props: {
      ...fieldProps,
    },
    setup(props) {
      useWatch(props.data);
    },
  });
</script>
<style scoped lang="scss">
  .starfish-formitem {
    top: 6px;
  }
  .control {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: bold;
    padding: 10px 0;
    .divider {
      flex: 1;
      height: 2px;
      background: #000;
      border-radius: 2px;
      margin-left: 10px;
    }
  }
</style>
