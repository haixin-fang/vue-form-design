<template>
  <div class="editor_pages_right" ref="editRight" :class="[moduleIsHidden ? 'editor_pages_right_visible' : 'editor_pages_right_hidden', isTransition ? 'editor_transition' : '']">
    <div class="editor_right_accept" @click="handleEditBtn">
      <i class="iconfont icon-jiantou_xiangyouliangci" :class="moduleIsHidden ? 'icon-jiantou_xiangyouliangci' : 'icon-jiantou_xiangzuoliangci'"></i>
    </div>
    <div class="controlLine" @mousedown="handleLine"></div>
    <div class="viewAndJson">
      <el-button type="primary" size="medium" :plain="viewAndJson !== 'view'" @click="triggerViewJson('view')">视图</el-button>
      <el-button type="primary" size="medium" :plain="viewAndJson !== 'json'" @click="triggerViewJson('json')">JSON</el-button>
      <!-- <div class="view" :class="viewAndJson == 'view' ? 'active' : ''" @click="triggerViewJson('view')">视图</div>
      <div class="json" :class="viewAndJson == 'json' ? 'active' : ''" @click="triggerViewJson('json')">JSON</div> -->
    </div>
    <div class="dynamic">
      <el-form ref="ruleForm" :model="curControl.data || {}" :rules="curControl.rules" label-width="120px" :status-icon="true">
        <el-form-item v-for="(item, index) in controlItems" :key="index" :control="item.ControlType" :prop="item.data.fieldName">
          <component :drag="false" :is="item.ControlType" :data="curControl.data" :item="item" v-if="(show && item.ControlType === 'JsonEditor') || item.ControlType !== 'JsonEditor'"></component>
        </el-form-item>
      </el-form>
      <el-empty :image-size="200" v-if="!curControl.data" description="没有选中表单控件"></el-empty>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch, nextTick } from "vue";
import { useStore } from "vuex";
import _ from "@/utils/_";
import vm from '@/utils/vm'
export default defineComponent({
  setup() {
    // 该模块是否隐藏 默认显示
    let moduleIsHidden = ref(true);
    let show = ref(true);
    let ruleForm = ref();
    let editRight = ref();
    let store = useStore();
    let isTransition = ref(true); // 默认有补间动画
    let controlItems = computed(() => store.getters.getControlItems);
    let curControl = computed(() => store.state.form.curControl);
    let save = computed(() => store.state.form.save);
    let currentIndex = computed(() => {
      return store.state.form.currentIndex;
    });
    let viewAndJson = ref<any>('view');
    let handleEditBtn = () => {
      moduleIsHidden.value = !moduleIsHidden.value;
    };
    let handleLine = (e: any) => {
      isTransition.value = false;
      const startX = e.clientX;
      const width = editRight.value.offsetWidth;
      const move = (e: any) => {
        const moveX = e.clientX;
        const x = startX - moveX;
        if (width + x > 200 && width + x <= 600) {
          editRight.value.style.width = width + x + "px";
        } else if (width + x > 600) {
          _.open("不能太大啦！");
        } else {
          if (_.clickCountLimit()) {
            _.open("不能再小啦！");
          }
        }
        console.log(x);
      };
      const up = () => {
        isTransition.value = true;
        document.documentElement.removeEventListener("mousemove", move);
        document.documentElement.removeEventListener("mouseup", up);
      };
      document.documentElement.addEventListener("mousemove", move);
      document.documentElement.addEventListener("mouseup", up);
    };
    let triggerViewJson = (type: string) => {
      viewAndJson.value = type
      vm.emit('changeViewAndJson', type)
    };

    // 预览或保存时验证所有表单是否输入正确
    let preview = computed(() => store.state.form.preview);
    let allFormList = computed(() => store.getters.getAllFormList);
    let checkNowFormValidate = function (content: string, title: string) {
      return new Promise((resolve, reject) => {
        ruleForm.value.validate((valid: any, errFields: any) => {
          if (!valid) {
            _.open(content, title);
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    };
    let checkFormValidate = async () => {
      let len = allFormList.value.length;
      for (let i = 0; i < len; ++i) {
        store.commit("setFormCurrentIndex", i);
        await nextTick();
        let valid = await checkNowFormValidate("请检查动态表单输入格式问题", "表单验证失败");
        if (!valid) {
          return false;
        }
      }
      return true;
    };
    const formUpdate = computed(() => store.state.form.formUpdate);

    let checkValidates = async (formSave?: boolean) => {
      let curControlIndex = store.state.form.currentIndex;
      if (preview.value || save.value || formUpdate.value) {
        let preview = await checkFormValidate();
        if (preview) {
          store.commit("setFormCurrentIndex", curControlIndex);
        }
        store.commit("setSave", preview);
        store.commit("setFormUpdate", false);
        if (preview) {
          let result: any[] = [];
          allFormList.value.forEach((item: any) => {
            result.push({
              data: item.data,
              ControlType: item.ControlType,
              id: _.generateMixed(8),
            });
          });
          localStorage.setItem("formResult", JSON.stringify(result));
          store.commit("handleDynamicForm");
        }
        if (!formSave) {
          store.state.form.previewShow = preview;
          store.state.form.preview = false;
        } else {
          _.open("保存成功");
        }
      }
    };
    // watch(preview, async () => {
    //   // 每次预览成功弹窗后，preview会变成false，如果不加该判断，又会执行一遍这个方法
    //   if (preview.value) {
    //     checkValidates();
    //   }
    // });
    vm.on('openPreview', async () => {
      checkValidates();
    })
    vm.on('setSave', async () => {
      checkValidates(true);
    })
    // watch(save, async () => {
    //   if (formUpdate.value) {
    //     checkValidates(true);
    //   }
    // });
    watch(
      () => curControl.value?.data,
      async () => {
        if (!formUpdate.value) {
          store.commit("setFormUpdate", true);
        }
        // 表单更新保存的状态都要变化
        // show.value = false;
        // await nextTick();
        // show.value = true;
      },
      { deep: true }
    );
    // 当保存和预览的时候要验证表单是否通过，所以通过vuex进行状态管理
    // onMounted(() => {
    //   store.commit("initRuleForm", ruleForm);
    // });
    return {
      moduleIsHidden,
      handleEditBtn,
      handleLine,
      isTransition,
      editRight,
      controlItems,
      curControl,
      ruleForm,
      show,
      currentIndex,
      viewAndJson,
      triggerViewJson,
    };
  },
});
</script>
<style lang="scss">
.editor_pages_right {
  width: 378px;
  height: 100%;
  position: fixed;
  right: 0;
  top: $editor_header_top;
  background: white;
  // padding: 30px 0;
  z-index: 1;
  &.editor_transition {
    transition: all 0.5s ease-in-out 0s;
  }
  .controlLine {
    position: absolute;
    left: 0;
    height: 100%;
    width: 5px;
    background: red;
    z-index: 2;
    &:hover {
      background: $blue;
      cursor: ew-resize;
    }
  }
  .viewAndJson {
    display: flex;
    justify-content: space-around;
    justify-items: center;
    margin: 0 auto;
    width: 80%;
    > div {
      width: 30%;
      border: 3px solid rgb(121, 118, 118);
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 5px;
      &.active {
        border-color: $blue;
        color: $blue;
      }
    }
  }
  .dynamic {
    overflow: auto;
    height: 100%;
    @include scrollbar();
  }

  &.editor_pages_right_visible {
    right: 0;
  }
  &.editor_pages_right_hidden {
    transform: translateX(100%);
    // right: -100%;
  }
  .editor_right_accept {
    width: 20px;
    height: 80px;
    background: #fff;
    box-shadow: -2px 0 4px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    right: 304px;
    top: 50%;
    margin-top: -32px;
    transform: translateY(-50%);
    cursor: pointer;
    position: absolute;
    left: -20px;
  }
}
</style>
