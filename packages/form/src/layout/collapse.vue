<template>
  <div class="collapse_box">
    <div class="control">
      <el-collapse v-model="activeName" :accordion="item.data.accordion">
        <el-collapse-item :title="colItem.name" :name="colItem.name" v-for="(colItem, index) in item.data.items" :key="index">
          <tempate v-if="drag">
            <draggable class="draggable-box" animation="300" ghostClass="itemGhost" v-model="colItem.list" @add="addControl($event, colItem.list, index)" group="starfish-form" @choose="chooseClick($event, colItem.list)" item-key="id" @update="changePos($event, colItem.list)">
              <template #item="{ element, index }">
                <Shape v-if="element.data" :active="currentId == element.id" :currentIndex="index" :currentId="element.id" :len="colItem.list.length" :item="element"> <component :is="element.ControlType" :drag="true" :item="element" :data="{}"></component></Shape>
              </template>
            </draggable>
          </tempate>
          <template v-else>
            <template v-for="listItem in colItem.list" :key="listItem.id">
              <el-form-item :prop="listItem.data.fieldName" v-if="!listItem.layout">
              <!-- v-if="listItem.show" -->
                <component ref="controlObj" @change="$emit('change')" :is="listItem.ControlType" :item="listItem" :data="data || '{}'" :drag="false" ></component>
              </el-form-item>
              <template v-else>
                <component ref="controlObj" @change="$emit('change')" :is="listItem.ControlType" :item="listItem" :data="data || '{}'" :drag="false" ></component>
              </template>
            </template>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, inject, getCurrentInstance } from "vue";
  import { getFormConfig } from "../utils/fieldConfig";
  import fieldProps from "../utils/fieldProps";
  import { useWatch } from "../utils/customHooks";
  export default defineComponent({
    ControlType: "Collapse", // 必须与文件名匹配
    nameCn: "折叠面板",
    icon: "icon-zhediemianban",
    layout: true,
    formConfig: getFormConfig("Collapse", [
      { fieldName: "items", component: "Panel", label: "折叠面板" },
      { fieldName: "accordion", component: "Switch", label: "手风琴模式" },
    ]),
    props: {
      ...fieldProps,
    },
    setup(props) {
      const activeName = ref(props.item.data.items[0].name);
      const { formStore, store } = inject("control") || {};
      const { proxy } = getCurrentInstance() as any;
      const currentId = computed(() => {
        return formStore.get("currentId");
      });
      useWatch(props.data);
      return {
        activeName,
        currentId,
        addControl(e: any, list: any, index: number) {
          props.item.data.items[index].list = list.map((item: any) => {
            return proxy.$Flex.jsonToForm(item);
          });
          formStore.setFormCurrentId(props.item.data.items[index].list[e.newIndex].id);
          formStore.setFormCurrentIndex(e.newIndex);
          store.set("curList", props.item.data.items[index].list);
        },
        chooseClick(e: any, list: any) {
          formStore.setFormCurrentId(list[e.oldIndex].id);
          formStore.setFormCurrentIndex(e.oldIndex);
          store.set("curList", list);
        },
        changePos(e: any, list: any) {
          formStore.setFormCurrentId(list[e.newIndex]?.id);
          formStore.setFormCurrentIndex(e.newIndex);
          store.set("curList", list);
        },
      };
    },
  });
</script>
<style scoped>
  .draggable-box {
    min-height: 50px;
    background: white;
    border: 1px #ccc dashed;
    box-sizing: border-box;
  }
  :deep(.el-collapse-item__content) {
    padding-bottom: 5px;
  }
</style>
