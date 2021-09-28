<template>
  <div class="controller_edit_size" @mousedown="handleMouseDownSize" ref="controllerSize">
    <span @click="handleCanvasSize('add')"><i class="iconfont icon-jiahao"></i></span>
    <span>{{ parseInt(size * 100) }}%</span>
    <span @click="handleCanvasSize('cut')"><i class="iconfont icon-jianhao"></i></span>
    <span class="line">
      <i class="iconfont icon-jianpan_o"></i>
    </span>
    <span class="line" @click="handleCanvasSize('restore')">
      <i class="iconfont icon-huanyuan"></i>
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, ref } from "vue";
import { useUserMove } from "@/utils/editMouse";
export default defineComponent({
  props: {
    size: Number,
  },
  setup(props, context) {
    let parent = { ...context };
    // controllerEditSize dom
    let controllerSize = ref();
    let isTransition = ref(false);
    let date = reactive({
      handleCanvasSize: (type: string) => {
        parent.emit("change", type);
      },
    });
    // 鼠标落到ControllEditSize上面
    let handleMouseDownSize = (e: any) => {
      useUserMove(controllerSize.value, e, isTransition);
    };
    return {
      ...toRefs(date),
      controllerSize,
      handleMouseDownSize,
    };
  },
});
</script>
<style lang="scss" scoped>
.controller_edit_size {
  position: absolute;
  display: inline-block;
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
  span:nth-child(3) {
    // padding-right: 1px;
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
</style>
