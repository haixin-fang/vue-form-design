<template>
  <div class="editor_pages_right editor_pages_right_visible" ref="editRight">
    <!-- 交互 -->
    <div class="editor_container" @mousedown="handleMouseDown" v-if="column">
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
        <!-- 该模块暂时先不做,控制整个动态表单样式导致样式崩(如json,富文本编辑器与其他表单高度相差太大),意义不大 -->
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
  import { computed, defineComponent, ref, watch, nextTick, getCurrentInstance, inject, toRaw ,ComputedRef} from "vue";
  import ControllEditSize from "@/layouts/ControlEditSize.vue";
  import { globalFormList } from "@/common/formJson";
  import type { Controls, AllFormItem,BaseComponentItem, BaseFormConfig } from "@/type";
  import type { TabPaneInstance } from "element-plus";
  export default defineComponent({
    props: {
      column: {
        type: Boolean,
        default: true,
      },
    },
    components: {
      ControllEditSize,
    },
    setup(props, { emit }) {
      const { proxy } = getCurrentInstance() as any;
      const { uiControl, hisContrl, formStore } = inject<Controls>("control") || {};
      // 该模块是否隐藏 默认显示
      const moduleIsHidden = ref(true);
      const show = ref(true);
      const ruleForm = ref();
      const editRight = ref();
      const activeName = ref("form");
      const jsonCenter = ref();
      let jsonEditor:any = null;
      const isTransition = ref(true); // 默认有补间动画
      const controlItems = computed(() => formStore?.getControlItems());
      const curControl = computed(() => formStore?.get("curControl"));
      const newCurControl = computed(() => proxy.$Flex.deepClone(formStore?.get("curControl")));
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
      const globalFormLists = ref(globalFormList);
      const globalDatas = computed(() => formStore?.get("globalDatas"));

      // 鼠标落下
      const handleMouseDown = async () => {
        formStore?.setFormCurrentId("");
        formStore?.setFormCurrentIndex(-1);
      };

      // 预览或保存时验证所有表单是否输入正确
      const preview = computed(() => formStore?.get("preview"));
      const allFormList:ComputedRef<AllFormItem[] | undefined> = computed(() => formStore?.getAllFormList());
      const checkNowFormValidate = function (content: string) {
        return new Promise((resolve) => {
          ruleForm.value.validate((valid: boolean) => {
            if (!valid) {
              window.VApp.$notify.error({
                title: content
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
        if(!list)return;
        const len = list.length;
        for (let i = 0; i < len; ++i) {
          let validate = true;
          const curControl = list[i];
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
            const valid = await checkNowFormValidate("请检查动态表单输入格式问题");
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
        const curControlIndex = formStore?.get("currentIndex");
        if (preview.value || save.value || formUpdate.value) {
          const preview = await checkFormValidate(allFormList.value);
          if (preview) {
            formStore?.setFormCurrentIndex(curControlIndex);
          }
          formStore?.setSave(preview as boolean);
          formStore?.setFormUpdate(false);
          if (preview) {
            const result: BaseComponentItem[] = initFormToJson(allFormList.value);
            // toRaw(allFormList.value).forEach((item: any) => {
            //   result.push({
            //     data: item.data,
            //     ControlType: item.ControlType,
            //     id: proxy.$Flex.generateMixed(),
            //   });
            // });
            formStore?.set("AllFormResult", result);
            formStore?.handleDynamicForm();
            emit("save");
          }
          if (!formSave) {
            formStore?.set("previewShow", preview);
            formStore?.set("preview", false);
          } else if (preview) {
            window.VApp.$notify.success({
              title: type ? "已自动保存" : "保存成功"
            });
          }
        }
      };
      const initFormToJson = (formlist: AllFormItem[] | undefined) => {
        return window.VueContext.$Flex.initFormToJson(toRaw(formlist));
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
      function complareControl(newControl: AllFormItem, oldContrl: AllFormItem) {
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
        if (tab.props.name == "json") {
          initJsonCenter();
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
