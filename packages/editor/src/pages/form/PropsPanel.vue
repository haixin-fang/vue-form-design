<template>
  <div class="editor_pages_right editor_pages_right_visible" ref="editRight">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" type="border-card" style="height: 100%">
      <el-tab-pane label="表单配置" name="form">
        <!-- <div class="viewAndJson">
          <el-button size="small" :plain="viewAndJson !== 'view'" @click="triggerViewJson('view')">视图</el-button>
          <el-button size="small" :plain="viewAndJson !== 'json'" @click="triggerViewJson('json')">JSON</el-button>
        </div> -->
        <el-scrollbar class="dynamic">
          <el-form ref="ruleForm" :model="curControl.data || {}" :rules="curControl.rules" label-width="120px" :status-icon="true">
            <el-form-item v-for="(item, index) in controlItems" :key="index" :control="item.ControlType" :prop="item.data.fieldName">
              <component :drag="false" :is="item.ControlType" :data="curControl.data" :item="item" v-if="(show && item.ControlType === 'JsonEditor') || item.ControlType !== 'JsonEditor'"></component>
            </el-form-item>
          </el-form>
          <el-empty :image-size="200" v-if="!curControl.data" description="没有选中表单控件"></el-empty>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="JSON配置" name="json">
        <div class="json">
          <div ref="jsonCenter"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 交互 -->
    <div class="editor_container" @mousedown="handleMouseDown">
      <ControllEditSize />
    </div>
    <div class="editor_right_accept" @click="handleEditBtn">
      <i class="iconfont icon-jiantou_xiangyouliangci" :class="moduleIsHidden ? 'icon-jiantou_xiangyouliangci' : 'icon-jiantou_xiangzuoliangci'"></i>
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, watch, nextTick, getCurrentInstance, inject } from "vue";
  import ControllEditSize from "@/layouts/ControlEditSize.vue";
  import formStore from "@/store/form";
  import type { Controls } from "@/type";
  import type { TabsPaneContext } from "element-plus";
  import _ from "@/utils/_";
  export default defineComponent({
    components: {
      ControllEditSize,
    },
    setup() {
      const { proxy } = getCurrentInstance() as any;
      const { uiControl } = inject<Controls>("control") || {};
      // 该模块是否隐藏 默认显示
      const moduleIsHidden = ref(true);
      const show = ref(true);
      const ruleForm = ref();
      const editRight = ref();
      const activeName = ref("form");
      const jsonCenter = ref();
      let jsonEditor:any = null;
      const isTransition = ref(true); // 默认有补间动画
      const controlItems = computed(() => formStore.getControlItems());
      const curControl = computed(() => formStore.get("curControl"));
      const save = computed(() => formStore.get("save"));
      const currentIndex = computed(() => {
        return formStore.get("currentIndex");
      });
      const viewAndJson = ref<any>("view");
      const handleEditBtn = () => {
        moduleIsHidden.value = !moduleIsHidden.value;
        if (moduleIsHidden.value) {
          uiControl?.set("columnWidth", { right: undefined });
        } else {
          uiControl?.set("columnWidth", { right: 0 });
        }
      };
      const triggerViewJson = (type: string) => {
        viewAndJson.value = type;
        proxy.$EventBus.emit("changeViewAndJson", type);
      };

      // 鼠标落下
      const handleMouseDown = async () => {
        formStore.setFormCurrentIndex(-1);
      };

      // 预览或保存时验证所有表单是否输入正确
      const preview = computed(() => formStore.get("preview"));
      const allFormList = computed(() => formStore.getAllFormList());
      const checkNowFormValidate = function (content: string, title: string) {
        return new Promise((resolve) => {
          ruleForm.value.validate((valid: any) => {
            if (!valid) {
              _.open(content, title);
              resolve(false);
            } else {
              resolve(true);
            }
          });
        });
      };
      const checkFormValidate = async () => {
        const len = allFormList.value.length;
        for (let i = 0; i < len; ++i) {
          formStore.setFormCurrentIndex(i);
          await nextTick();
          const valid = await checkNowFormValidate("请检查动态表单输入格式问题", "表单验证失败");
          if (!valid) {
            return false;
          }
        }
        return true;
      };
      const formUpdate = computed(() => formStore.get("formUpdate"));
      const allmainList = computed(() => formStore.get("allFormList"));

      const checkValidates = async (formSave?: boolean) => {
        const curControlIndex = formStore.get("currentIndex");
        if (preview.value || save.value || formUpdate.value) {
          const preview = await checkFormValidate();
          if (preview) {
            formStore.setFormCurrentIndex(curControlIndex);
          }
          formStore.setSave(preview);
          formStore.setFormUpdate(false);
          if (preview) {
            const result: any[] = [];
            allFormList.value.forEach((item: any) => {
              result.push({
                data: item.data,
                ControlType: item.ControlType,
                id: _.generateMixed(8),
              });
            });
            localStorage.setItem("formResult", JSON.stringify(result));
            formStore.handleDynamicForm();
          }
          if (!formSave) {
            formStore.set("previewShow", preview);
            formStore.set("preview", false);
          } else {
            _.open("保存成功");
          }
        }
      };
      const initJsonData = (formlist: any) => {
        const jsonData: any = [];
        formlist.forEach((item: any) => {
          const obj = {
            ControlType: item.ControlType,
            nameCn: item.nameCn,
            data: item.data,
          };
          jsonData.push(obj);
        });
        return jsonData;
      };

      function initJsonCenter() {
        const jsonDom = jsonCenter.value;
        if (jsonEditor) {
          jsonEditor?.set(initJsonData(allmainList.value));
        } else {
          const options = {
            modes: ["text", "code", "view"],
            mode: "code",
            search: false,
          };
          jsonEditor = new window.JSONEditor(jsonDom, options);
          jsonEditor?.set(initJsonData(allmainList.value));
        }
      }
      watch(() => allmainList, () => {
        initJsonCenter();
      }, {
        deep: true
      });
      function handleClick(tab: TabsPaneContext) {
        if (tab.props.name == "json") {
          initJsonCenter();
        }
      }
      // watch(preview, async () => {
      //   // 每次预览成功弹窗后，preview会变成false，如果不加该判断，又会执行一遍这个方法
      //   if (preview.value) {
      //     checkValidates();
      //   }
      // });
      proxy.$EventBus.on("openPreview", async () => {
        checkValidates();
      });
      proxy.$EventBus.on("setSave", async () => {
        checkValidates(true);
      });
      // watch(save, async () => {
      //   if (formUpdate.value) {
      //     checkValidates(true);
      //   }
      // });
      watch(
        () => curControl.value?.data,
        async () => {
          if (!formUpdate.value) {
            // store.commit("setFormUpdate", true);
            formStore.setFormUpdate(true);
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
        jsonCenter,
        handleClick,
        activeName,
        handleMouseDown,
        moduleIsHidden,
        handleEditBtn,
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
    width: 100%;
    height: 100%;
    // position: fixed;
    // right: 0;
    background: white;
    // padding: 30px 0;
    z-index: 1;
    position: relative;
    .json{
      padding: 10px;
      height: 100%;
      >div{
        height: 90%;
      }
    }
    .el-tabs__content {
      padding: 0;
      height: 100%;
      > div {
        height: 100%;
      }
    }
    &.editor_transition {
      transition: all 0.5s ease-in-out 0s;
    }
    .editor_container {
      position: absolute;
      top: 100px;
      left: 0;
      transform: translateX(calc(-100% - 8px));
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
      justify-content: center;
      justify-items: center;
      margin: 5px auto;
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
      left: -28px;
    }
  }
</style>
