<template>
  <div class="starfish-formitem" :class="{ formCover: drag }">
    <div class="label">
      <label>{{ item.data.label }}</label>
    </div>
    <div class="control">
      <el-row v-for="(items, index) in data[item.data.fieldName]" :key="index" :gutter="10">
        <el-col :span="9">
          <el-input-number v-model="items.span" :min="0" size="small" controls-position="right" />
       </el-col>
        <el-col :span="8">
          <el-button type="danger" circle size="small" @click="onDelete(index)">
            <el-icon><Delete /></el-icon>
          </el-button>
        </el-col>
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
