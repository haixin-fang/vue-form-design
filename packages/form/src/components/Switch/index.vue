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
      <el-switch v-model="item.data.default" v-if="drag" />
      <el-switch v-model="data[item.data.fieldName]" v-if="!drag" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  export default defineComponent({
    ControlType: "Switch", // 必须与文件名匹配
    nameCn: "开关",
    icon: "icon-kaiguanguan",
    formConfig: getFormConfig("Switch", [{ fieldName: "default", component: "Switch" }]),
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
