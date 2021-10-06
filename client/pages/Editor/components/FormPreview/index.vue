<template>
  <CustomDialog ref="previewDialog" :showDialog="previewShow" @close="handlePreviewShow">
    <div class="formconfig">
        <dynamicform
          :formResult="formResult"
          :allFormList="allFormList"
          ref="dynamicform"
        />
      </div>
  </CustomDialog>
  <!-- <div class="preview" v-if="previewShow">
    <div class="mask"></div>
    <div
      class="previewContext"
      :class="expand ? 'previewExpand' : 'previewMoren'"
    >
      <div class="previewTitle">
        <span>
          <i class="iconfont icon-biaodan"></i>
        </span>
        <span>表单预览</span>
        <button @click="handleFormResult">保存</button>
        <div class="controlPreview">
          <span
            class="iconfont icon-kuoda"
            @click="handleExpand(true)"
            v-if="!expand"
          ></span>
          <span
            class="iconfont icon-suoxiao"
            @click="handleExpand(false)"
            v-if="expand"
          ></span>
          <span class="iconfont icon-guanbi" @click="handlePreviewShow"></span>
        </div>
      </div>
      <div class="formconfig">
        <dynamicform
          :formResult="formResult"
          :allFormList="allFormList"
          ref="dynamicform"
        />
      </div>
    </div>
  </div> -->
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import dynamicform from "~editor/dynamicform/index.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    dynamicform,
  },
  setup() {
    let store = useStore();
    let previewShow = computed(() => store.state.form.preview);
    let allFormList = computed(() => store.state.form.AllFormResult);
    let formResult = computed(() => store.state.form.formResult);
    let dynamicform = ref();
    let previewDialog = ref<any>();
    let handlePreviewShow = () => {
      store.commit("openPreview", false);
    };
    let handleFormResult = () => {
      // 配置组件时动态表单提交时进行校验
      dynamicform.value.ruleForm.validate((valid: any, errFields: any) => {
        console.log(dynamicform.value);
      });
    };
    watch(previewShow, () => {
      if(!previewShow.value){
        previewDialog.value.close()
      }else{
        previewDialog.value.init('表单预览', 'icon-biaodan')
      }
    })
    return {
      previewShow,
      previewDialog,
      handlePreviewShow,
      handleFormResult,
      allFormList,
      formResult,
      dynamicform,
    };
  },
});
</script>
<style lang="scss">
.preview {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 6;
  }
  .previewContext {
    width: 80%;
    height: 80%;
    top: 50%;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    background: white;
    z-index: 7;
    border-radius: 10px;
    overflow: auto;
    &.previewMoren {
      width: 80%;
      height: 80%;
    }
    &.previewExpand {
      width: 100%;
      height: 100%;
    }
    .previewTitle {
      width: 100%;
      height: 60px;
      background: #eee;
      text-align: left;
      line-height: 60px;
      font-size: 20px;
      display: flex;
      align-items: center;
      position: relative;
      .controlPreview {
        position: absolute;
        right: 20px;
        span {
          font-size: 24px;
          margin-left: 6px;
        }
      }
      i {
        font-size: 20px;
        color: white;
      }
      > span:first-child {
        width: 30px;
        height: 30px;
        background: #409eff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
      }
    }
  }
}
</style>
