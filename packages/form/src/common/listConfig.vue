<template>
  <div class="starfish-formitem starfish-formitem-nomiddle" :class="{ formCover: drag, 'starfish-vertical': labelalign != 'top', [item.data.csslist?.join(' ')]: !!item.data.csslist }">
    <div class="label" :class="'label_' + labelalign" :style="{ width: labelWidth + 'px' }">
      <label>{{ item.data.label }}{{ suffix }}</label>
    </div>
    <div class="control" :style="{ marginLeft: labelalign != 'top' ? labelWidth + 'px' : '' }">
      <el-row v-for="(items, index) in data[item.data.fieldName]" :key="index" :gutter="10" style="margin-bottom: 10px;">
          <el-input-number v-model="items.span" :min="0" size="small" controls-position="right" />
          <el-button type="danger" circle size="small" @click="onDelete(index)" style="margin-left: 5px;">
            <el-icon><Delete /></el-icon>
          </el-button>
      </el-row>
      <el-button plain @click="onAdd" size="small">添加</el-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import fieldProps from "../utils/fieldProps";
  import { Delete } from "@element-plus/icons-vue";
  export default defineComponent({
    ControlType: "ListConfig", // 必须与文件名匹配
    nameCn: "栅格列表配置",
    isHide: true,
    props: {
      ...fieldProps,
    },
    components: {
      Delete,
    },
    setup(props: any) {
      return {
        onAdd() {
          props.data[props.item.data.fieldName].push({
            span: 12,
            list: [],
          });
        },
        onDelete(index: number) {
          props.data[props.item.data.fieldName].splice(index, 1);
        },
      };
    },
  });
</script>
