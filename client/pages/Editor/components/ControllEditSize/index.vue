<template>
  <div class="controller_edit_size" @mousedown="handleMouseDownSize" ref="controllerSize">
    <span @click="handleCanvasSize('add')"><i class="iconfont icon-jiahao"></i></span>
    <span>{{ parseInt(size * 100) }}%</span>
    <span @click="handleCanvasSize('cut')"><i class="iconfont icon-jianhao"></i></span>
    <span class="line" @mouseover="handleShortcutShow" @mouseleave="handleShortCutHidden">
      <i class="iconfont icon-jianpan_o"></i>
      <transition name="slide-fade">
        <shortcutKey v-show="shortCutShow" />
      </transition>
    </span>
    <span class="line" @click="handleCanvasSize('restore')" title="复位">
      <i class="iconfont icon-huanyuan"></i>
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, ref } from "vue";
import { useUserMove } from "@/utils/editMouse";
import shortcutKey from "~editor/ShortcutKey/index.vue";
export default defineComponent({
  components: {
    shortcutKey,
  },
  props: {
    size: Number,
  },
  setup(props, context) {
    let parent = { ...context };
    // controllerEditSize dom
    let controllerSize = ref();
    let isTransition = ref(false);
    let shortCutShow = ref(false);
    let date = reactive({
      handleCanvasSize: (type: string) => {
        parent.emit("change", type);
      },
    });
    // 鼠标落到ControllEditSize上面
    let handleMouseDownSize = (e: any) => {
      useUserMove(controllerSize.value, e, isTransition);
    };
    let handleShortCutHidden = (e: any) => {
      shortCutShow.value = false;
    };
    let handleShortcutShow = (e: any) => {
      console.log("1");
      shortCutShow.value = true;
    };
    return {
      ...toRefs(date),
      controllerSize,
      shortCutShow,
      handleMouseDownSize,
      handleShortCutHidden,
      handleShortcutShow,
    };
  },
});
</script>
<style lang="scss" scoped>
.controller_edit_size {
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 3;
  right: 290px;
  bottom: 150px;
  height: 32px;
  line-height: 30px;
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: #4a4a4a;
  span {
    padding: 0 4px;
    font-size: 14px;
  }
  span:first-child {
    padding-left: 15px;
  }
  span:nth-child(4) {
    position: relative;
  }
  .line::before {
    content: "|";
    color: #dbdbdb;
    margin-right: 5px;
    position: relative;
    top: -1px;
  }
  .line {
    i {
      position: relative;
      top: 1px;
      font-size: 18px;
    }
  }
}
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-to, .slide-fade-leave{
  transform: translateY(-105%) scale(1);
  transform-origin: center bottom;
  opacity: 1;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-105%) scale(0.5);
  transform-origin: center bottom;
  // transform: translateX(5px);
  // opacity: 0;
}
</style>
