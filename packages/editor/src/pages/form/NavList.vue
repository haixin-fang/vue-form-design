<template>
  <div class="nav">
    <div class="detailBtn">
      <el-tooltip class="box-item" effect="dark" content="保存" placement="top">
        <span class="iconfont icon-baocun" :class="clearIsDisable?'noactive':''" @click="handleFormSave()"></span>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="预览" placement="top">
        <span class="iconfont icon-icon_yulan" :class="clearIsDisable?'noactive':''" @click="handleFormPre()"></span>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="全屏" placement="top" v-if='!fullscreen'>
        <span class="iconfont icon-quanping" @click="handleFullScreen()" ></span>
      </el-tooltip>
       <el-tooltip class="box-item" effect="dark" content="非全屏" placement="top" v-if='fullscreen'>
        <span class="iconfont icon-suoxiao1" @click="handleFullScreen()" ></span>
      </el-tooltip>
       <el-tooltip class="box-item" effect="dark" content="清空" placement="top">
        <span class="iconfont icon-shanchu1" :class="clearIsDisable?'noactive':''" @click="handleClear()"> </span>
      </el-tooltip>
       <el-tooltip class="box-item" effect="dark" content="撤销" placement="top">
        <span class="iconfont icon-24gl-undo3" :class="historyIndex == -1?'noactive':''" @click="handleBack()"></span>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="重做" placement="top">
        <span class="iconfont icon-24gl-redo3" :class="historyIndex == historyLen - 1?'noactive':''" @click="handleForward()"></span>
      </el-tooltip>
      <!-- <el-button plain @click="handleFormSave()" size="small" :disabled="clearIsDisable">保存</el-button>
      <el-button plain @click="handleFormPre()" size="small" :disabled="clearIsDisable">预览</el-button>
      <el-button plain @click="handleFullScreen()" size="small">全屏/非全屏</el-button>
      <el-button plain @click="handleClear()" size="small" :disabled="clearIsDisable">清空</el-button>
      <el-button plain @click="handleBack()" size="small" :disabled="historyIndex == -1">后退</el-button>
      <el-button plain @click="handleForward()" size="small" :disabled="historyIndex == historyLen - 1">前进</el-button> -->
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, getCurrentInstance, onMounted, onUnmounted, inject } from "vue";
  import type { Controls } from "@/type";
  import formStore from "@/store/form";
  import { clearCanvas } from "@/utils/formKeycon";
  /**
   * 2022.7.1想到的优化点
   * 新增json导入导出功能
   */
  export default defineComponent({
    setup() {
      const { proxy } = getCurrentInstance() as any;
      const { hisContrl, uiControl } = inject<Controls>("control") || {};
      const formUpdate = computed(() => formStore?.get("formUpdate"));
      const lastTime = computed(() => formStore?.get("saveTimetemp"));
      const clearIsDisable = computed(() => formStore?.get("allFormList")?.length == 0);
      const historyIndex = computed(() => hisContrl?.get("index"));
      const historyLen = computed(() => hisContrl?.get<Array<any>>("historyList").length);
      const fullscreen = computed(() => uiControl?.get('isFullscreen'));
      let timer: unknown = null;
      const handleFormSave = (type?: string) => {
        if (formStore.get("save") && !formUpdate.value && !type) {
          proxy.$Flex.open("已保存，请不要重复保存", "Warning", "warning");
        } else {
          formStore.set("saveTimetemp", new Date().getTime());
          proxy.$EventBus.emit("setSave", type);
        }
      };
      const handleFormPre = () => {
        proxy.$EventBus.emit("openPreview");
      };

      const setTimeSave = () => {
        timer = setInterval(() => {
          const nowTime = new Date().getTime();
          if (nowTime - lastTime.value > 5 * 60 * 1000) {
            handleFormSave("auto");
          }
        }, 20000);
      };

      // 每隔一分钟判断是否更改了内容,如果有更改则自动保存
      onMounted(() => {
        setTimeSave();
      });
      onUnmounted(() => {
        clearInterval(timer as any);
      });

      return {
        handleFormSave,
        handleFormPre,
        historyIndex,
        historyLen,
        fullscreen,
        clearIsDisable,
        handleClear: () => {
          clearCanvas();
          formStore.setFormCurrentIndex(-1);
        },
        handleBack: () => {
          hisContrl?.back();
        },
        handleForward: () => {
          hisContrl?.go();
        },
        handleFullScreen: () => {
          uiControl?.set("isFullscreen", !uiControl?.get("isFullscreen"));
        },
      };
    },
  });
</script>
<style lang="scss" scoped>
  .nav {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $editor-nav-background-color;
    border-bottom: 2px solid #d8dee8;
    padding: 0 15px;
    .detailBtn{
      span{
        padding: 0 5px;
        font-size: 18px;
      }
      .noactive{
        color: #a1a7b0;
        cursor: no-drop;
      }
    }
  }
</style>
