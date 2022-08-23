<template>
  <div class="starfish-formitem starfish-formitem-nomiddle" :class="{ formCover: drag, 'starfish-vertical': labelalign != 'top', [item.data.csslist?.join(' ')]: !!item.data.csslist }">
    <div class="label" :class="'label_' + labelalign" :style="{ width: labelWidth + 'px' }">
      <label>{{ item.data.label }}{{ suffix }}</label>
      <el-tooltip class="item" effect="dark" content="可拖拽调整顺序" placement="top">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control" :style="{ marginLeft: labelalign != 'top' ? labelWidth + 'px' : '' }">
      <el-row>
        <el-col :span="24">
          <draggable :list="data[item.data.fieldName]" class="list-group" handle=".handle" item-key="name" ghostClass="itemGhost">
            <template #item="{ element, index }">
              <el-row :gutter="10">
                <el-col :span="1.5">
                  <i class="iconfont icon-bars handle"></i>
                </el-col>
                <el-col class="list-group-item" :span="14">
                  <el-input size="small" v-model="element.name" clearable />
                </el-col>
                <el-col :span="2">
                  <el-button type="danger" circle size="small" @click="removeAt(index)">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </el-col>
              </el-row>
            </template>
          </draggable>
        </el-col>
        <el-button type="primary" text @click="add" size="small">添加面板</el-button>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import fieldProps from "../utils/fieldProps";
  import { Delete } from "@element-plus/icons-vue";
  export default defineComponent({
    ControlType: "Panel", // 必须与文件名匹配
    isHide: true,
    components: {
      Delete,
    },
    props: {
      ...fieldProps,
    },
    setup(props) {
      return {
        removeAt(idx: number) {
          props.data[props.item.data.fieldName].splice(idx, 1);
        },
        add: function () {
          debugger;
          const len = props.data[props.item.data.fieldName].length + 1;
          props.data[props.item.data.fieldName].push({ name: props.data.name + len, list: [] });
        },
      };
    },
  });
</script>
