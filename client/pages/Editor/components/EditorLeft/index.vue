<template>
  <div class="editor_pages_left">
    <draggable class="dragArea list-group" :list="formcomponents" :group="{ name: 'starfish-form', pull: 'clone', put: false }" :clone="cloneDog" item-key="id">
      <template #item="{ element }">
        <div class="list-group-item">
          <div class="form-item">
            <span class="iconfont" :class="element.icon"></span>
            <span>{{ element.nameCn }}</span>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";
import { formcomponents } from "../../index";
import _ from "@/utils/_";

export default defineComponent({
  components: {
    draggable,
  },
  data() {
    let lastFormComponents = [];
    for (const key in formcomponents) {
      let item = formcomponents[key];
      let model: any = {};
      // model.data = item.formConfig.data();
      model.ControlType = item.ControlType;
      model.icon = item.icon;
      model.nameCn = item.nameCn;
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
  width: 248px;
  height: 100%;
  .list-group-item {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .form-item {
      width: 70px;
      height: 70px;
      border: 2px solid #aca9a9;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      > span:first-child {
        font-size: 30px;
      }
    }
  }
}
</style>
