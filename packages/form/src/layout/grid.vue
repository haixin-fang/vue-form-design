<template>
  <div class="grid_box">
    <el-row :gutter="item.data.gutter">
      <el-col class="grid-col" v-for="(colItem, index) in gridList" :key="index" :span="colItem.span">
        <draggable class="draggable-box" animation="300" ghostClass="itemGhost" v-model="colItem.list" @add="addControl($event, index)" group="starfish-form" @choose="chooseClick($event, index)" item-key="id" @update="changePos($event, index)">
          <template #item="{ element }">
            <Shape v-if="element.data" :active="currentId == element.id" :currentIndex="element.id" :list="colItem.list">
              <component :is="element.ControlType" :drag="true" :item="element" :data="{}"></component>
            </Shape>
          </template>
        </draggable>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
  import { defineComponent, inject, computed, getCurrentInstance, nextTick } from "vue";
  import { getFormConfig } from "../utils/fieldConfig";
  import fieldProps from "../utils/fieldProps";
  import { useWatch } from "../utils/customHooks";
  export default defineComponent({
    ControlType: "Grid", // 必须与文件名匹配
    nameCn: "栅格布局",
    icon: "icon-35zhage",
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
      const { proxy } = getCurrentInstance() as any;
      const { formStore, store } = inject("control") || {};
      const chooseClick = (e: any, index:number) => {
        formStore.setFormCurrentId(gridList.value[index].list[e.oldIndex]?.id);
        formStore.setFormCurrentIndex(e.oldIndex);
        store.set('curList', gridList.value[index].list);
      };
      const currentId = computed(() => {
        return formStore.get("currentId");
      });
      useWatch(props.data);
      return {
        gridList,
        chooseClick,
        currentId,
        changePos(e: any, index: number) {
          formStore.setFormCurrentId(gridList.value[index].list[e.newIndex]?.id);
          formStore.setFormCurrentIndex(e.newIndex);
          store.set('curList', gridList.value[index].list);
        },
        async addControl(e: any, index: number) {
          let id;
          gridList.value.forEach((colItem:any) => {
            colItem.list = colItem.list.map((item:any) => {
              return proxy.$Flex.jsonToForm(item);
            });
          });
          await nextTick();
          if (!id) {
            formStore.setFormCurrentId(gridList.value[index].list[e.newIndex].id);
            formStore.setFormCurrentIndex(e.newIndex);
            store.set('curList', gridList.value[index].list);
          } else {
            formStore.setFormCurrentId(id);
            formStore.setFormCurrentIndex(e.newIndex);
            store.set('curList', gridList.value[index].list);
          }
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
