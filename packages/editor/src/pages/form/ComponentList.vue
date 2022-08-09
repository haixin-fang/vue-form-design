<template>
  <el-scrollbar class="editor_pages_left">
    <el-input placeholder="请输入关键词进行过滤" size="" v-model="filterContent" />
    <el-button text v-if="newcomponentlist.length > 0">基础控件</el-button>
    <draggable class="dragArea list-group" :list="newcomponentlist" :group="{ name: 'starfish-form', pull: 'clone', put: false }" :sort="false" item-key="id">
      <template #item="{ element }">
        <div class="list-group-item" :alt="element.nameCn" @click.stop="clickAddControl(element)">
          <div class="form-item">
            <span class="iconfont" :class="element.icon"></span>
          </div>
          <div class="item-text">{{ element.nameCn }}</div>
        </div>
      </template>
    </draggable>
    <el-button text v-if='layoutList.length > 0'>布局控件</el-button>
    <draggable class="dragArea list-group" :list="layoutList" :group="{ name: 'starfish-form', pull: 'clone', put: false }" :sort="false" item-key="id">
      <template #item="{ element }">
        <div class="list-group-item" :alt="element.nameCn" @click.stop="clickAddControl(element)">
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
  import formStore from '@/store/form';
  export default defineComponent({
    props: {
      basicFields: {
        type: Array,
        default(){
          return [];
        }
      },
      layoutFields: {
        type: Array,
        default(){
          return []
        }
      }
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
        model.ControlType = item.ControlType;
        model.icon = item.icon;
        model.nameCn = item.nameCn;
        model.layout = !!item.layout
        // 有json编辑器时，验证格式有固定的规则
        if (item.rule) {
          model.rule = item.rule;
        }
        lastFormComponents.push(model);
      }
      console.log(lastFormComponents);
      return {
        formcomponents: lastFormComponents,
        filterContent: "",
      };
    },
    computed: {
      newcomponentlist() {
        return (this as any).formcomponents.filter((item: any) => {
          if (item.nameCn && item.nameCn.indexOf(this.filterContent) != -1 && !item.layout) {
            if(this.basicFields.length == 0){
              return true;
            }else if(this.basicFields.length > 0){
              let isHave = false;
              this.basicFields.find((fieldItem: any) => {
                if(fieldItem.toLocaleLowerCase() == item.ControlType.toLocaleLowerCase()){
                  isHave = true;
                  return fieldItem;
                }
              })
              return isHave;
            }
          }
        });
      },
      layoutList(){
        return (this as any).formcomponents.filter((item:any) => {
          if(item.nameCn && item.nameCn.indexOf(this.filterContent) != -1 && item.layout){
            if(this.layoutFields.length == 0){
              return true;
            }else if(this.layoutFields.length > 0){
              let isHave = false;
              this.layoutFields.find((fieldItem: any) => {
                if(fieldItem.toLocaleLowerCase() == item.ControlType.toLocaleLowerCase()){
                  isHave = true;
                  return fieldItem;
                }
              })
              return isHave;
            }
          }
        })
      }
    },
    methods: {
      clickAddControl(item:any){
       formStore.setAllFormList((this as any).$Flex.jsonToForm(item));
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
