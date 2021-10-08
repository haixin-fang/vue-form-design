<template>
  <div class="shape" :class="[active ? 'shape_border' : '']" @contextmenu="handleShortCut" @click="handleMenu">
    <div class="editForm" v-show="isShow && active" ref="editForm">
      <span>复制</span>
      <span>剪切</span>
      <span>删除</span>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, nextTick, watch, watchEffect, reactive } from "vue";

export default defineComponent({
  props: {
    active: Boolean,
  },
  setup(props) {
    let isShow = ref(false);
    let editForm = ref();
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
    return {
      isShow,
      handleShortCut,
      handleMenu,
      editForm,
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
