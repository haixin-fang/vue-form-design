<template>
  <div class="editor_pages_left">
    <draggable class="dragArea list-group" :list="formcomponents" :group="{ name: 'starfish-form', pull: 'clone', put: false }" :sort="false" item-key="id">
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
      if(item.isHide){
        continue
      }
      let model: any = {};
      // model.data = item.formConfig.data();
      model.ControlType = item.ControlType;
      model.icon = item.icon;
      model.nameCn = item.nameCn;
      // 有json编辑器时，验证格式有固定的规则
      if(item.rule){
        model.rule = item.rule
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
  width: 308px;
  height: 100%;
  .list-group{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .list-group-item {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .form-item {
      width: 88px;
      height: 88px;
      border: 1px solid #dfdada;
      background: #f4f4f4;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      transition: all 0.2s ease-in-out;
      &:hover{
        background: #fff;
        border: 1px solid #409eff;
        color:#409eff;
      }
      > span:first-child {
        font-size: 40px;
      }
      >span:nth-child(2){
        font-size: 14px;
      }
    }
  }
}
</style>
