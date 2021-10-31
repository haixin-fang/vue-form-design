<template>
  <div class="editor_pages_center">
    <div class="editor_container" @mousedown="handleMouseDown">
      <ControllEditSize @change="handleCanvasSize" :size="canvasSize" />
    </div>
    <div class="canvasBox" v-show="viewAndJson == 'view'" :ref="viewAndJson == 'view' ? 'canvasBox' : ''" :style="{ transition: isTransition ? 'all 0.05s linear' : '' }" :class="editType == 1 ? 'formCanvasBox' : ''">
      <div class="grid_controller">
        <span :class="gridShow ? 'grid_check' : 'grid_check_none1'" @click="handleGrid(true)">Edit</span>
        <span :class="gridShow ? 'grid_check_none2' : 'grid_check'" @click="handleGrid(false)">Preview</span>
      </div>
      <Grid v-show="gridShow" />
      <div class="draggable_container" ref="dragDom" @contextmenu="handleNoDraggable" v-show="viewAndJson == 'view'">
        <div class="editForm" ref="editForm" v-show="pasteShow">
          <span @click="handlePaste">粘贴</span>
        </div>
        <draggable class="dragArea list-group" animation="300" ghostClass="itemGhost" v-model="allmainList" @add="addControl"  group="starfish-form" @choose="chooseClick" item-key="id" @update="changePos">
          <template #item="{ element, index }">
            <Shape :active="currentIndex == index" @paste="handleDraggableHeight" :currentIndex="index" :len="allmainList.length">
              <div class="list-group-item">
                <component :is="element.ControlType" :drag="true" :item="element" :data="{}"></component>
              </div>
            </Shape>
          </template>
        </draggable>
      </div>
      <!-- <div class="draggable_container" ref="dragDom" @contextmenu="handleNoDraggable" v-show="viewAndJson == 'json'">
        <div ref="jsonCenter" min-height="600"></div>
      </div> -->
    </div>
    <div :ref="viewAndJson == 'json' ? 'canvasBox' : ''" class="jsonCanvas" v-show="viewAndJson == 'json'">
      <div ref="jsonCenter"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, reactive, watch, nextTick, computed } from "vue";
import Grid from "~editor/Grid/index.vue";
import { useUserMove, handleWheelScroll } from "@/utils/editMouse";
import ControllEditSize from "~editor/ControllEditSize/index.vue";
import draggable from "vuedraggable";
import Shape from "~editor/Shape/index.vue";
import { myMixin } from "@/utils/dynamicform";
import { formcomponents } from "@/pages/Editor";
import { useStore } from "vuex";
import _ from "@/utils/_";
import { paste } from "@/utils/shortcutKey";
export default defineComponent({
  components: {
    Grid,
    ControllEditSize,
    draggable,
    Shape,
  },
  // mounted(){

  // },
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
    // 粘贴模块是否显示
    let pasteShow = ref(false);
    let editForm = ref();
    // 控制格子是否显示
    let handleGrid = (show: boolean) => {
      gridShow.value = show;
    };
    // 对store操作
    let store = useStore();
    let editType = computed(() => store.state.editType);
    let jsonCenter = ref();
    let jsonEditor = reactive<any>({});
    let allmainList = computed<any>({
      get() {
        return store.state.form.allFormList;
      },
      set(value) {
        // 防止引用类型污染
        value = value.map((item: any) => {
          if (!item.data && !item.controlItems) {
            item = _.deepClone(item);
            item.formConfig = formcomponents[item.ControlType].formConfig;
            console.log(item.formConfig.data());
            item.data = JSON.parse(JSON.stringify(item.formConfig.data()));
            if (!item.data.fieldName) {
              item.data.fieldName = item.ControlType + "_" + _.generateMixed(3);
            }
            let defaultConfig = JSON.parse(JSON.stringify(myMixin.initControlItems()));
            let controlItems = defaultConfig[0].concat(item.formConfig.morenConfig()).concat(defaultConfig[1]);
            item.rules = _.controlFormRule(controlItems, item);
            item.controlItems = controlItems;
          }
          return item;
        });
        store.commit("updateAllFormList", value);
      },
    });
    let currentIndex = computed(() => {
      return store.state.form.currentIndex;
    });
    let viewAndJson = computed(() => store.state.form.viewAndJson);
    let formListLen = computed(() => store.state.form.formListLen);

    // 鼠标落下
    let handleMouseDown = async (e: any) => {
      store.commit("setFormCurrentIndex", -1);
      isTransition.value = false;
      useUserMove(canvasBox.value, e, isTransition);
    };
    let initJsonCenter = () => {
      let jsonDom = jsonCenter.value;
      const options = {
        modes: ["text", "code", "view"],
        mode: "code",
        search: false,
      };
      // console.log(window.JSONEditor)
      jsonEditor = new window.JSONEditor(jsonDom, options);
      jsonEditor.set(allmainList.value);
    };
    // mounted生命周期
    let handleMounted = () => {
      handleWheelScroll(canvasBox.value);
      initJsonCenter();
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
    let chooseClick = (e: any) => {
      store.commit("setFormCurrentIndex", e.oldIndex);
    };
    // let upDateControlItem = (item: any, index: number) => {};
    let changePos = (e: any) => {
      store.commit("setFormCurrentIndex", e.newIndex);
    };
    let addControl = (e: any) => {
      store.commit("setFormCurrentIndex", e.newIndex);
    };
    let handlePaste = () => {
      pasteShow.value = false;
      paste();
    };
    let handleNoDraggable = (e: any) => {
      if (pasteShow.value) {
        pasteShow.value = false;
      }
      e.preventDefault();
      const path = e.path;
      for (let i = 0; i < path.length; i++) {
        if (path[i].getAttribute && path[i].getAttribute("class") && path[i].getAttribute("class").indexOf("shape") >= 0) {
          return;
        }
      }
      let x = e.offsetX;
      let y = e.offsetY;
      nextTick(() => {
        editForm.value.style.left = x + "px";
        editForm.value.style.top = y + "px";
        pasteShow.value = true;
      });
    };
    // 监听鼠标滚动，编辑器实时变动
    onMounted(handleMounted);
    // 拖拽dom和grid元素都需要顶部和左边对齐，所以dragDom设置了绝对定位
    // 出现了一个问题，canvasBox无法通过子元素的高度进行自适应，所以通过js获取高度直接给父元素赋值
    // 通过监听数据源的方式判断数据是否更新了
    // 数据更新是异步导致高度赋值完成了，dom才更新，所以使用了nextTick
    let handleDraggableHeight = async () => {
      setTimeout(() => {
        jsonEditor.set(allmainList.value);
        canvasBox.value.style.height = dragDom.value.offsetHeight + "px";
      });
    };
    watch(formListLen, handleDraggableHeight);
    return {
      gridShow,
      handleGrid,
      handleMouseDown,
      canvasBox,
      isTransition,
      editForm,
      handleCanvasSize,
      canvasSize,
      dragDom,
      Shape,
      chooseClick,
      addControl,
      changePos,
      allmainList,
      currentIndex,
      handleNoDraggable,
      viewAndJson,
      editType,
      handlePaste,
      pasteShow,
      handleDraggableHeight,
      jsonCenter,
    };
  },
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
    box-shadow: 2px 0 10px rgb(0 0 0 / 20%);
    &.formCanvasBox {
      width: 600px;
      margin-left: -470px;
    }
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
        min-height: $editor_canvas_min_height;
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
.jsonCanvas {
  width: 600px;
  height: 666px;
  position: absolute;
  left: 50%;
  top: 50px;
  transform: translateX(-85%);
  > div {
    width: 100%;
    height: 100%;
  }
}
.editForm {
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 3;
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
      background: #409eff;
      color: white;
    }
  }
}
</style>
