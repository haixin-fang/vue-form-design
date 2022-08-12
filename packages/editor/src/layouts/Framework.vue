<template>
  <div class="starfish-editor">
    <div class="starfish-editor-nav">
      <slot name="nav"></slot>
    </div>
    <div class="starfish-editor-content" :class="!headerShow?'starfish-editor-content-page':''">
      <div class="starfish-editor-framework-left" :style="`width:${columnWidth?.left}px`">
        <slot name="left"></slot>
      </div>
      <!-- resizer组件 -->
      <resizer type="left"></resizer>
      <div class="starfish-editor-framework-center" :style="`width:${columnWidth?.center}px`">
        <slot name="navlist"></slot>
        <slot name="workspace"></slot>
      </div>
      <resizer type="right"></resizer>
      <div class="starfish-editor-framework-right" :style="`width:${columnWidth?.right}px`">
        <slot name="propsPanel"></slot>
      </div>
    </div>
    <slot name='other'></slot>
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
      }
    },
    components: {
      Resizer,
    },
    setup() {
      const { uiControl } = inject<Controls>("control") || {};
      const columnWidth:any = computed(() => uiControl?.get("columnWidth") || {});
      return {
        columnWidth,
      };
    },
  });
</script>
