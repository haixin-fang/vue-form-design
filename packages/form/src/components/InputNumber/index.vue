<template>
  <div class="starfish-formitem" :class="{ formCover: drag, 'starfish-vertical': labelalign != 'top', [item.data.csslist?.join(' ')]: !!item.data.csslist }">
    <div class="label" :class="'label_' + labelalign" :style="{ width: labelWidth + 'px' }">
      <label>{{ item.data.label }}{{ suffix }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="top">
        <span class="tip iconfontui icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control" :style="{ marginLeft: labelalign != 'top' ? labelWidth + 'px' : '' }">
      <el-input-number v-model="item.data.default" :controls-position="item.data.type == 2 ? 'right' : ''" :size="item.data.size" v-if="drag" />
      <el-input-number v-model="data[item.data.fieldName]" v-if="!drag" :controls-position="item.data.type == 2 ? 'right' : ''" :size="item.data.size" @focus="execFunc('onFocus')" @blur="execFunc('onBlur')" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, ComponentInternalInstance } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  export default defineComponent({
    ControlType: "InputNumber", // 必须与文件名匹配
    nameCn: "计数器",
    icon: "icon-jishuqi",
    formConfig: getFormConfig("InputNumber", [
      { fieldName: "default", component: "InputNumber" },
      { fieldName: "type", component: "Radio" },
      { fieldName: "size", component: "Radio" },
    ]),
    props: {
      ...fieldProps,
    },
    actionType: ["onChange", "onFocus", "onBlur"],
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
