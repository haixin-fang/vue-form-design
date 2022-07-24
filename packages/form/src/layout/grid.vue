<template>
  <div class="grid_box">
    <el-row :gutter="item.data.gutter">
      <el-col class="grid-col" v-for="(colItem, index) in gridList" :key="index" :span="colItem.span">
        <draggable class="draggable-box" animation="300" ghostClass="itemGhost" v-model="colItem.list" @add="addControl" group="starfish-form" @choose="chooseClick($event, index)" item-key="id" @update="changePos($event, index)">
          <template #item="{ element }">
            <Shape v-if="element.data" :active="currentIndex == element.id" :currentIndex="element.id">
              <component :is="element.ControlType" :drag="true" :item="element" :data="{}"></component>
            </Shape>
          </template>
        </draggable>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { defineComponent, inject, computed, getCurrentInstance } from "vue";
  import { getFormConfig } from "../utils/fieldConfig";
  import fieldProps from "../utils/fieldProps";
  import { useWatch } from "../utils/customHooks";
  export default defineComponent({
    ControlType: "Grid", // 必须与文件名匹配
    nameCn: "栅格布局",
    icon: "icon-wenbenkuang",
    layout: true,
    formConfig: getFormConfig(
      "Grid",
      [
        { fieldName: "gutter", component: "InputNumber" },
        { fieldName: "columns", component: "ListConfig" },
      ],
      ["required", "rule", "tip"]
    ),
    props: {
      ...fieldProps,
    },
    setup(props) {
      console.log(props);
      const gridList = computed(() => props.item.data.columns);
      const { proxy } = getCurrentInstance();
      const { formStore } = inject("control") || {};
      const formcomponents = proxy.$formcomponents;
      const chooseClick = (e, index) => {
        formStore.setFormCurrentIndex(gridList.value[index].list[e.oldIndex].id);
      };
      const currentIndex = computed(() => {
        return formStore.get("currentIndex");
      });
      useWatch(props.data);
      return {
        gridList,
        chooseClick,
        currentIndex,
        changePos(e ,index) {
          formStore.setFormCurrentIndex(gridList.value[index].list[e.oldIndex].id);
        },
        addControl() {
        //   debugger;
        //   console.log(23222)
          gridList.value.forEach((colItem) => {
            colItem.list = colItem.list.map((item) => {
              if (!item.data && !item.controlItems) {
                item = proxy.$Flex.deepClone(item);
                item.formConfig = formcomponents[item.ControlType].formConfig;
                item.data = item.formConfig.data();
                if (!item.data.fieldName) {
                  item.data.fieldName = item.ControlType + "_" + proxy.$Flex.generateMixed();
                }
                const controlItems = item.formConfig.morenConfig();
                item.rules = proxy.$Flex.controlFormRule(controlItems, item);
                item.controlItems = controlItems;
                item.id = proxy.$Flex.generateMixed();
                formStore.setFormCurrentIndex(item.id);
              }
              return item;
            });
          });
        },
      };
    },
  });
</script>
<style scoped>
  .grid_box {
    padding: 5px;
  }
  .grid-col {
    min-height: 60px;
  }
  .draggable-box {
    height: 100%;
    background: white;
    border: 1px #ccc dashed;
    box-sizing: border-box;
  }
</style>
