<template>
  <div class="nav">
    <div class="logo">
      starfish-vue3-lowcode
    </div>
    <div class="detailBtn">
      <el-button plain @click="handleFormSave()" size="small" :disabled="clearIsDisable">保存</el-button>
      <el-button plain @click="handleFormPre()" size="small" :disabled="clearIsDisable">预览</el-button>
      <el-button plain @click="handleClear()" size="small" :disabled="clearIsDisable">清空</el-button>
      <el-button plain @click="handleBack()" size="small" :disabled="historyIndex == -1">后退</el-button>
      <el-button plain @click="handleForward()" size="small" :disabled="historyIndex == historyLen - 1">前进</el-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, getCurrentInstance, onMounted, onUnmounted, inject } from "vue";
  import type {Controls} from '@/type'
  import formStore from "@/store/form";
  import { clearCanvas } from "@/utils/formKeycon";
  /**
   * 2022.7.1想到的优化点
   * 新增json导入导出功能
   */
  export default defineComponent({
    setup() {
      const { proxy } = getCurrentInstance() as any;
       const { hisContrl } = inject<Controls>("control") || {};
      const formUpdate = computed(() => formStore?.get("formUpdate"));
      const lastTime = computed(() => formStore?.get('saveTimetemp'));
      const clearIsDisable = computed(() => formStore?.get('allFormList')?.length == 0)
      const historyIndex = computed(() => hisContrl?.get('index'));
      const historyLen = computed(() => hisContrl?.get<Array<any>>('historyList').length)
      let timer:unknown = null;
      const handleFormSave = (type?: string) => {
        if (formStore.get("save") && !formUpdate.value && !type) {
          proxy.$Flex.open("已保存，请不要重复保存",'Warning','warning');
        } else {
          formStore.set('saveTimetemp', new Date().getTime())
          proxy.$EventBus.emit("setSave", type);
        }
      };
      const handleFormPre = () => {
        proxy.$EventBus.emit("openPreview");
      };

      const setTimeSave = () => {
        timer = setInterval(() => {
          const nowTime = new Date().getTime();
          if(nowTime - lastTime.value > 5 * 60 * 1000){
            handleFormSave('auto');
          }
        }, 20000)
      }

      // 每隔一分钟判断是否更改了内容,如果有更改则自动保存
      onMounted(() => {
        setTimeSave()
      })
      onUnmounted(() => {
        clearInterval(timer as any);
      })

      return {
        handleFormSave,
        handleFormPre,
        historyIndex,
        historyLen,
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
        }
      }; 
    },
  });
</script>
<style lang="scss" scoped>
  .nav {
    height: $editor_nav;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $editor-nav-background-color;
    border-bottom: 1px solid #d8dee8;
    padding: 0 15px;
    .logo {
      font-size: 20px;
      font-style: italic;
      color: #409eff;
      font-weight: bold;
    }
  }
</style>
