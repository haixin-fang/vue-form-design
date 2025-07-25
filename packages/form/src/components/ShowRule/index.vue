<template>
  <div class="starfish-formitem starfish-editor-showrule" :class="{ formCover: drag, 'starfish-vertical': labelalign != 'top' }">
    <div class="label" :class="'label_' + labelalign" :style="{ width: labelWidth + 'px' }">
      <label>{{ item.data.label }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="top">
        <span class="tip iconfontui icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control" :style="{ marginLeft: labelalign != 'top' ? labelWidth + 'px' : '' }">
      <el-button text type="primary" v-if="data.showRule != '{}'" :size="size">已设置</el-button>
      <el-button text type="primary" v-else :size="size">未设置</el-button>
      <div>
        <el-button type="primary" :size="size" @click="onConditionSet">普通设置</el-button>
        <el-button type="primary" :size="size" @click="onHighConditionSet">高级设置</el-button>
        <ConditionSelect ref="ConditionSelect" :data="data" :item="item" @change="dataChange"></ConditionSelect>
        <HighConditionSelect ref="highSelect" :data="data" :item="item" @change="dataChange"></HighConditionSelect>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  export default defineComponent({
    ControlType: "ShowRule", // 必须与文件名匹配
    props: {
      ...fieldProps,
    },
    setup(props) {
      const ConditionSelect = ref();
      const highSelect = ref();
      useWatch(props);
      return {
        ConditionSelect,
        highSelect,
        onConditionSet() {
          ConditionSelect.value?.show();
        },
        onHighConditionSet() {
          highSelect.value?.show();
        },
        dataChange(result: any) {
          (props.data as any)[props.item?.data.fieldName] = result;
        },
      };
    },
  });
</script>
