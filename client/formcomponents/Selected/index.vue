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
      <el-select-v2 v-model="item.data.itemConfig.value" :options="item.data.itemConfig.items" placeholder="Please select" style="width: 240px" multiple v-if="drag" />
      <el-select-v2 v-model="data[item.data.fieldName]" :options="item.data.itemConfig.items" placeholder="Please select" style="width: 240px" multiple v-if="!drag" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  ControlType: "Seleted", // 必须与文件名匹配
  nameCn: "虚拟选择器",
  icon: "icon-xuanzeqi",
  formConfig: {
    data() {
      return {
        fieldName: "",
        label: "标签名称",
        tip: "",
        placeholder: "",
        showRule: "{}",
        required: false,
        rule: "[]",
        itemConfig: {
          value: ["选项1"],
          items: [
            {
              label: "选项1",
              value: "选项1",
              select: true,
              id: 1,
            },
            {
              label: "选项2",
              value: "选项2",
              select: false,
              id: 2,
            },
          ],
        },
      };
    },
    morenConfig() {
      return [
        {
          ControlType: "KeyValueConfigMult",
          data: {
            fieldName: "itemConfig",
            tip: "",
            label: "默认值",
            placeholder: "",
            showRule: "{}",
            required: false,
            rule: "[]",
          },
        },
      ];
    },
  },
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
