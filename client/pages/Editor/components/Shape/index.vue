<template>
  <div class="shape" :class="[active ? 'shape_border' : '']" @contextmenu="handleShortCut" @click="handleMenu">
    <div class="editForm" v-show="isShow && active" ref="editForm">
      <span @click="handleActive('copy')">复制</span>
      <span @click="handleActive('cut')">剪切</span>
      <span @click="handleActive('delete')">删除</span>
      <span v-if="copyContent" @click="handleActive('paste')">粘贴</span>
      <span @click="handleActive('top')" v-if="currentIndex != 0">上移</span>
      <span @click="handleActive('bottom')" v-if="currentIndex != len - 1">下移</span>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, nextTick, watch, computed, reactive } from "vue";
import {copy, paste, onDelete, cut, onTop, onBottom} from '@/utils/shortcutKey'
import {useStore} from 'vuex'
export default defineComponent({
  props: {
    active: Boolean,
    currentIndex: Number,
    len: Number
  },
  mounted(){
    console.log(this.currentIndex)
    console.log(this.len)
  },
  setup(props, context) {
    let store = useStore();
    let isShow = ref(false);
    let editForm = ref();
    let {emit} = context
    let copyContent = computed(() => store.state.copyContent)
    let handleShortCut = (e: any) => {
      if (props.active) {
        e.preventDefault();
        isShow.value = true;
        let x = e.offsetX;
        let y = e.offsetY;
        nextTick(() => {
          editForm.value.style.left = x + "px";
          editForm.value.style.top = y + "px";
        });
      }
    };
    watch(
      () => props.active,
      () => {
        if (!props.active) {
          isShow.value = props.active;
        }
      }
    );
    let handleMenu = () => {
      isShow.value = false;
    };
    let handleActive = (type: string) => {
      if(type === 'copy'){
        copy()
      }else if(type === 'paste'){
        emit('paste')
        paste()
      }else if(type === 'cut'){
        cut()
      }else if(type === 'delete'){
        onDelete()
      }else if(type === 'top'){
        onTop()
      }else if(type === 'bottom'){
        onBottom()
      }
    }
    return {
      isShow,
      handleShortCut,
      handleMenu,
      editForm,
      handleActive,
      copyContent
    };
  },
});
</script>
<style lang="scss">
.shape {
  box-sizing: content-box;
  padding-bottom: 12px;
  border: 2px solid transparent;
  position: relative;
  cursor: move;
  .editForm {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 3;
    user-select: none;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 10px 20px rgb(0 0 0 / 30%), 0 0 0 1px #eee;
    padding: 5px 0;
    min-width: 180px;
    span {
      padding: 6px 12px;
      display: flex;
      text-align: left;
      white-space: nowrap;
      color: #333;
      position: relative;
      &:hover {
        background: #409eff;
        color: white;
      }
    }
  }
}
.itemGhost {
  background-color: #e70c557e;
}
.shape_border {
  border: 2px solid #409eff;
}
</style>
