<template>
  <el-scrollbar class="editor_pages_left">
    <div class="filter">
      <el-input
        placeholder="请输入关键词进行过滤"
        size=""
        v-model="filterContent"
      />
    </div>
    <el-button text v-if="newcomponentlist.length > 0">基础控件</el-button>
    <draggable
      class="dragArea list-group"
      :list="newcomponentlist"
      :group="{ name: 'starfish-form', pull: 'clone', put: false }"
      :sort="false"
      item-key="id"
    >
      <template #item="{ element }">
        <div
          class="list-group-item"
          :alt="element.nameCn"
          @click.stop="clickAddControl(element)"
        >
          <div class="form-item">
            <span class="iconfontui" :class="element.icon"></span>
          </div>
          <div class="item-text">{{ element.nameCn }}</div>
        </div>
      </template>
    </draggable>
    <el-button text v-if="layoutList.length > 0">布局控件</el-button>
    <draggable
      class="dragArea list-group"
      :list="layoutList"
      :group="{ name: 'starfish-form', pull: 'clone', put: false }"
      :sort="false"
      item-key="id"
    >
      <template #item="{ element }">
        <div
          class="list-group-item"
          :alt="element.nameCn"
          @click.stop="clickAddControl(element)"
        >
          <div class="form-item">
            <span class="iconfontui" :class="element.icon"></span>
          </div>
          <div class="item-text">{{ element.nameCn }}</div>
        </div>
      </template>
    </draggable>
  </el-scrollbar>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import formStore from "@/controller/form";
import { BaseComponentItem } from "@/type";
export default defineComponent({
  props: {
    basicFields: {
      type: Array,
      default() {
        return [];
      },
    },
    layoutFields: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    const formcomponents: any = this.$formcomponents;
    const lastFormComponents = [];
    for (const key in formcomponents) {
      const item = formcomponents[key];
      if (item.isHide) {
        continue;
      }
      const model: BaseComponentItem | Record<string, any> = {};
      model.ControlType = item.ControlType;
      model.icon = item.icon;
      model.nameCn = item.nameCn;
      model.layout = !!item.layout;
      // 有json编辑器时，验证格式有固定的规则
      if (item.rule) {
        model.rule = item.rule;
      }
      lastFormComponents.push(model);
    }
    return {
      formcomponents: lastFormComponents,
      filterContent: "",
    };
  },
  computed: {
    newcomponentlist() {
      return (this as any).formcomponents.filter((item: BaseComponentItem) => {
        if (
          item.nameCn &&
          item.nameCn.indexOf(this.filterContent) != -1 &&
          !item.layout
        ) {
          if (this.basicFields.length == 0) {
            return true;
          } else if (this.basicFields.length > 0) {
            let isHave = false;
            this.basicFields.find((fieldItem: any) => {
              if (
                fieldItem.toLocaleLowerCase() ==
                (item.ControlType as string).toLocaleLowerCase()
              ) {
                isHave = true;
                return fieldItem;
              }
            });
            return isHave;
          }
        }
      });
    },
    layoutList() {
      return (this as any).formcomponents.filter((item: any) => {
        if (
          item.nameCn &&
          item.nameCn.indexOf(this.filterContent) != -1 &&
          item.layout
        ) {
          if (this.layoutFields.length == 0) {
            return true;
          } else if (this.layoutFields.length > 0) {
            let isHave = false;
            this.layoutFields.find((fieldItem: any) => {
              if (
                fieldItem.toLocaleLowerCase() ==
                item.ControlType.toLocaleLowerCase()
              ) {
                isHave = true;
                return fieldItem;
              }
            });
            return isHave;
          }
        }
      });
    },
  },
  methods: {
    clickAddControl(item: any) {
      formStore.setAllFormList((this as any).$Flex.jsonToForm(item));
    },
  },
});
</script>

