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
      <el-input type="textarea" v-model="item.data.default" :placeholder="item.data.placeholder" v-if="drag" />
      <el-input type="textarea" v-model="data[item.data.fieldName]" :placeholder="item.data.placeholder" v-if="!drag" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  export default defineComponent({
    ControlType: "TextArea", // 必须与文件名匹配
    nameCn: "文本域",
    icon: "icon-textarea",
    formConfig: getFormConfig("TextArea", [
      { fieldName: "default", component: "Text" },
      { fieldName: "placeholder", component: "Text" },
    ]),
    props: {
      drag: Boolean,
      data: Object,
      item: Object,
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
