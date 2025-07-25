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
      <el-select v-model="item.data.itemConfig.value" :placeholder="item.data.placeholder" v-if="drag" multiple :size="size">
        <el-option v-for="items in item.data.itemConfig.items" :key="items.value" :label="items.label" :value="items.value" />
      </el-select>
      <el-select v-model="data[item.data.fieldName]" :placeholder="item.data.placeholder" v-if="!drag" multiple :size="size" @focus="execFunc('onFocus')" @blur="execFunc('onBlur')">
        <el-option v-for="items in item.data.itemConfig.items" :key="items.value" :label="items.label" :value="items.value" />
      </el-select>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, ComponentInternalInstance } from "vue";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  export default defineComponent({
    ControlType: "Selecteds", // 必须与文件名匹配
    nameCn: "选择器多选",
    icon: "icon-xuanzeqi",
    formConfig: getFormConfig("Selecteds", [
      { fieldName: "placeholder", component: "Text" },
      { fieldName: "itemConfig", component: "KeyValueConfigMult" },
    ]),
    actionType: ["onChange", "onFocus", "onBlur"],
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
