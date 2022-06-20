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
      <el-date-picker v-model="item.data.default" type="date" :placeholder="item.data.placeholder" v-if="drag"> </el-date-picker>
      <el-date-picker v-model="data[item.data.fieldName]" type="date" :placeholder="item.data.placeholder" v-if="!drag"> </el-date-picker>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  export default defineComponent({
    ControlType: "Date", // 必须与文件名匹配
    nameCn: "日期选择",
    icon: "icon-24gl-calendar",
    formConfig: getFormConfig("Date", [
      { fieldName: "default", component: "Date" },
      { fieldName: "placeholder", component: "Text" },
    ]),
    props: {
      ...fieldProps,
    },
    watch: {
      data: {
        handler() {
          this.$emit("change");
        },
        deep: true,
      },
    },
  });
</script>
