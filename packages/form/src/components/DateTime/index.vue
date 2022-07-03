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
      <el-date-picker v-model="item.data.default" type="datetime" :placeholder="item.data.placeholder" v-if="drag"> </el-date-picker>
      <el-date-picker v-model="data[item.data.fieldName]" type="datetime" :placeholder="item.data.placeholder" v-if="!drag"> </el-date-picker>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  export default defineComponent({
    ControlType: "DateTime", // 必须与文件名匹配
    nameCn: "日期时间选择",
    icon: "icon-riqishijian",
    formConfig: getFormConfig("DateTime", [
      { fieldName: "default", component: "DateTime" },
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
