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
      <el-input-number v-model="item.data.default" :controls-position="item.data.type == 2 ? 'right' : ''" :size="item.data.size" v-if="drag" />
      <el-input-number v-model="data[item.data.fieldName]" v-if="!drag" :controls-position="item.data.type == 2 ? 'right' : ''" :size="item.data.size" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  export default defineComponent({
    ControlType: "InputNumber", // 必须与文件名匹配
    nameCn: "计数器",
    icon: "icon-jishuqi",
    formConfig: getFormConfig("InputNumber", [
      { fieldName: "default", component: "InputNumber" },
      { fieldName: "type", component: "Radio" },
      { fieldName: "size", component: "Radio" },
    ]),
    props: {
      ...fieldProps,
    },
    setup(props) {
      useWatch(props.data);
    },
  });
</script>
