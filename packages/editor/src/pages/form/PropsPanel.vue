<template>
  <div class="editor_pages_right editor_pages_right_visible" ref="editRight">
    <!-- 交互 -->
    <div class="editor_container" @mousedown="handleMouseDown">
      <ControllEditSize />
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" style="height: 100%">
      <el-tab-pane label="组件配置" name="form">
        <el-scrollbar class="dynamic">
          <el-form ref="ruleForm" :model="curControl && (curControl.data || {})" :rules="curControl && curControl.rules" label-width="120px" :status-icon="true">
            <el-form-item v-for="item in controlItems" :key="item.id" :control="item.ControlType" :prop="item.data.fieldName">
              <component :drag="false" :is="item.ControlType" :data="curControl.data" :item="item" v-if="(show && item.ControlType === 'JsonEditor') || item.ControlType !== 'JsonEditor'"></component>
            </el-form-item>
          </el-form>
          <el-empty :image-size="200" v-if="!curControl || !curControl.data" description="没有选中表单控件"></el-empty>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="JSON配置" name="json">
        <div class="json">
          <div ref="jsonCenter"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="表单配置" name="global">
        <!-- 该模块展示先不做,控制整个动态表单样式导致样式崩(如json,富文本编辑器与其他表单高度相差太大),意义不大 -->
        <el-scrollbar class="form_tab3">
          <div v-for="(item, index) in globalFormLists" :key="index" class="form_tab3_list">
            <component :is="item.ControlType" :item="item" :data="globalDatas"></component>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>

    <div class="editor_right_accept" @click="handleEditBtn">
      <i class="iconfont icon-jiantou_xiangyouliangci" :class="moduleIsHidden ? 'icon-jiantou_xiangyouliangci' : 'icon-jiantou_xiangzuoliangci'"></i>
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, watch, nextTick, getCurrentInstance, inject, toRaw } from "vue";
  import ControllEditSize from "@/layouts/ControlEditSize.vue";
  import { globalFormList } from "@/common/formJson";
  // import formStore from "@/store/form";
  import type { Controls } from "@/type";
  // 可能是element-plus版本太低,后期升级
  // import type { TabsPaneContext } from "element-plus";
  export default defineComponent({
    components: {
      ControllEditSize,
    },
    setup() {
      const { proxy } = getCurrentInstance() as any;
      const { uiControl, hisContrl, formStore } = inject<Controls>("control") || {};
      // 该模块是否隐藏 默认显示
      const moduleIsHidden = ref(true);
      const show = ref(true);
      const ruleForm = ref();
      const editRight = ref();
      const activeName = ref("form");
      const jsonCenter = ref();
      let jsonEditor: any = null;
      const isTransition = ref(true); // 默认有补间动画
      const controlItems = computed(() => formStore.getControlItems());
      const curControl = computed(() => formStore.get("curControl"));
      const newCurControl = computed(() => proxy.$Flex.deepClone(formStore.get("curControl")));
      const historyFlag = computed(() => hisContrl?.get("historyFlag"));
      const save = computed(() => formStore.get("save"));
      const currentIndex = computed(() => formStore.get("currentIndex"));
      const handleEditBtn = () => {
        moduleIsHidden.value = !moduleIsHidden.value;
        if (moduleIsHidden.value) {
          uiControl?.set("columnWidth", { right: undefined });
        } else {
          uiControl?.set("columnWidth", { right: 0 });
        }
      };

      /**
       * 表单配置
       */
      const globalFormLists = ref(globalFormList);
      const globalDatas = computed(() => formStore?.get("globalDatas"));

      // 鼠标落下
      const handleMouseDown = async () => {
        formStore.setFormCurrentId("");
        formStore.setFormCurrentIndex(-1);
      };

      // 预览或保存时验证所有表单是否输入正确
      const preview = computed(() => formStore.get("preview"));
      const allFormList = computed(() => formStore.getAllFormList());
      const checkNowFormValidate = function (content: string, title: string) {
        return new Promise((resolve) => {
          ruleForm.value.validate((valid: any) => {
            if (!valid) {
              proxy.$Flex.open(content, title, "error");
              resolve(false);
            } else {
              resolve(true);
            }
          });
        });
      };

      function checkLayoutForm(curControl: any): boolean {
        if (curControl.ControlType == "TableLayout") {
          const trs = curControl.data.trs;
          for (let i = 0; i < trs.length; i++) {
            const tds = trs[i].tds;
            for (let j = 0; j < tds.length; j++) {
              const state = checkFormValidate(tds[j].list);
              if (!state) {
                return state;
              }
            }
          }
        } else if (curControl.ControlType == "Grid") {
          const columns = curControl.data.columns;
          for (let i = 0; i < columns.length; i++) {
            const list = columns[i].list;
            const state = checkFormValidate(list);
            if (!state) {
              return state;
            }
          }
        }
        return true;
      }

      const checkFormValidate = async (list: any) => {
        const len = list.length;
        for (let i = 0; i < len; ++i) {
          let validate = true;
          const curControl = list[i];
          curControl.controlItems.forEach((item: any) => {
            if (item.data.required) {
              validate = !!curControl.data[item.data.fieldName];
            }
          });
          if (validate && curControl.layout) {
            validate = checkLayoutForm(curControl);
          }
          if (!validate) {
            formStore.setFormCurrentId(curControl.id);
            activeName.value = "form";
            await nextTick();
            const valid = await checkNowFormValidate("请检查动态表单输入格式问题", "表单验证失败");
            if (!valid) {
              return false;
            }
          }
        }
        return true;
      };
      const formUpdate = computed(() => formStore?.get("formUpdate"));
      const allmainList = computed(() => formStore?.get("allFormList"));
      const newAllmainlist = computed(() => proxy.$Flex.deepClone(formStore?.get("allFormList")));

      const checkValidates = async (formSave = false, type?: string) => {
        const curControlIndex = formStore.get("currentIndex");
        if (preview.value || save.value || formUpdate.value) {
          const preview = await checkFormValidate(allFormList.value);
          if (preview) {
            formStore.setFormCurrentIndex(curControlIndex);
          }
          formStore.setSave(preview);
          formStore.setFormUpdate(false);
          if (preview) {
            const result: any[] = initFormToJson(allFormList.value);
            // toRaw(allFormList.value).forEach((item: any) => {
            //   result.push({
            //     data: item.data,
            //     ControlType: item.ControlType,
            //     id: proxy.$Flex.generateMixed(),
            //   });
            // });
            formStore.set("AllFormResult", result);
            formStore.handleDynamicForm();
          }
          if (!formSave) {
            formStore.set("previewShow", preview);
            formStore.set("preview", false);
          } else if (preview) {
            proxy.$Flex.open(type ? "已自动保存" : "保存成功");
          }
        }
      };
      const initFormToJson = (formlist: any) => {
        return window.VueContext.$Flex.initFormToJson(toRaw(formlist))
      };

      function initJsonCenter() {
        const jsonDom = jsonCenter.value;
        if (jsonEditor) {
          jsonEditor?.set(initFormToJson(allmainList.value));
        } else {
          const options = {
            modes: ["text", "code", "view"],
            mode: "code",
            search: false,
          };
          jsonEditor = new window.JSONEditor(jsonDom, options);
          jsonEditor?.set(initFormToJson(allmainList.value));
        }
      }
      function complareControl(newControl: any, oldContrl: any) {
        if (newControl !== oldContrl) return false;
        let same = true;
        for (const key in newControl) {
          if (newControl[key] !== oldContrl[key]) {
            same = false;
          }
        }
        return same;
      }

      function initJsonToForm(list: any) {
        return toRaw(list).map((item: any) => {
          return proxy.$Flex.jsonToForm(item);
        });
      }

      function handleClick(tab: any) {
        if (tab.props.name == "json") {
          initJsonCenter();
        } else if (tab.props.name == "form" && jsonEditor) {
          try {
            const list = proxy.$Flex.tryParseJson(jsonEditor.getText());
            let newAllList: any = null;
            newAllList = initJsonToForm(list);
            formStore?.updateAllFormList(newAllList);
          } catch (e) {
            console.error(e);
          }
        }
      }

      proxy.$EventBus.on("openPreview", async () => {
        checkValidates();
      });
      proxy.$EventBus.on("setSave", async (type?: string) => {
        checkValidates(true, type);
      });
      watch(
        () => [newAllmainlist.value, newCurControl.value?.data],
        ([, b], [, d]) => {
          if (activeName.value == "json") {
            initJsonCenter();
          }
          if (historyFlag.value) {
            hisContrl?.set("historyFlag", false);
            return;
          }
          if (!complareControl(b, d)) {
            formStore?.setHistory();
          }
        },
        {
          deep: true,
        }
      );

      /**
       * 可以不监听,后期直接通过传如动态表单进行列表改变
       */
      watch(
        () => globalDatas,
        (a) => {
          console.log(a);
        },
        {
          deep: true,
        }
      );
      watch(
        () => curControl.value?.data,
        async () => {
          if (!formUpdate.value) {
            // store.commit("setFormUpdate", true);
            formStore.setFormUpdate(true);
          }
        },
        { deep: true }
      );

      return {
        globalFormLists,
        globalDatas,
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
    display: flex;
    .demo-tabs {
      flex: 1;
    }
    .form_tab3 {
      padding: 5px;
      .form_tab3_list {
        margin-bottom: 15px;
      }
    }
    .json {
      padding: 10px;
      height: 100%;
      > div {
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
      // position: absolute;
      // left: 0;
      // top: 0;
      padding-top: 30px;
      height: 100%;
      border-right: 1px solid $resizer_background_color;
      margin-right: 5px;
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
