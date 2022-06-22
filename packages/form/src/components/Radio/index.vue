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
      <el-radio-group v-if="!drag" v-model="data[item.data.fieldName][0]">
        <el-radio v-for="(sitem, sindex) in item.data.itemConfig.items" :key="sindex" :label="sitem.value">{{ sitem.label }}</el-radio>
      </el-radio-group>
      <el-radio-group v-if="drag" v-model="item.data.itemConfig.value">
        <el-radio v-for="(sitem, sindex) in item.data.itemConfig.items" :key="sindex" :label="sitem.value">{{ sitem.label }}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  export default defineComponent({
    ControlType: "Radio", // 必须与文件名匹配
    nameCn: "单选框",
    icon: "icon-danxuankuang",
    formConfig: getFormConfig("Radio", [{ fieldName: "itemConfig", component: "KeyValueConfig" }]),
    props: {
      ...fieldProps,
    },
    setup(props) {
      useWatch(props.data);
    },
  });
</script>
