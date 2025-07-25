<template>
  <div class="starfish-formitem" :class="{ formCover: drag }">
    <div class="label" v-if="!item.data.labelShow">
      <label>{{ item.data.label }}</label>
      <el-tooltip
        v-if="item.data.tip"
        class="item"
        effect="dark"
        :content="item.data.tip"
        placement="top"
      >
        <span class="tip iconfontui icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control">
      <el-alert
        :title="item.data.title"
        :type="item.data.infotype"
        :effect="item.data.effect"
        :show-icon="item.data.showIcon"
        :closable="item.data.closable"
        :center="item.data.center"
        :description="item.data.desc"
        @close="execFunc('onClose')"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent,getCurrentInstance,ComponentInternalInstance } from "vue";
import { getFormConfig } from "../utils/fieldConfig";
import fieldProps from "../utils/fieldProps";
import { useWatch } from "../utils/customHooks";
export default defineComponent({
  ControlType: "Info", // 必须与文件名匹配
  nameCn: "提示",
  icon: "icon-jinggao",
  layout: true,
  formConfig: getFormConfig(
    "Info",
    [
      { fieldName: "title", component: "Text", label: "标题" },
      { fieldName: "desc", component: "Text", label: "文字描述" },
      { fieldName: "labelShow", component: "Switch", label: "标签隐藏" },
      { fieldName: "center", component: "Switch", label: "文字是否居中" },
      { fieldName: "closable", component: "Switch", label: "是否可关闭" },
      { fieldName: "showIcon", component: "Switch", label: "	是否显示类型图标" },
      { fieldName: "effect", component: "Selected" },
      { fieldName: "infotype", component: "Selected" },
    ],
    ["required", "tip", "rule"]
  ),
  actionType: ["onClose"],
  props: {
    ...fieldProps,
  },
  setup(props) {
     const vm = getCurrentInstance() as ComponentInternalInstance;
    useWatch(props);
    return {
      execFunc(type: string) {
          if (props.item.data.action && props.item.data.action[type]) {
            window.VApp.$Flex.funcExec(props.item.data.action[type], vm.proxy, [props.item.data.fieldName]);
          }
        },
    };
  },
});
</script>
