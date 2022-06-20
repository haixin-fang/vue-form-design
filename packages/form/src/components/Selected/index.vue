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
      <!-- <el-select-v2 v-model="item.data.itemConfig.value" :options="item.data.itemConfig.items" :placeholder="item.data.itemConfig.value[0]" style="width: 240px" multiple v-if="drag" />
      <el-select-v2 v-model="data[item.data.fieldName]" :options="item.data.itemConfig.items" placeholder="Please select" style="width: 240px" multiple v-if="!drag" /> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { getFormConfig } from "../../utils/fieldConfig";
export default defineComponent({
  ControlType: "Selected", // 必须与文件名匹配
  nameCn: "虚拟选择器",
  icon: "icon-xuanzeqi",
  formConfig: getFormConfig('Selected', [{ fieldName: "itemConfig", component: "KeyValueConfigMult" }]),
  props: {
    drag: Boolean,
    data: Object,
    item: Object,
  },
  data(){
    return {
      a: ''
    }
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
