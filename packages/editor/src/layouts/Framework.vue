<template>
  <div class="starfish-editor">
    <div class="starfish-editor-nav">
      <slot name="nav"></slot>
    </div>
    <div
      class="starfish-editor-content"
      :class="!headerShow ? 'starfish-editor-content-page' : ''"
    >
      <div
        class="starfish-editor-framework-left"
        :class="leftClose ? 'hide-status' : ''"
        :style="`width:${leftClose ? 0 : columnWidth?.left}px`"
      >
        <slot name="left"></slot>
        <div class="container-left-arrow" @click="onLeftArrow"></div>
      </div>
      <!-- resizer组件 -->
      <resizer type="left"></resizer>
      <div
        class="starfish-editor-framework-center"
        :style="`width:${centerWidth}px`"
      >
        <slot name="navlist"></slot>
        <slot name="workspace"></slot>
      </div>
      <resizer type="right"></resizer>
      <div
        class="starfish-editor-framework-right"
        :class="rightClose ? 'hide-status' : ''"
        :style="`width:${rightClose ? 0 : columnWidth?.right}px`"
      >
        <slot name="propsPanel"></slot>
        <div class="container-right-arrow" @click="onRightArrow"></div>
      </div>
    </div>
    <slot name="other"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, computed } from "vue";
import Resizer from "./Resizer.vue";
import type { Controls } from "@/type";
export default defineComponent({
  props: {
    headerShow: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Resizer,
  },
  setup() {
    const { uiControl } = inject<Controls>("control") || {};
    const columnWidth: any = computed(
      () => uiControl?.get("columnWidth") || {}
    );
    const leftClose: any = computed(() => uiControl?.get("leftClose"));
    const rightClose: any = computed(() => uiControl?.get("rightClose"));
    const centerWidth: any = computed(() => {
      const center =
        (leftClose.value ? columnWidth.value.left : 0) +
        centerWidth.value +
        (rightClose.value ? columnWidth.value.right : 0);
      return center;
    });
    function onLeftArrow() {
      uiControl?.set("leftClose", !leftClose.value);
    }
    function onRightArrow() {
      uiControl?.set("rightClose", !rightClose.value);
    }
    return {
      columnWidth,
      leftClose,
      rightClose,
      onLeftArrow,
      onRightArrow,
    };
  },
});
</script>
