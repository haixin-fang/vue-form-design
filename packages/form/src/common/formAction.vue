<template>
  <div class="starfish-formitem" :class="{ formCover: drag, 'starfish-vertical': labelalign != 'top', [item.data.csslist?.join(' ')]: !!item.data.csslist }">
    <div class="label" :class="'label_' + labelalign" :style="{ width: labelWidth + 'px' }" v-if="!isForm">
      <label>{{ item.data.label }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="top">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control" :style="{ marginLeft: labelalign != 'top' ? labelWidth + 'px' : '' }">
      <el-button style="width: 100%" @click="onAction" v-if="!isForm"> 设置 </el-button>
      <CustomDialog ref="actionRef">
        <div class="common-layout">
          <el-container style="height: 100%; border: 1px solid rgb(238, 238, 238)">
            <el-container>
              <el-aside width="300px" class="event-script-aside">
                <el-container class="is-vertical">
                  <header class="action-header">
                    <el-button type="text" :size="size" @click="addAction"> +添加动作</el-button>
                  </header>
                  <el-main>
                    <el-scrollbar>
                      <div class="action-list">
                        <div class="action" v-for="(item, index) in action" :key="index" @click="handleAction(item)" :class="currentAction && item.type == currentAction.type ? 'selectAction' : ''">
                          <span class="event-script-menu-i">Function</span>
                          <div class="event-script-menu-label">{{ item.funcName }}</div>
                          <div class="event-script-menu-action" v-if="!item.disabled">
                            <i title="复制" class="iconfont icon-fuzhi" @click.stop="copyAction(item)"></i>
                            <i title="删除" class="iconfont icon-shanchu1" @click.stop="deleteAction(item)"></i>
                          </div>
                        </div>
                      </div>
                    </el-scrollbar>
                  </el-main>
                </el-container>
              </el-aside>
              <el-main class="event-script-main">
                <el-container class="is-vertical">
                  <header class="action-header event-script-main-header">
                    <el-button type="primary" @click="onConfirm">确定</el-button>
                    <el-button type="primary" @click="onSave">保存</el-button>
                    <el-button @click="onCancel">取消</el-button>
                  </header>
                  <el-main v-if="currentAction" class="func_main">
                    <el-scrollbar>
                      <el-form :model="currentAction" :rules="rules">
                        <el-form-item label="Function Name" prop="funcName">
                          <el-input v-model="currentAction.funcName" :disabled="currentAction.disabled" />
                        </el-form-item>
                        <el-form-item prop="funcStr">
                          <div class="header">function(){</div>
                          <codemirror v-model="currentAction.funcStr" placeholder="" mode="text/javascript" :style="{ height: '320px' }" :extensions="extensions" :autofocus="true" :indent-with-tab="true" :tab-size="2" />
                          <div class="footer">}</div>
                        </el-form-item>
                      </el-form>
                    </el-scrollbar>
                  </el-main>
                </el-container>
              </el-main>
            </el-container>
          </el-container>
        </div>
      </CustomDialog>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted, inject, getCurrentInstance } from "vue";
  import { javascript } from "@codemirror/lang-javascript";
  export default defineComponent({
    ControlType: "FormAction",
    isHide: true,
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
      data: {
        type: Object,
        default: () => ({}),
      },
      drag: {
        type: Boolean,
        default: false,
      },
      labelalign: {
        type: String,
        default: "top",
      },
      labelWidth: {
        type: Number,
      },
      size: {
        type: String,
      },
      isForm: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const { actionContrl: actionStore } = inject<any>("control") || {};
      const actionRef = ref();
      const { proxy } = getCurrentInstance() as any;
      const action = ref(window.VApp.$Flex.deepClone(actionStore?.get("action")));
      const currentAction = ref(window.VApp.$Flex.deepClone(actionStore?.get("currentAction")));
      const extensions = [javascript()];
      let actionType = "";
      const rules = reactive({
        funcName: [
          {
            required: true,
            message: "函数名称必填",
            trigger: "change",
          },
        ],
      });
      console.log(props);
      onMounted(() => {
        // props.data[props.item.data.fieldName] = action.value;
      });
      return {
        rules,
        actionRef,
        action,
        currentAction,
        extensions,
        onAction(type?: string) {
          action.value = window.VApp.$Flex.deepClone(actionStore?.get("action"));
          actionRef.value.init("动作设置", "icon-bianji");
          actionRef.value.show();
          if (type) {
            actionType = type;
            const item = action.value.find((item: any) => {
              if (item.type == type) {
                return item;
              }
            });
            if (item) {
              currentAction.value = item;
            } else {
              proxy.addAction(type);
            }
          }
        },
        handleAction(item: any) {
          //   actionStore?.set("currentAction", action);
          currentAction.value = item;
        },
        onSave() {
          actionStore?.set("action", action.value);
          // props.data[props.item.data.fieldName] = action.value;
          actionRef.value.close();
        },
        onCancel() {
          actionRef.value.close();
        },
        copyAction(item: any) {
          debugger;
          const newAction = window.VApp.$Flex.deepClone(item);
          newAction.funcName = newAction.funcName + "_copy";
          newAction.type = window.VApp.$Flex.generateMixed(5);
          action.value.push(newAction);
          currentAction.value = newAction;
        },
        deleteAction(item: any) {
          action.value = action.value.filter((actionItem: any) => {
            if (actionItem.type !== item.type) {
              return actionItem;
            }
          });
          if (currentAction.value && item.type == currentAction.value.type) {
            currentAction.value = null;
          }
        },
        addAction(type?: string) {
          const addAction = {
            funcName: (type || "func") + "_" + window.VApp.$Flex.generateMixed(5),
            type: window.VApp.$Flex.generateMixed(5),
            funcStr: "",
            methods: type,
          };
          action.value.push(addAction);
          if (type) {
            currentAction.value = addAction;
          }
        },
        onConfirm() {
          if(!props.data[props.item.data.fieldName]){
            props.data[props.item.data.fieldName] = {}
          }
          props.data[props.item.data.fieldName][actionType] = JSON.stringify(currentAction.value);
          proxy.onSave();
        },
      };
    },
  });
</script>
