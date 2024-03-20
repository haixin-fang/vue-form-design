<template>
  <div class="editor_pages_right editor_pages_right_visible" ref="editRight">
    <!-- 交互 -->
    <div class="editor_container" @mousedown="handleMouseDown" v-if="column">
      <ControllEditSize />
    </div>
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
      style="height: 100%"
    >
      <el-tab-pane label="组件配置" name="form" v-if="panel.includes('form')">
        <el-scrollbar class="dynamic">
          <el-form
            ref="ruleForm"
            :model="curControl && (curControl.data || {})"
            :rules="curControl && curControl.rules"
            label-width="120px"
            :status-icon="true"
          >
            <el-form-item
              v-for="item in controlItems"
              :key="item.id"
              :control="item.ControlType"
              :prop="item.data.fieldName"
            >
              <component
                :drag="false"
                :is="item.ControlType"
                :data="curControl.data"
                :item="item"
                :size="globalDatas.size"
                :labelWidth="globalDatas.labelWidth"
                :labelalign="globalDatas.labelalign"
                v-if="
                  (show && item.ControlType === 'JsonEditor') ||
                  item.ControlType !== 'JsonEditor'
                "
              ></component>
            </el-form-item>
          </el-form>
          <el-empty
            :image-size="200"
            v-if="!curControl || !curControl.data"
            description="没有选中表单控件"
          ></el-empty>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="JSON配置" name="json" v-if="panel.includes('json')">
        <div class="json" v-if="activeName == 'json'">
          <!-- <div ref="jsonCenter"></div> -->
          <jsonEnter ref="jsonCenter" />
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="表单配置"
        name="global"
        v-if="panel.includes('global')"
      >
        <el-scrollbar class="form_tab3" v-if="activeName == 'global'">
          <globalFormComponent />
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>

    <div class="editor_right_accept" @click="handleEditBtn">
      <i
        class="iconfont icon-jiantou_xiangyouliangci"
        :class="
          moduleIsHidden
            ? 'icon-jiantou_xiangyouliangci'
            : 'icon-jiantou_xiangzuoliangci'
        "
      ></i>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  watch,
  nextTick,
  getCurrentInstance,
  inject,
  toRaw,
  ComputedRef,
  defineAsyncComponent,
} from "vue";
import ControllEditSize from "@/layouts/ControlEditSize.vue";
import { globalFormList } from "@/common/formJson";
import type {
  Controls,
  AllFormItem,
  BaseComponentItem,
  BaseFormConfig,
} from "@/type";
import type { TabPaneInstance } from "element-plus";
import Loading from "@/common/Loading.vue";

export default defineComponent({
  props: {
    column: {
      type: Boolean,
      default: true,
    },
    panel: {
      type: Array,
      default: () => ["form", "json", "global"],
    },
  },
  components: {
    ControllEditSize,
    jsonEnter: defineAsyncComponent({
      loader: () => import("./jsonEditor.vue"),
      loadingComponent: Loading,
    }),
    globalFormComponent: defineAsyncComponent({
      loader: () => import("./globalFormList.vue"),
      loadingComponent: Loading,
    }),
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance() as any;
    const { uiControl, hisContrl, formStore } =
      inject<Controls>("control") || {};
    // 该模块是否隐藏 默认显示
    const moduleIsHidden = ref(true);
    const show = ref(true);
    const ruleForm = ref();
    const editRight = ref();
    const activeName = ref("form");
    const jsonCenter = ref();
    let jsonEditor: any = null;
    const isTransition = ref(true); // 默认有补间动画
    const controlItems = computed(() => formStore?.getControlItems());
    const curControl = computed(() => formStore?.get("curControl"));
    const newCurControl = computed(() =>
      proxy.$Flex.deepClone(formStore?.get("curControl"))
    );
    const historyFlag = computed(() => hisContrl?.get("historyFlag"));
    const save = computed(() => formStore?.get("save"));
    const currentIndex = computed(() => formStore?.get("currentIndex"));
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
    const globalData = formStore?.getDynamicForm(globalFormList);
    formStore?.set("globalDatas", globalData);
    formStore?.set("globalFormList", globalFormList);
    const globalFormLists = computed(() => formStore?.get("globalFormList"));
    const globalDatas = computed(() => formStore?.get("globalDatas"));

    // 鼠标落下
    const handleMouseDown = async () => {
      formStore?.setFormCurrentId("");
      formStore?.setFormCurrentIndex(-1);
    };

    // 预览或保存时验证所有表单是否输入正确
    const preview = computed(() => formStore?.get("preview"));
    const allFormList: ComputedRef<AllFormItem[] | undefined> = computed(() =>
      formStore?.getAllFormList()
    );
    const checkNowFormValidate = function (content: string) {
      return new Promise((resolve) => {
        ruleForm.value.validate((valid: boolean) => {
          if (!valid) {
            ElNotification({
              title: "Error",
              message: content,
              type: "error",
            });
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    };

    function checkLayoutForm(curControl: AllFormItem): boolean {
      if (curControl.ControlType == "TableLayout") {
        const trs = curControl.data.trs || [];
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
        const columns = curControl.data.columns || [];
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

    const checkFormValidate = async (list: AllFormItem[] | undefined) => {
      if (!list) return;
      const len = list.length;
      for (let i = 0; i < len; ++i) {
        let validate = true;
        const curControl: any = list[i];
        curControl.controlItems?.forEach((item: BaseFormConfig) => {
          if (item.data.required) {
            validate = !!curControl.data[item.data.fieldName];
          }
        });
        if (validate && curControl.layout) {
          validate = checkLayoutForm(curControl);
        }
        if (!validate) {
          formStore?.setFormCurrentId(curControl.id);
          activeName.value = "form";
          await nextTick();
          const valid = await checkNowFormValidate(
            "请检查动态表单输入格式问题"
          );
          if (!valid) {
            return false;
          }
        }
      }
      return true;
    };
    const formUpdate = computed(() => formStore?.get("formUpdate"));
    const newAllmainlist = computed(() =>
      proxy.$Flex.deepClone(formStore?.get("allFormList"))
    );

    const checkValidates = async (formSave = false, type?: string) => {
      const curControlIndex = formStore?.get("currentIndex");
      // 预览模式下不自动保存
      if (type && preview.value) return;
      if (preview.value || save.value || formUpdate.value) {
        const ispreview = await checkFormValidate(allFormList.value);
        if (ispreview) {
          formStore?.setFormCurrentIndex(curControlIndex);
        }
        formStore?.setSave(ispreview as boolean);
        formStore?.setFormUpdate(false);
        if (ispreview) {
          const result: BaseComponentItem[] = initFormToJson(allFormList.value);
          formStore?.set("AllFormResult", result);
          formStore?.handleDynamicForm();
          emit("save");
        }
        if (!formSave) {
          formStore?.set("previewShow", ispreview);
          formStore?.set("preview", false);
        } else if (ispreview) {
          ElNotification({
            title: "Success",
            message: type ? "已自动保存" : "保存成功",
            type: "success",
          });
        }
      }
    };
    const initFormToJson = (formlist: AllFormItem[] | undefined) => {
      return window.VueContext.$Flex.initFormToJson(toRaw(formlist));
    };

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

    function initJsonToForm(list: BaseComponentItem[]) {
      return toRaw(list).map((item: BaseComponentItem) => {
        return proxy.$Flex.jsonToForm(item);
      });
    }

    function handleClick(tab: TabPaneInstance) {
      if (tab.props.name == "json" && jsonCenter.value) {
        jsonEditor = jsonCenter.value.initJsonCenter();
      } else if (tab.props.name == "form" && jsonEditor) {
        try {
          const list = proxy.$Flex.tryParseJson(jsonEditor.getText());
          let newAllList: AllFormItem[] = [];
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
        if (activeName.value == "json" && jsonCenter.value) {
          jsonCenter.value.initJsonCenter();
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

    watch(
      () => curControl.value?.data,
      async () => {
        if (!formUpdate.value) {
          // store.commit("setFormUpdate", true);
          formStore?.setFormUpdate(true);
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
