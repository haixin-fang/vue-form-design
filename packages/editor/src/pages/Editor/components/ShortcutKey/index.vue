<template>
  <div class="shortCutKey">
    <div class="title">快捷键</div>
    <div class="keyContent">
        <div v-for="(item, index) in keyList" :key="index">
            <span>{{item.key}}</span>
            <span>{{item.value}}</span>
        </div>
    </div>
    <div class="san"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
    setup(){
        const keyList = reactive([
            {
              key: 'ctrl + C',
              value: '复制组件'  
            },
            {
              key: 'ctrl + V',
              value: '粘贴组件'  
            },
            {
              key: 'ctrl + X',
              value: '裁剪组件'  
            },
            {
              key: 'delete',
              value: '删除组件'  
            },
            {
              key: 'ctrl + E',
              value: '清空画布'  
            },
            {
              key: 'ctrl + ↑',
              value: '组件上移'  
            },
            {
              key: 'ctrl + ↓',
              value: '组件下移'  
            },
            {
              key: '↑',
              value: '选中上移'  
            },
            {
              key: '↓',
              value: '选中下移'  
            },
        ])
        return {
            keyList
        }
    }
});
</script>
<style scoped lang='scss'>
.shortCutKey {
  position: absolute;
  width: 250px;
  background: #fff;
  top: 0;
  transform: translateY(-105%);
  left: -105px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  z-index: 20;
  padding-bottom: 20px;
  .san{
      position: absolute;
      height: 0;
      width: 0;
      border: 8px solid transparent;
      border-top-color: #fff;
      bottom: -15px;
      left: 50%;
      margin-left: -8px;
  }
  .title{
      text-align: center;
      font-size: 18px;
      padding-top: 5px;
  }
  .keyContent{
      >div{
          display: flex;
          justify-content: space-between;
          align-items: center;
          span{
              padding: 0 15px;
              color: rgb(95, 85, 85);
          }
          span:first-child{
              color: rgb(219, 124, 124);
            //   border: 1px solid rgb(219, 124, 124);

          }
          
      }
  }
}
</style>
