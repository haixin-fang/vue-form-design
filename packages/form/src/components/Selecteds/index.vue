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
      <el-select v-model="item.data.itemConfig.value" :placeholder="item.data.placeholder" v-if="drag" multiple :size="size">
        <el-option v-for="items in item.data.itemConfig.items" :key="items.value" :label="items.label" :value="items.value" />
      </el-select>
      <el-select v-model="data[item.data.fieldName]" :placeholder="item.data.placeholder" v-if="!drag" multiple :size="size">
        <el-option v-for="items in item.data.itemConfig.items" :key="items.value" :label="items.label" :value="items.value" />
      </el-select>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  export default defineComponent({
    ControlType: "Selecteds", // 必须与文件名匹配
    nameCn: "选择器多选",
    icon: "icon-xuanzeqi",
    formConfig: getFormConfig("Selecteds", [
      { fieldName: "placeholder", component: "Text" },
      { fieldName: "itemConfig", component: "KeyValueConfigMult" },
    ]),
    props: {
      ...fieldProps,
    },
    setup(props) {
      useWatch(props.data);
    },
  });
</script>
