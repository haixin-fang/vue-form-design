<template>
  <div class="starfish-formitem" :class="{ formCover: drag, 'starfish-vertical': labelalign != 'top', [item.data.csslist?.join(' ')]: !!item.data.csslist}">
    <div class="label" :class="'label_' + labelalign" :style="{width: labelWidth + 'px'}">
      <label>{{ item.data.label }}{{suffix}}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="top">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control" :style="{marginLeft: labelalign != 'top'?labelWidth + 'px': ''}">
      <el-time-select v-model="item.data.default" start="08:30" step="00:15" end="18:30" :size="size" :placeholder="item.data.placeholder" v-if="drag"></el-time-select>
      <el-time-select v-model="data[item.data.fieldName]" start="08:30" step="00:15" end="18:30" :size="size" :placeholder="item.data.placeholder" v-if="!drag"></el-time-select>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import fieldProps from "../../utils/fieldProps";
  import { getFormConfig } from "../../utils/fieldConfig";
  import { useWatch } from "../../utils/customHooks";
  export default defineComponent({
    ControlType: "Time", // 必须与文件名匹配
    nameCn: "时间选择",
    icon: "icon-shijian",
    formConfig: getFormConfig("DateTime", [
      { fieldName: "default", component: "Time" },
      { fieldName: "placeholder", component: "Text" },
    ]),
    props: {
      ...fieldProps,
    },
    setup(props) {
      useWatch(props.data);
    },
  });
</script>
