<template>
  <div class="nav_list">
    <div class="detailBtn">
      <el-tooltip class="box-item" effect="dark" content="保存" placement="top" v-if="btnIsShow('left', 'save')">
        <span class="iconfont icon-baocun" :class="clearIsDisable ? 'noactive' : ''" @click="handleFormSave()"></span>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="预览" placement="top" v-if="btnIsShow('left', 'preview')">
        <span class="iconfont icon-icon_yulan" :class="clearIsDisable ? 'noactive' : ''" @click="handleFormPre()"></span>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="全屏" placement="top" v-if="!fullscreen && btnIsShow('left', 'fullscreen')">
        <span class="iconfont icon-quanping" @click="handleFullScreen()"></span>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="非全屏" placement="top" v-if="fullscreen && btnIsShow('left', 'fullscreen')">
        <span class="iconfont icon-suoxiao1" @click="handleFullScreen()"></span>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="清空" placement="top" v-if="btnIsShow('left', 'delete')">
        <span class="iconfont icon-shanchu1" :class="clearIsDisable ? 'noactive' : ''" @click="handleClear()"> </span>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="组件结构树" placement="top" v-if="btnIsShow('left', 'tree')">
        <span class="iconfont icon-tree" @click="handleTree()"> </span>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="撤销" placement="top" v-if="btnIsShow('left', 'undo')">
        <span class="iconfont icon-24gl-undo3" :class="historyIndex == -1 ? 'noactive' : ''" @click="handleBack()"></span>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="重做" placement="top" v-if="btnIsShow('left', 'redo')">
        <span class="iconfont icon-24gl-redo3" :class="historyIndex == historyLen - 1 ? 'noactive' : ''" @click="handleForward()"></span>
      </el-tooltip>
      <!-- <el-button text @click="handleFormSave()" size="small" :disabled="clearIsDisable">保存</el-button>
      <el-button text @click="handleFormPre()" size="small" :disabled="clearIsDisable">预览</el-button>
      <el-button text @click="handleFullScreen()" size="small">全屏/非全屏</el-button>
      <el-button text @click="handleClear()" size="small" :disabled="clearIsDisable">清空</el-button>
      <el-button text @click="handleBack()" size="small" :disabled="historyIndex == -1">后退</el-button>
      <el-button text @click="handleForward()" size="small" :disabled="historyIndex == historyLen - 1">前进</el-button> -->
    </div>
    <div class="pageBtn">
      <div class="el-button-group" v-if="btnIsShow('right', 'viewport')">
        <el-button :type="pageType == 'PC' ? 'info' : ''" @click="updatePageType('PC')">PC</el-button>
        <el-button :type="pageType == 'Pad' ? 'info' : ''" @click="updatePageType('Pad')">Pad</el-button>
        <el-button :type="pageType == 'H5' ? 'info' : ''" @click="updatePageType('H5')">H5</el-button>
      </div>
      <el-button type="text" plain @click="ImportJson" v-if="btnIsShow('right', 'json-import')">导入json</el-button>
      <el-button type="text" plain @click="exportJson" v-if="btnIsShow('right', 'json-export')">导出json</el-button>
    </div>
    <el-drawer ref="drawerRef" v-model="dialog" title="表单结构树" :before-close="handleClose" direction="ltr" custom-class="demo-drawer">
      <div class="demo-drawer__content">
        <el-input v-model="filterText" placeholder="Filter keyword" />
        <el-tree :data="tree" :props="propsData" ref="treeRef" default-expand-all :filter-node-method="filterNode" @node-click="myClick" style="margin-top: 20px" />
      </div>
    </el-drawer>
    <custom-dialog ref="jsonDialog" :width="800" dialogclass="codeDialog">
      <div class="custom_code">
        <codemirror v-model="code" placeholder="json导入" mode="text/json" :style="{ height: '400px' }" :extensions="extensions" />
        <el-upload accept="application/json" class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :on-change="handleChange">
          <el-button type="primary">导入json文件</el-button>
        </el-upload>
      </div>

      <el-footer class="my-Footer" style="text-align: center">
        <el-button type="primary" @click="saveJson">确定</el-button>
        <el-button @click="closeCodeDialog">关闭</el-button>
      </el-footer>
    </custom-dialog>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, getCurrentInstance, onMounted, onUnmounted, inject, ref, toRaw, watch, PropType } from "vue";
  import type { Controls, MenuBarData, MenuItem, AllFormItem, BaseComponentItem } from "@/type";
  import { clearCanvas } from "@/utils/formKeycon";
  import { json } from "@codemirror/lang-json";
  export default defineComponent({
    props: {
      /** 顶部工具栏配置 */
      menu: {
        type: Object as PropType<MenuBarData>,
        default: () => ({ left: [], right: [], column: true }),
      },
    },
    setup(props) {
      const { proxy } = getCurrentInstance() as any;
      const { hisContrl, uiControl, formStore } = inject<Controls>("control") || {};
      const lastTime = computed(() => formStore?.get("saveTimetemp"));
      const clearIsDisable = computed(() => formStore?.get("allFormList")?.length == 0);
      const historyIndex = computed(() => hisContrl?.get("index"));
      const historyLen = computed(() => hisContrl?.get<Array<any>>("historyList").length || 0);
      const fullscreen = computed(() => uiControl?.get("isFullscreen"));
      const allFormList = computed(() => formStore?.get("allFormList"));
      const pageType = computed(() => uiControl?.get("pageType"));
      const extensions = [json()];
      const jsonDialog = ref();
      const tree = ref();
      const treeRef = ref();
      const filterText = ref();
      const code = ref();
      const propsData = ref({
        value: "id",
        label: "label",
        children: "children",
      });
      interface Tree {
        id: string;
        label: string;
        children?: Tree[];
      }
      const initTree = () => {
        if (allFormList.value && allFormList.value.length > 0) {
          const treeList = toRaw(allFormList.value).map((item: any): Tree => {
            return toTree(item);
          });
          return treeList;
        } else {
          return [];
        }
      };
      function toTree(item: any): Tree {
        if (!item.layout) {
          return {
            id: item.id,
            label: item.ControlType + "_" + item.data.fieldName,
          };
        } else {
          let children;
          if (item.ControlType == "Grid") {
            children = item.data.columns.map((colItem: { list: AllFormItem[] }) => {
              const children = colItem.list.map((listItem: AllFormItem) => {
                return toTree(listItem);
              });
              return {
                id: "",
                label: "GridChild",
                children,
              };
            });
          } else if (item.ControlType == "TableLayout") {
            children = item.data.trs.map((trItem: any) => {
              const children = trItem.tds.map((tdItem: any) => {
                const children = tdItem.list.map((listItem: AllFormItem) => {
                  return toTree(listItem);
                });
                return {
                  id: "",
                  label: "table_Column",
                  children,
                };
              });
              return {
                id: "",
                label: "table_Row",
                children,
              };
            });
          } else if (item.ControlType == "Collapse" || item.ControlType == "Tabs") {
            children = item.data.items.map((colItem: any) => {
              const children = colItem.list.map((listItem: AllFormItem) => {
                return toTree(listItem);
              });
              return {
                id: "",
                label: item.ControlType + "_child",
                children,
              };
            });
          }
          return {
            id: item.id,
            label: item.ControlType + "_" + item.data.fieldName,
            children,
          };
        }
      }
      const dialog = ref(false);
      let timer: unknown = null;
      const filterNode = (value: string, data: Tree) => {
        if (!value) return true;
        return data.label.includes(value);
      };
      const handleFormSave = (type?: string) => {
        proxy.$EventBus.emit("setSave", type);
      };
      const handleFormPre = () => {
        formStore?.set('preview', true)
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

      const handleImportJson = () => {
        try {
          const result = JSON.parse(code.value);
          const formList = result.map((item: BaseComponentItem) => {
            return window.VueContext.$Flex.jsonToForm(item);
          });
          code.value = JSON.stringify(formList, null, 4);
        } catch (e) {
          code.value = JSON.stringify({});
          console.error(e);
          window.VApp.$message.error("导入失败，数据格式不对");
        }
      };

      watch(filterText, (val) => {
        treeRef.value?.filter(val);
      });

      // 每隔一分钟判断是否更改了内容,如果有更改则自动保存
      onMounted(() => {
        setTimeSave();
      });
      onUnmounted(() => {
        clearInterval(timer as any);
      });

      return {
        extensions,
        code,
        handleFormSave,
        handleFormPre,
        jsonDialog,
        pageType,
        historyIndex,
        historyLen,
        fullscreen,
        clearIsDisable,
        filterText,
        propsData,
        dialog,
        tree,
        treeRef,
        filterNode,
        btnIsShow(type: "left" | "right", btn: MenuItem) {
          if (props.menu[type].length == 0) {
            return true;
          }
          return props.menu[type].includes(btn);
        },
        updatePageType(type: string) {
          uiControl?.set("pageType", type);
        },
        handleClear: () => {
          clearCanvas();
          formStore?.setFormCurrentId("");
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
        handleTree() {
          dialog.value = true;
          tree.value = initTree();
        },
        handleClose() {
          dialog.value = false;
        },
        myClick(currentNode: any) {
          formStore?.setFormCurrentId(currentNode.id);
        },
        ImportJson() {
          jsonDialog.value.show();
          jsonDialog.value.init("json导入", "icon-biaodan");
        },
        handleChange(file: any) {
          const reader = new FileReader();
          reader.readAsText(file.raw);
          reader.onload = (e: any) => {
            code.value = e.currentTarget.result;
            handleImportJson();
          };
        },
        closeCodeDialog() {
          jsonDialog.value.close();
        },
        saveJson() {
          formStore?.updateAllFormList(JSON.parse(code.value));
          jsonDialog.value.close();
        },
        exportJson(fileName = `demo.json`) {
          let content = "data:application/json;charset=utf-8,";
          try {
            const result = JSON.stringify(window.VueContext.$Flex.initFormToJson(allFormList.value));
            content += result;
            const encodedUri = encodeURI(content);
            const actions = document.createElement("a");
            actions.setAttribute("href", encodedUri);
            actions.setAttribute("download", fileName);
            actions.click();
            window.VApp.$message.success("导出成功");
          } catch (e) {
            window.VApp.$message.error("导出失败,数据格式不对");
          }
        },
      };
    },
  });
</script>
