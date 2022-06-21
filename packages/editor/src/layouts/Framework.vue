<template>
  <div class="starfish-editor">
    <div class="starfish-editor-nav">
      <slot name="nav"></slot>
    </div>
    <div class="starfish-editor-content">
      <div class="starfish-editor-framework-left" :style="`width:${columnWidth?.left}px`">
        <slot name="left"></slot>
      </div>
      <!-- resizer组件 -->
      <resizer type="left"></resizer>
      <div class="starfish-editor-framework-center" :style="`width:${columnWidth?.center}px`">
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
    components: {
      Resizer,
    },
    setup() {
      const { uiControl } = inject<Controls>("control") || {};
      return {
        columnWidth: computed(() => uiControl?.get("columnWidth")),
      };
    },
  });
</script>
<style lang="scss" scoped>
  .starfish-editor {
    height: 100%;
    display: flex;
    flex-direction: column;
    &-content {
      display: flex;
      height: calc(100% - #{$editor_nav});
    }
    &-framework {
      &-left {
        width: 300px;
      }
      &-center {
        flex: 1;
      }
      &-right {
        width: 378px;
      }
    }
  }
</style>
