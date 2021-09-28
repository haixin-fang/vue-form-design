<template>
  <div class="editor_pages_center">
    <div class="editor_container" @mousedown="handleMouseDown">
      <ControllEditSize @change="handleCanvasSize" :size="canvasSize" />
    </div>
    <div class="canvasBox" ref="canvasBox" :style="{ transition: isTransition ? 'all 0.2s linear' : '' }">
      <div class="grid_controller">
        <span :class="gridShow ? 'grid_check' : 'grid_check_none1'" @click="handleGrid(true)">Edit</span>
        <span :class="gridShow ? 'grid_check_none2' : 'grid_check'" @click="handleGrid(false)">Preview</span>
      </div>
      <Grid v-show="gridShow" />
      <div class="draggable_container" ref="dragDom">
        <draggable class="dragArea list-group" :list="list2" group="people" @change="log" item-key="id">
          <template #item="{ element }">
            <div class="list-group-item">
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, reactive, watch, nextTick } from "vue";
import Grid from "~editor/Grid/index.vue";
import { useUserMove, handleWheelScroll } from "@/utils/editMouse";
import ControllEditSize from "~editor/ControllEditSize/index.vue";
import draggable from "vuedraggable";
import _ from "@/utils/_";
export default defineComponent({
  components: {
    Grid,
    ControllEditSize,
    draggable,
  },
  setup() {
    // 画布中格子是否显示 默认展示
    let gridShow = ref<boolean>(true);
    // 画布dom
    let canvasBox = ref();
    // 鼠标点击则取消补间动画，原因：用户鼠标拖动会有延迟
    let isTransition = ref<boolean>(true);
    // 页面默认大小
    let canvasSize = ref(1);
    // 移动的dom
    let dragDom = ref();
    let list2 = reactive([
      { name: "cat 5", id: 5 },
      { name: "cat 6", id: 6 },
      { name: "cat 7", id: 7 },
    ]);
    // 控制格子是否显示
    let handleGrid = (show: boolean) => {
      gridShow.value = show;
    };
    // 鼠标落下
    let handleMouseDown = (e: any) => {
      debugger;
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
        // 限制放大缩小指定范围
        if (size === "add" && canvasSize.value < 1.5) {
          canvasSize.value = Number((canvasSize.value + 0.1).toFixed(2));
        } else if (size === "cut" && canvasSize.value > 0.5) {
          canvasSize.value = Number((canvasSize.value - 0.1).toFixed(2));
        } else if (size === "restore") {
          canvasSize.value = 1;
        }
        handleCanvasScale();
      }
    };
    // 监听鼠标滚动，编辑器实时变动
    onMounted(handleMounted);
    // 拖拽dom和grid元素都需要顶部和左边对齐，所以dragDom设置了绝对定位
    // 出现了一个问题，canvasBox无法通过子元素的高度进行自适应，所以通过js获取高度直接给父元素赋值
    // 通过监听数据源的方式判断数据是否更新了
    // 数据更新是异步导致高度赋值完成了，dom才更新，所以使用了nextTick
    watch(list2, async () => {
      await nextTick();
      canvasBox.value.style.height = dragDom.value.offsetHeight + "px";
    });
    return {
      gridShow,
      handleGrid,
      handleMouseDown,
      canvasBox,
      isTransition,
      handleCanvasSize,
      canvasSize,
      dragDom,
      list2,
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
  position: relative;
  .editor_container {
    width: 100%;
    height: 100%;
    border: 1px solid #f5f5f5;
    border-width: 0 1px;
    position: absolute;
  }
  .canvasBox {
    width: 375px;
    height: auto;
    min-height: $editor_canvas_min_height;
    position: absolute;
    left: 50%;
    top: 50px;
    margin-left: -350px;
    background: white;
    transform-origin: 0 0;
    .draggable_container {
      width: 100%;
      min-height: $editor_canvas_min_height;
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      .dragArea {
        width: 100%;
        height: 100%;
        .list-group-item {
          height: 100px;
        }
      }
    }
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
</style>
