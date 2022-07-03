<template>
  <el-scrollbar class="editor_pages_left">
    <el-input  placeholder="请输入关键词进行过滤" size='' v-model="filterContent"/>
    <draggable class="dragArea list-group" :list="newcomponentlist" :group="{ name: 'starfish-form', pull: 'clone', put: false }" :sort="false" item-key="id">
      <template #item="{ element }">
        <div class="list-group-item" :alt="element.nameCn">
          <div class="form-item">
            <span class="iconfont" :class="element.icon"></span>
          </div>
          <div class="item-text">{{ element.nameCn }}</div>
        </div>
      </template>
    </draggable>
  </el-scrollbar>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import draggable from "vuedraggable";

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
        filterContent: '',
      };
    },
    computed: {
      newcomponentlist(){
        return (this as any).formcomponents.filter((item:any) => {
          if(item.nameCn.indexOf(this.filterContent) != -1){
            return true;
          }
        });
      }
    }
  });
</script>
<style lang="scss" scoped>
  .editor_pages_left {
    width: 100%;
    height: 100%;
    .list-group {
      display: flex;
      flex-wrap: wrap;
    }
    .list-group-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin: 7px 10px 0;
      width: 55px;
      .form-item {
        width: 42px;
        height: 42px;
        border: 1px solid #dfdada;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        transition: all 0.1s ease-in-out;
        margin-bottom: 5px;
        border-radius: 5px;
        &:hover {
          background: #409eff;
          // border: 1px solid #409eff;
          color: #fff;
        }
        > span:first-child {
          font-size: 18px;
        }
      }
      .item-text {
        height: 30px;
        // display: flex;
        align-items: center;
        font-size: 12px;
        display: inline-block;
        width: 100%;
        -webkit-box-orient: vertical;
        /*! autoprefixer: on*/

        -webkit-line-clamp: 2;
        display: -webkit-box;
        overflow: hidden;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
    }
  }
</style>
