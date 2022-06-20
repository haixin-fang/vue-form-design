<template>
  <div class="editor_pages_left">
    <draggable class="dragArea list-group" :list="formcomponents" :group="{ name: 'starfish-form', pull: 'clone', put: false }" :sort="false" item-key="id">
      <template #item="{ element }">
        <div class="list-group-item">
          <div class="form-item">
            <span class="iconfont" :class="element.icon"></span>
          </div>
          <span class="item-text">{{ element.nameCn }}</span>
        </div>
      </template>
    </draggable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import draggable from "vuedraggable";
  import _ from "@/utils/_";

  export default defineComponent({
    components: {
      draggable,
    },
    data() {
      const formcomponents: any = this.$formcomponents;
      const lastFormComponents = [];
      for (const key in formcomponents) {
        const item = formcomponents[key];
        if (item.isHide) {
          continue;
        }
        const model: any = {};
        // model.data = item.formConfig.data();
        model.ControlType = item.ControlType;
        model.icon = item.icon;
        model.nameCn = item.nameCn;
        // 有json编辑器时，验证格式有固定的规则
        if (item.rule) {
          model.rule = item.rule;
        }
        // let defaultConfig = myMixin.initControlItems();
        // let controlItems = defaultConfig[0].concat(item.formConfig.morenConfig()).concat(defaultConfig[1]);
        // model.controlItems = controlItems;
        lastFormComponents.push(model);
      }
      return {
        formcomponents: lastFormComponents,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .editor_pages_left {
    padding: 15px 10px;
    width: 308px;
    height: 100%;
    .list-group {
      display: flex;
      flex-wrap: wrap;
    }
    .list-group-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin: 7px 10px;
      width: 25%;
      .form-item {
        width: 42px;
        height: 42px;
        border: 1px solid #dfdada;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        transition: all 0.2s ease-in-out;
        margin-bottom: 5px;
        border-radius: 5px;
        &:hover {
          background: #fff;
          border: 1px solid #409eff;
          color: #409eff;
        }
        > span:first-child {
          font-size: 16px;
        }
      }
      .item-text {
        font-size: 12px;
        display: inline-block;
        width: 100;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
