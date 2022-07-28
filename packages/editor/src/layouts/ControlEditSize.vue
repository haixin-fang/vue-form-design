<template>
  <div class="controller_edit_size" ref="controllerSize">
    <span @click="handleCanvasSize(0.1)"><i class="iconfont icon-jiahao"></i></span>
    <span>{{ parseInt(String(size * 100)) }}%</span>
    <span @click="handleCanvasSize(-0.1)"><i class="iconfont icon-jianhao"></i></span>
    <span @mouseover="handleShortcutShow" @mouseleave="handleShortCutHidden">
      <i class="iconfont icon-jianpan_o"></i>
      <transition name="slide-fade">
        <shortcutKey v-show="shortCutShow" />
      </transition>
    </span>
    <span @click="handleCanvasSize()" title="复位">
      <i class="iconfont icon-huanyuan"></i>
    </span>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, inject, computed } from "vue";
  import shortcutKey from "./ShortcutKey.vue";
  import type { Controls } from "@/type";
  export default defineComponent({
    components: {
      shortcutKey,
    },
    setup() {
      const { uiControl } = inject<Controls>("control") || {};
      const controllerSize = ref();
      const shortCutShow = ref(false);
      const handleCanvasSize = (size?: number) => {
        if (!size) {
          uiControl?.set<number>("scale", 1);
        } else {
          uiControl?.set<number>("scale", (uiControl?.get<number>("scale") || 1) + size);
        }
      };
      const handleShortCutHidden = () => {
        shortCutShow.value = false;
      };
      const handleShortcutShow = () => {
        shortCutShow.value = true;
      };
      return {
        size: computed(() => uiControl?.get<number>("scale")  || 1 ),
        handleCanvasSize,
        controllerSize,
        shortCutShow,
        handleShortCutHidden,
        handleShortcutShow,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .controller_edit_size {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 3;
    width: 38px;
    line-height: 50px;
    background: white;
    border-radius: 4px;
    color: #4a4a4a;
    span {
      font-size: 14px;
    }
  }
  .slide-fade-enter-active {
    transition: all 0.2s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter-to,
  .slide-fade-leave {
    transform: translateX(0) scale(1);
    // transform-origin: center bottom;
    opacity: 1;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-80%) scale(0.5);
    // transform-origin: center bottom;
    // transform: translateX(5px);
    // opacity: 0;
  }
</style>
