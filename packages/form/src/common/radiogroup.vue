<template>
  <div class="starfish-formitem" :class="drag ? 'formCover' : ''">
    <div class="label">
      <label>{{ item.data.label }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="top">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control">
      <el-radio-group v-model="data[item.data.fieldName]" size="mini">
        <el-radio-button v-for="(sitem, sindex) in item.data.itemConfig.items" :key="sindex" :label="sitem.value"></el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import fieldProps from "../utils/fieldProps";
  import { useWatch } from "../utils/customHooks";
  export default defineComponent({
    ControlType: "RadioGroup", // 必须与文件名匹配
    isHide: true,
    props: {
      ...fieldProps,
    },
    setup(props) {
      useWatch(props.data);
    },
  });
</script>
