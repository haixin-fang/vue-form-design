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
      <el-slider v-model="item.data.default" v-if="drag" :min="Number(item.data.min)" :max="Number(item.data.max)"></el-slider>
      <el-slider v-model="data[item.data.fieldName]" v-if="!drag" :min="Number(item.data.min)" :max="Number(item.data.max)"></el-slider>
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
