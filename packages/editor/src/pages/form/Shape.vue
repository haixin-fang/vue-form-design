<template>
  <div class="shape" :class="active?(layout?'shape_border shape_border_layout':'shape_border'):layout?'noactive_layout':''"  @contextmenu="handleShortCut" @click="handleMenu" :style="{ display: inline ? 'inline-block' : 'block' }">
    <div class="editForm" v-show="isShow && active" ref="editForm">
      <span @click="handleActive('copy')">复制</span>
      <span @click="handleActive('cut')">剪切</span>
      <span @click="handleActive('delete')">删除</span>
      <span v-if="copyContent" @click="handleActive('paste')">粘贴</span>
      <span @click="handleActive('top')" v-if="currentIndex != 0">上移</span>
      <span @click="handleActive('bottom')" v-if="currentIndex != len - 1">下移</span>
    </div>
    <slot></slot>
    <div class="editbar" v-if="active">
      <span class="iconfont icon-xiangshang1" v-if="currentIndex != 0" @click="handleActive('top')"></span>
      <span class="iconfont icon-xiangxia1" v-if="currentIndex != len - 1" @click="handleActive('bottom')"></span>
      <span class="iconfont icon-fuzhi" @click="handleCopyAndPaste"></span>
      <span class="iconfont icon-shanchu1" @click="handleActive('delete')"></span>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick, watch, computed } from "vue";
  import { copy, paste, onDelete, cut, onTop, onBottom } from "@/utils/formKeycon";
  import useStore from "@/store/form";
  export default defineComponent({
    props: {
      active: Boolean,
      currentIndex: Number,
      len: Number,
      inline: Boolean,
      layout: Boolean,
    },
    mounted() {
      console.log(this.currentIndex);
      console.log(this.len);
    },
    setup(props, context) {
      const isShow = ref(false);
      const editForm = ref();
      const { emit } = context;
      const copyContent = computed(() => useStore.get("copyContent"));
      const handleShortCut = (e: any) => {
        if (props.active) {
          e.preventDefault();
          isShow.value = true;
          const x = e.offsetX;
          const y = e.offsetY;
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
      const handleMenu = () => {
        isShow.value = false;
      };
      const handleActive = (type: string) => {
        if (type === "copy") {
          copy();
        } else if (type === "paste") {
          emit("paste");
          paste();
        } else if (type === "cut") {
          cut();
        } else if (type === "delete") {
          onDelete();
        } else if (type === "top") {
          onTop();
        } else if (type === "bottom") {
          onBottom();
        }
      };
      const handleCopyAndPaste = () => {
        copy();
        emit("paste");
        paste();
      };
      return {
        isShow,
        handleShortCut,
        handleMenu,
        editForm,
        handleActive,
        handleCopyAndPaste,
        copyContent,
      };
    },
  });
</script>
<style lang="scss">
  .shape {
    box-sizing: content-box;
    // padding-bottom: 12px;
    border: 2px solid transparent;
    position: relative;
    cursor: move;
    border: 2px dotted #dfe2e2;
    box-sizing: border-box;
    &::before {
      content: "";
      height: 5px;
      width: 0;
      background: $blue;
      position: absolute;
      bottom: 0;
      left: 100%;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }
    .editbar {
      position: absolute;
      bottom: 0;
      right: 0;
      border-radius: 10px 0 0 0;
      background: $blue;
      color: white;
      padding: 1px 5px;
      z-index: 3333333;
      span {
        padding: 0 5px;
        font-weight: 500;
      }
      span:first-child,
      span:nth-child(2) {
        font-size: 14px;
      }
    }
    .editForm {
      position: absolute;
      display: flex;
      flex-direction: column;
      z-index: 3333334;
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
          background: $blue;
          color: white;
        }
      }
    }
  }
  .itemGhost {
    background-color: #e70c557e;
  }
  .shape_border {
    border: 2px solid $blue;
    background:#d1e4f6;
    &::before{
      left: 0;
      width: 100%;
    }
  }
  .shape_border_layout{
    background: rgba(152, 103, 247, 0.24);
    border: 2px solid $layout_color;
    &::before{
      background: $layout_color;
    }
    .editbar{
      background: $layout_color;
    }
  }
  .noactive_layout{
    background: rgba(152, 103, 247, 0.1);
  }
</style>
