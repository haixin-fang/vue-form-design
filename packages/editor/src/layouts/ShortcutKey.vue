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
import { defineComponent, reactive} from "vue";

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
