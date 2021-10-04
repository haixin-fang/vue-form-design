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
      <el-checkbox-group v-model="data[item.data.fieldName]" v-if="!drag&&data[item.data.fieldName]">
        <el-checkbox v-for="(sitem, sindex) in item.data.itemConfig.items" :key="sindex" :label="sitem.value">{{sitem.label}}</el-checkbox>
      </el-checkbox-group>
     <el-checkbox-group v-model="item.data.itemConfig.value" v-if="drag">
        <el-checkbox v-for="(sitem, sindex) in item.data.itemConfig.items" :key="sindex" :label="sitem.value">{{sitem.label}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  ControlType: "CheckBox", // 必须与文件名匹配
  nameCn: "复选框",
  icon: "icon-fuxuankuang_xuanzhong",
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
  props: {
    drag: Boolean,
    data: Object,
    item: Object,
  },
});
</script>
