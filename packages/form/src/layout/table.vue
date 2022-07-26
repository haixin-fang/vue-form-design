<template>
  <div class="table_box">
    <table class="table_layout">
      <tr v-for="(trItem, index) in item.data.trs" :key="index">
        <td v-for="(tdItem, tdIndex) in trItem.tds" :key="tdIndex">
          <draggable class="draggable-box" animation="300" ghostClass="itemGhost" v-model="tdItem.list" @add="addControl($event, tdItem.list, index, tdIndex)" group="starfish-form" @choose="chooseClick($event, tdItem.list, tdIndex)" item-key="id" @update="changePos($event, tdItem.list)">
            <template #item="{ element }">
              <Shape v-if="element.data" :active="currentId == element.id" :currentIndex="element.id"> <component :is="element.ControlType" :drag="true" :item="element" :data="{}"></component></Shape>
            </template>
          </draggable>
        </td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, inject, computed } from "vue";
  import { getFormConfig } from "../utils/fieldConfig";
  import fieldProps from "../utils/fieldProps";
  import { useWatch } from "../utils/customHooks";
  export default defineComponent({
    ControlType: "TableLayout",
    nameCn: "表格布局",
    icon: "icon-wenbenkuang",
    layout: true,
    props: {
      ...fieldProps,
    },
    formConfig: getFormConfig("TableLayout", [], ["required", "rule", "tip"]),
    setup(props) {
      const { proxy } = getCurrentInstance() as any;
      const { formStore, store } = inject("control") || {};
      const currentId = computed(() => {
        return formStore.get("currentId");
      });
      useWatch(props.data);
      return {
        currentId,
        chooseClick(e: any, list: any[], tdIndex: number) {
          formStore.setFormCurrentId(list[tdIndex].id);
          formStore.setFormCurrentIndex(e.oldIndex);
          store.set("curList", list);
        },
        changePos(e: any, list: any[]) {
          formStore.setFormCurrentId(list[e.newIndex]?.id);
          formStore.setFormCurrentIndex(e.newIndex);
          store.set("curList", list);
        },
        addControl(e: any, list: any[], trIndex: number, tdIndex: number) {
          let id;
          props.item.data.trs[trIndex].tds[tdIndex].list = list.map((item: any) => {
            return proxy.$Flex.jsonToForm(item);
          });
          if (!id) {
            formStore.setFormCurrentId(props.item.data.trs[trIndex].tds[tdIndex].list[e.newIndex].id);
            formStore.setFormCurrentIndex(e.newIndex);
            store.set("curList", props.item.data.trs[trIndex].tds[tdIndex].list);
          } else {
            formStore.setFormCurrentId(id);
            formStore.setFormCurrentIndex(e.newIndex);
            store.set("curList", props.item.data.trs[trIndex].tds[tdIndex].list);
          }
        },
      };
    },
  });
</script>
<style lang="scss" scoped>
  .table_box {
    .table_layout {
      width: 100%;
      td {
        vertical-align: top;
      }
      .draggable-box {
        min-height: 60px;
        background: white;
        border: 1px #ccc dashed;
        box-sizing: border-box;
        min-width: 50px;
      }
    }
  }
</style>
