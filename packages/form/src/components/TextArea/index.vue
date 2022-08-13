<template>
  <div class="starfish-formitem" :class="{ formCover: drag, 'starfish-vertical': labelalign != 'top'}">
    <div class="label" :class="'label_' + labelalign" :style="{width: labelWidth + 'px'}">
      <label>{{ item.data.label }}{{suffix}}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="top">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control" :style="{marginLeft: labelalign != 'top'?labelWidth + 'px': ''}">
      <el-input type="textarea" v-model="item.data.default" :placeholder="item.data.placeholder" v-if="drag" :size="size" />
      <el-input type="textarea" v-model="data[item.data.fieldName]" :placeholder="item.data.placeholder" v-if="!drag" :size="size"/>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  export default defineComponent({
    ControlType: "TextArea", // 必须与文件名匹配
    nameCn: "文本域",
    icon: "icon-textarea",
    formConfig: getFormConfig("TextArea", [
      { fieldName: "default", component: "Text" },
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
