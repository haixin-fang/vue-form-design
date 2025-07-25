<template>
  <div
    class="shape"
    :class="
      active
        ? layout
          ? 'shape_border shape_border_layout'
          : 'shape_border'
        : layout
        ? 'noactive_layout'
        : ''
    "
    @contextmenu="handleShortCut"
    @click="handleMenu"
    :style="{ display: inline ? 'inline-block' : 'block' }"
  >
    <transition name="fade" mode="out-in" appear>
      <div class="editForm" v-show="isShow && active" ref="editForm">
        <span @click="handleActive('copy')">复制</span>
        <span @click="handleActive('cut')">剪切</span>
        <span @click="handleActive('delete')">删除</span>
        <span v-if="copyContent" @click="handleActive('paste')">粘贴</span>
        <span @click="handleActive('top')" v-if="currentIndex != 0">上移</span>
        <span @click="handleActive('bottom')" v-if="currentIndex != len - 1"
          >下移</span
        >
      </div>
    </transition>
    <slot></slot>
    <div class="editbar" v-if="active">
      <span
        class="iconfontui icon-xiangshang1"
        v-if="currentIndex != 0"
        @click.stop="handleActive('top')"
      ></span>
      <span
        class="iconfontui icon-xiangxia1"
        v-if="currentIndex != len - 1"
        @click.stop="handleActive('bottom')"
      ></span>
      <span
        class="iconfontui icon--charulie"
        v-if="item && item.ControlType == 'TableLayout'"
        @click="handleRow"
      ></span>
      <span
        class="iconfontui icon--charuhang"
        v-if="item && item.ControlType == 'TableLayout'"
        @click="handleColumn"
      ></span>
      <span class="iconfontui icon-fuzhi" @click.stop="handleCopyAndPaste"></span>
      <span
        class="iconfontui icon-shanchu1"
        @click.stop="handleActive('delete')"
      ></span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick, watch, computed, inject } from "vue";
import {
  copy,
  paste,
  onDelete,
  cut,
  onTop,
  onBottom,
} from "@/utils/formKeycon";
import type { Controls } from "@/type";
export default defineComponent({
  props: {
    active: Boolean,
    currentIndex: Number,
    len: {
      type: Number,
      default: 0,
    },
    inline: Boolean,
    layout: Boolean,
    currentId: String,
    item: Object,
  },
  setup(props, context) {
    const isShow = ref(false);
    const editForm = ref();
    const { store } = inject<Controls>("control") || {};
    const { emit } = context;
    const copyContent = computed(() => store?.get("copyContent"));
    const handleShortCut = (e: MouseEvent) => {
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
    document.addEventListener('click', () => {
      isShow.value =false;
    })

    const handleColumn = () => {
      const td = {
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            list: [],
          },
          {
            colspan: 1,
            rowspan: 1,
            list: [],
          },
        ],
      };
      props.item?.data.trs.push(td);
    };
    const handleRow = () => {
      props.item?.data.trs.forEach((trs: { tds: any[] }) => {
        trs.tds.push({
          colspan: 1,
          rowspan: 1,
          list: [],
        });
      });
    };

    return {
      isShow,
      handleShortCut,
      handleMenu,
      editForm,
      handleActive,
      handleCopyAndPaste,
      copyContent,
      handleColumn,
      handleRow,
    };
  },
});
</script>

