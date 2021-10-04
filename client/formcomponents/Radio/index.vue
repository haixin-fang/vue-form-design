<template>
  <div class="starfish-formitem" :class="drag ? 'formCover' : ''">
    <div class="label">
      <label>{{ item.data.label }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip
        v-if="item.data.tip"
        class="item"
        effect="dark"
        :content="item.data.tip"
        placement="bottom-start"
      >
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control">
      <el-radio-group v-if="!drag" v-model="data[item.data.fieldName]">
        <el-radio
          v-for="(sitem, sindex) in item.data.itemConfig.items"
          :key="sindex"
          :label="sitem.value"
          >{{ sitem.label }}</el-radio
        >
      </el-radio-group>
      <el-radio-group v-if="drag" v-model="item.data.itemConfig.value">
        <el-radio
          v-for="(sitem, sindex) in item.data.itemConfig.items"
          :key="sindex"
          :label="sitem.value"
          >{{ sitem.label }}</el-radio
        >
      </el-radio-group>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  ControlType: "Radio", // 必须与文件名匹配
  nameCn: "单选框",
  icon: "icon-danxuankuang",
  formConfig: {
    data() {
      return {
        fieldName: "",
        label: "标签名称",
        tip: "",
        value: "",
        showRule: "{}",
        required: false,
        rule: "[]",
        default: false,
        itemConfig: {
          value: "选项1",
          id: 1,
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
          ControlType: "KeyValueConfig",
          data: {
            fieldName: "itemConfig",
            tip: "",
            label: "选择项",
            showRule: "{}",
            required: false,
            default: false,
            rule: "[]",
          },
        },
      ];
    },
  },
  mounted(){
    console.log('drag', this.drag)
  },
  props: {
    drag: Boolean,
    data: Object,
    item: Object,
  },
});
</script>
