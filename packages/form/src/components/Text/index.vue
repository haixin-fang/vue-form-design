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
      <el-input v-model="item.data.default" :placeholder="item.data.placeholder" v-if="drag" />
      <el-input v-model="data[item.data.fieldName]" :placeholder="item.data.placeholder" v-if="!drag" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from '../../utils/fieldProps';
  export default defineComponent({
    ControlType: "Text", // 必须与文件名匹配
    nameCn: "文本框",
    icon: "icon-wenbenkuang",
    formConfig: getFormConfig("Text", [
      { fieldName: "default", component: "Text" },
      { fieldName: "placeholder", component: "Text" },
    ]),
    props: {
      ...fieldProps
    },
    mounted() {
      console.log(this);
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
