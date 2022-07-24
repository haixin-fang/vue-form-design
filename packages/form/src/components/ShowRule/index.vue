<template>
  <div class="starfish-formitem" :class="{ formCover: drag }">
    <div class="label">
      <label>{{ item.data.label }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="top">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <el-button type="text" v-if="data.showRule != '{}'">已设置</el-button>
    <el-button type="text" v-else>未设置</el-button>
    <div class="control">
      <el-button type="primary" @click="onConditionSet">普通设置</el-button>
      <el-button type="primary" @click="onHighConditionSet">高级设置</el-button>
      <ConditionSelect ref="ConditionSelect" :data="data" :item="item" @change="dataChange"></ConditionSelect>
      <HighConditionSelect ref="highSelect" :data="data" :item="item" @change="dataChange"></HighConditionSelect>
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
      useWatch(props.data);
      return {
        ConditionSelect,
        highSelect,
        onConditionSet() {
          ConditionSelect.value?.show();
        },
        onHighConditionSet() {
          highSelect.value?.show();
        },
        dataChange(result:any){
          (props.data as any)[props.item?.data.fieldName] = result;
        }
      };
    },
  });
</script>
