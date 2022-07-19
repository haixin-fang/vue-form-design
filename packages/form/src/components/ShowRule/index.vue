<template>
  <div class="starfish-formitem" :class="{ formCover: drag }">
    <div class="label">
      <label>{{ item.data.label }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="top">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control">
      <el-button type="primary" @click="onConditionSet">点击设置</el-button>
      <ConditionSelect ref="ConditionSelect" :data="data" :item="item"></ConditionSelect>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  import ConditionSelect from "../../common/ConditionSelect.vue";
  export default defineComponent({
    ControlType: "ShowRule", // 必须与文件名匹配
    components: {
      ConditionSelect,
    },
    props: {
      ...fieldProps,
    },
    setup(props) {
      const ConditionSelect = ref();
      useWatch(props.data);
      return {
        ConditionSelect,
        onConditionSet() {
            ConditionSelect.value.show();
        },
      };
    },
  });
</script>
