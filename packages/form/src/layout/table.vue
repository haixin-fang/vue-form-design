<template>
  <div class="table_box">
    <table class="table_layout" :class="item.data.borderShow ? 'table_layout_border' : ''">
      <tr v-for="(trItem, index) in item.data.trs" :key="index">
        <td v-for="(tdItem, tdIndex) in trItem.tds" :key="tdIndex">
          <template v-if="drag">
            <draggable class="draggable-box" animation="300" ghostClass="itemGhost" v-model="tdItem.list" @add="addControl($event, tdItem.list, index, tdIndex)" group="starfish-form" @choose="chooseClick($event, tdItem.list)" item-key="id" @update="changePos($event, tdItem.list)">
              <template #item="{ element, index }">
                <Shape v-if="element.data" :active="currentId == element.id" :currentIndex="index" :currentId="element.id" :len="tdItem.list.length" :item="element"> <component :is="element.ControlType" :drag="true" :item="element" :data="{}"></component></Shape>
              </template>
            </draggable>
          </template>
          <template v-else>
            <template v-for="listItem in tdItem.list" :key="listItem.id">
              <el-form-item :prop="listItem.data.fieldName" v-if="!listItem.layout">
                <component ref="controlObj" @change="$emit('change')" :is="listItem.ControlType" :item="listItem" :data="data || '{}'" :drag="false" ></component>
              </el-form-item>
              <template v-else>
                <component ref="controlObj" @change="$emit('change')" :is="listItem.ControlType" :item="listItem" :data="data || '{}'" :drag="false" ></component>
              </template>
            </template>
          </template>
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
    icon: "icon-biaoge1",
    layout: true,
    props: {
      ...fieldProps,
    },
    formConfig: getFormConfig(
      "TableLayout",
      [
        // { fieldName: "borderShow", component: "Switch", label: "是否显示边框" },
        // {fieldName: 'borderWidth', component: 'InputNumber', label: "边框宽度"}
      ],
      ["required", "rule", "tip"]
    ),
    setup(props) {
      const { proxy } = getCurrentInstance() as any;
      const { formStore, store } = inject("control") || {};
      const currentId = computed(() => {
        return formStore.get("currentId");
      });
      useWatch(props.data);
      return {
        currentId,
        chooseClick(e: any, list: any[]) {
          formStore.setFormCurrentId(list[e.oldIndex].id);
          formStore.setFormCurrentIndex(e.oldIndex);
          store.set("curList", list);
        },
        changePos(e: any, list: any[]) {
          formStore.setFormCurrentId(list[e.newIndex]?.id);
          formStore.setFormCurrentIndex(e.newIndex);
          store.set("curList", list);
        },
        addControl(e: any, list: any[], trIndex: number, tdIndex: number) {
          props.item.data.trs[trIndex].tds[tdIndex].list = list.map((item: any) => {
            return proxy.$Flex.jsonToForm(item);
          });
          formStore.setFormCurrentId(props.item.data.trs[trIndex].tds[tdIndex].list[e.newIndex].id);
          formStore.setFormCurrentIndex(e.newIndex);
          store.set("curList", props.item.data.trs[trIndex].tds[tdIndex].list);
        },
      };
    },
  });
</script>
<style lang="scss" scoped>
  .table_box {
    .table_layout {
      width: 100%;
      &.table_layout_border {
        border: 1px solid #ccc;
      }
      td {
        vertical-align: top;
      }
      .draggable-box {
        min-height: 60px;
        background: white;
        border: 1px #ccc dashed;
        box-sizing: border-box;
        min-width: 50px;
        height: 100%;
      }
    }
  }
</style>
