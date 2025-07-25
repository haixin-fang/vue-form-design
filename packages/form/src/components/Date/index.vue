<template>
  <div class="starfish-formitem" :class="{ formCover: drag, 'starfish-vertical': labelalign != 'top', [item.data.csslist?.join(' ')]: !!item.data.csslist}">
    <div class="label" :class="'label_' + labelalign" :style="{width: labelWidth + 'px'}">
      <label>{{ item.data.label }}{{suffix}}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="top">
        <span class="tip iconfontui icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control" :style="{marginLeft: labelalign != 'top'?labelWidth + 'px': ''}">
      <el-date-picker v-model="item.data.default" type="date" :placeholder="item.data.placeholder" v-if="drag" :size="size"> </el-date-picker>
      <el-date-picker v-model="data[item.data.fieldName]" type="date" :placeholder="item.data.placeholder" v-if="!drag" :size="size"> </el-date-picker>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  export default defineComponent({
    ControlType: "Date", // 必须与文件名匹配
    nameCn: "日期选择",
    icon: "icon-24gl-calendar",
    formConfig: getFormConfig("Date", [
      { fieldName: "default", component: "Date" },
      { fieldName: "placeholder", component: "Text" },
    ]),
    actionType: ["onChange"],
    props: {
      ...fieldProps,
    },
    setup(props) {
      useWatch(props);
    },
  });
</script>
