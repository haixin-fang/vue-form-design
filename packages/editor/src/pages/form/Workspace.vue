<template>
  <div class="editor_pages_center">
    <div class="canvasBox" ref="canvasBox" :class="editType == 1 ? 'formCanvasBox' : ''" :style="`transform: translateX(-50%) scale(${scale})`">
      <div class="draggable_container" ref="dragDom" @contextmenu="handleNoDraggable">
        <div class="editForm" ref="editForm" v-show="pasteShow">
          <span @click="handlePaste">粘贴</span>
        </div>
        <draggable class="dragArea list-group" animation="300" ghostClass="itemGhost" v-model="allmainList" @add="addControl" group="starfish-form" @choose="chooseClick" item-key="id" @update="changePos">
          <template #item="{ element, index }">
            <Shape :active="currentIndex == index" :currentIndex="index" :len="allmainList.length" :inline="globalDatas.Inline" :layout="globalDatas.layout">
              <component :is="element.ControlType" :drag="true" :item="element" :data="{}" :inline="globalDatas.Inline" :layout="globalDatas.layout" :labelalign="globalDatas.labelAlign" :labelWidth="globalDatas.labelWidth" :suffix="globalDatas.suffix"></component>
            </Shape>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick, computed, getCurrentInstance, inject } from "vue";
  import draggable from "vuedraggable";
  import Shape from "~editor/Shape.vue";
  // import { formcomponents } from "@/pages/Editor";
  import formStore from "@/store/form";
  import store from "@/store/index";
  import { paste } from "@/utils/formKeycon";
  import type { Controls } from "@/type";
  export default defineComponent({
    components: {
      draggable,
      Shape,
    },
    setup() {
      const { proxy } = getCurrentInstance() as any;
      const { uiControl } = inject<Controls>("control") || {};
      const formcomponents = proxy.$formcomponents;
      // 画布dom
      const canvasBox = ref();
      // 页面默认大小
      const canvasSize = ref(1);
      // 移动的dom
      const dragDom = ref();
      // 粘贴模块是否显示
      const pasteShow = ref(false);
      const editForm = ref();
      // 对store操作
      const editType = computed(() => store.get("editType"));

      const globalDatas = computed(() => formStore?.get("globalDatas"));

      const allmainList = computed<any>({
        get() {
          return formStore.get("allFormList");
        },
        set(value) {
          // 防止引用类型污染
          value = value.map((item: any) => {
            if (!item.data && !item.controlItems) {
              item = proxy.$Flex.deepClone(item);
              item.formConfig = formcomponents[item.ControlType].formConfig;
              item.data = item.formConfig.data();
              if (!item.data.fieldName) {
                item.data.fieldName = item.ControlType + "_" + proxy.$Flex.generateMixed(6);
              }
              const controlItems = item.formConfig.morenConfig();
              item.rules = proxy.$Flex.controlFormRule(controlItems, item);
              item.controlItems = controlItems;
            }
            // delete item.formConfig;
            // delete item.icon;
            return item;
          });
          formStore.updateAllFormList(value);
        },
      });
      const currentIndex = computed(() => {
        return formStore.get("currentIndex");
      });

      const handleCanvasScale = () => {
        // 处理页面的放大缩小
        canvasBox.value.style.transform = `scale(${canvasSize.value})`;
      };
      const handleCanvasSize = (size: string) => {
        if (proxy.$Flex.clickCountLimit()) {
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
      const chooseClick = (e: any) => {
        formStore.setFormCurrentIndex(e.oldIndex);
      };
      const changePos = (e: any) => {
        formStore.setFormCurrentIndex(e.newIndex);
      };
      const addControl = (e: any) => {
        formStore.setFormCurrentIndex(e.newIndex);
      };
      const handlePaste = () => {
        pasteShow.value = false;
        paste();
      };
      const handleNoDraggable = (e: any) => {
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
        const x = e.offsetX;
        const y = e.offsetY;
        nextTick(() => {
          editForm.value.style.left = x + "px";
          editForm.value.style.top = y + "px";
          pasteShow.value = true;
        });
      };
      return {
        scale: computed(() => uiControl?.get<number>("scale")),
        globalDatas,
        canvasBox,
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
        editType,
        handlePaste,
        pasteShow,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .editor_pages_center {
    background: #f0f2f5;
    position: relative;
    height: 100%;
    overflow-y: auto;
    .canvasBox {
      width: 375px;
      height: auto;
      min-height: $editor_canvas_min_height;
      position: absolute;
      left: 50%;
      top: 50px;
      // margin-left: -350px;
      background: white;
      transform-origin: 50% 0;
      box-shadow: 2px 0 10px rgb(0 0 0 / 20%);
      transition: all 0.2s linear;
      &.formCanvasBox {
        width: 500px;
        // margin-left: -470px;
      }
      .draggable_container {
        width: 100%;
        min-height: $editor_canvas_min_height;
        z-index: 1;
        text-align: left;
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
    height: 666px !important;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

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
