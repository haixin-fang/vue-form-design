<template>
  <div class="starfish-formitem starfish-formitem-action" :class="{ formCover: drag, 'starfish-vertical': labelalign != 'top', [item.data.csslist?.join(' ')]: !!item.data.csslist }">
    <div class="label" :class="'label_' + labelalign" :style="{ width: labelWidth + 'px' }">
      <label>{{ item.data.label }}{{ suffix }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="top">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control" :style="{ marginLeft: labelalign != 'top' ? labelWidth + 'px' : '' }">
      <el-collapse v-if="data[item.data.fieldName]">
        <el-collapse-item :title="key" name="1" v-for="(configItem, key) in data[item.data.fieldName]" :key="key">
          <el-row :gutter="10">
            <el-col class="list-group-item" :span="16">
              <el-select v-model="data[item.data.fieldName][key]" class="m-2" placeholder="Select" :size="size" style="width: 100%">
                <el-option v-for="item in action" :key="item.type" :label="item.funcName" :value="JSON.stringify(item)" />
              </el-select>
            </el-col>
            <el-col :span="6" style="white-space: nowrap">
              <el-button type="primary" circle :size="size" @click="onEditAction(configItem, key)">
                <el-icon><Edit /></el-icon>
              </el-button>
              <el-button type="danger" circle :size="size" @click="onRemoveAction(key)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <el-dropdown style="width: 100%">
        <el-button style="width: 100%" :size="size"> 新建动作+ </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(actionItem, index) in item.data.formConfig.items" :key="index" @click="addAction(actionItem.value)" :disabled="data[item.data.fieldName] && data[item.data.fieldName][actionItem.value]">{{ actionItem.label }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <formAction :isForm="true" :item="item" :data="data" ref="formAction"> </formAction>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, inject, computed } from "vue";
  import { Delete, Edit } from "@element-plus/icons-vue";
  import fieldProps from "../utils/fieldProps";
  export default defineComponent({
    ControlType: "Action", // 必须与文件名匹配
    isHide: true,
    props: {
      ...fieldProps,
    },
    components: {
      Delete,
      Edit,
    },
    setup(props) {
      const { actionContrl } = inject<any>("control") || {};
      const action = computed(() => actionContrl?.get("action"));
      const formAction = ref();
      return {
        action,
        formAction,
        addAction(type: string) {
          formAction.value.onAction(type);
        },
        onEditAction(actionItem: string, key: any) {
          const type = (JSON.parse(actionItem || "{}") || {}).type;
          formAction.value.onEditAction(key, type);
        },
        onRemoveAction(key: any) {
          delete props.data[props.item.data.fieldName][key];
        },
      };
    },
  });
</script>
