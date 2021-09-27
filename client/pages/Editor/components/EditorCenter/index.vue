<template>
  <div class="editor_pages_center">
    <div class="editor_container" @mousedown="handleMouseDown">
      <div class="canvasBox" ref="canvasBox" :style="{ transition: isTransition ? 'all 0.2s linear' : '' }">
        <div class="grid_controller">
          <span :class="gridShow ? 'grid_check' : 'grid_check_none1'" @click="handleGrid(true)">Edit</span>
          <span :class="gridShow ? 'grid_check_none2' : 'grid_check'" @click="handleGrid(false)">Preview</span>
        </div>
        <Grid v-show="gridShow" />
      </div>
      <ControllEditSize @change="handleCanvasSize" :size="canvasSize" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Grid from "~editor/Grid/index.vue";
import { useUserMove, handleWheelScroll } from "@/utils/editMouse";
import ControllEditSize from "~editor/ControllEditSize/index.vue";
import _ from "@/utils/_";
export default defineComponent({
  components: {
    Grid,
    ControllEditSize,
  },
  setup() {
    // 画布中格子是否显示 默认展示
    let gridShow = ref(true);
    // 画布dom
    let canvasBox = ref();
    // 鼠标点击则取消补间动画，原因：用户鼠标拖动会有延迟
    let isTransition = ref(true);
    // 页面默认大小
    let canvasSize = ref(1);
    // 控制格子是否显示
    let handleGrid = (show: boolean) => {
      gridShow.value = show;
    };
    // 鼠标落下
    let handleMouseDown = (e: any) => {
      isTransition.value = false;
      useUserMove(canvasBox.value, e, isTransition);
    };
    // mounted生命周期
    let handleMounted = () => {
      handleWheelScroll(canvasBox.value);
    };
    let handleCanvasScale = () => {
      // 处理页面的放大缩小
      canvasBox.value.style.transform = `scale(${canvasSize.value})`;
    };
    let handleCanvasSize = (size: string) => {
      if (_.clickCountLimit()) {
        if (size === "add") {
          canvasSize.value = Number((canvasSize.value + 0.1).toFixed(2));
        } else if (size === "cut") {
          canvasSize.value = Number((canvasSize.value - 0.1).toFixed(2));
        } else if (size === "restore") {
          canvasSize.value = 1;
        }
        handleCanvasScale();
      }
    };
    // 监听鼠标滚动，编辑器实时变动
    onMounted(handleMounted);
    return {
      gridShow,
      handleGrid,
      handleMouseDown,
      canvasBox,
      isTransition,
      handleCanvasSize,
      canvasSize,
    };
  },
  methods: {},
});
</script>
<style lang="scss" scoped>
.editor_pages_center {
  overflow: hidden;
  flex: 1;
  background: #f0f2f5;
  .editor_container {
    width: 100%;
    height: 100%;
    border: 1px solid #f5f5f5;
    border-width: 0 1px;
    position: relative;
    .canvasBox {
      width: 375px;
      min-height: $editor_canvas_min_height;
      position: relative;
      left: 50%;
      top: 50px;
      margin-left: -350px;
      background: white;
      transform-origin: 0 0;
      .grid_controller {
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        height: 25px;
        line-height: 25px;
        display: flex;
        background: white;
        span {
          font-size: 14px;
          padding: 0 10px;
          border: 1px solid #d9d9d9;
          box-sizing: border-box;
        }
        .grid_check {
          color: #40a9ff;
          border-color: #40a9ff;
        }
        .grid_check_none2 {
          border-left: transparent;
        }
        .grid_check_none1 {
          border-right: transparent;
        }
      }
    }
  }
}
</style>
