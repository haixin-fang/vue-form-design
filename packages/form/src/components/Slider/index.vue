<template>
  <div class="starfish-formitem" :class="{ formCover: drag, 'starfish-vertical': labelalign != 'top', [item.data.csslist?.join(' ')]: !!item.data.csslist}">
    <div class="label" :class="'label_' + labelalign" :style="{width: labelWidth + 'px'}">
      <label>{{ item.data.label }}{{suffix}}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="top">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control"  :style="{marginLeft: labelalign != 'top'?(labelWidth ) + 'px': ''}">
      <el-slider v-model="item.data.default" v-if="drag" :min="Number(item.data.min)" :max="Number(item.data.max)" :size="size"></el-slider>
      <el-slider v-model="data[item.data.fieldName]" v-if="!drag" :min="Number(item.data.min)" :max="Number(item.data.max)" :size="size"></el-slider>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  export default defineComponent({
    ControlType: "Slider", // 必须与文件名匹配
    nameCn: "滑块",
    icon: "icon-icon_huakuai",
    formConfig: getFormConfig("Slider", [
      { fieldName: "default", component: "InputNumber" },
      { fieldName: "min", component: "Text" },
      { fieldName: "max", component: "Text" },
    ]),
    props: {
      ...fieldProps,
    },
    setup(props) {
      useWatch(props.data);
    },
  });
</script>
