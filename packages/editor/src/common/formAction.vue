<template>
  <div class="starfish-formitem" :class="{ formCover: drag, 'starfish-vertical': labelalign != 'top', [item.data.csslist?.join(' ')]: !!item.data.csslist }">
    <div class="label" :class="'label_' + labelalign" :style="{ width: labelWidth + 'px' }">
      <label>{{ item.data.label }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="top">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control">
      <el-button style="width: 100%" @click="onAction"> 设置 </el-button>
      <CustomDialog ref="actionRef">
        <div class="common-layout">
          <el-container style="height: 100%; border: 1px solid rgb(238, 238, 238)">
            <el-container>
              <el-aside width="300px" class="event-script-aside">
                <el-container class="is-vertical">
                  <header class="action-header">
                    <el-button type="text"> +添加动作</el-button>
                  </header>
                  <el-main>
                    <el-scrollbar>
                      <div class="action-list">
                        <div class="action" v-for="(item, index) in action" :key="index" @click="handleAction(item)" :class="item.funcName == currentAction.funcName?'selectAction':''">
                          <span class="event-script-menu-i">Function</span>
                          <div class="event-script-menu-label">{{ item.funcName }}</div>
                          <div class="event-script-menu-action"><i title="复制" class="iconfont icon-fuzhi"></i><i title="删除" class="iconfont icon-shanchu1"></i></div>
                        </div>
                      </div>
                    </el-scrollbar>
                  </el-main>
                </el-container>
              </el-aside>
              <el-main class="event-script-main">
                <el-container class="is-vertical">
                  <header class="action-header event-script-main-header">
                    <el-button type="primary">保存</el-button>
                    <el-button>取消</el-button>
                  </header>
                  <el-main v-if="currentAction" class="func_main">
                    <el-form :model="currentAction" :rules="rules">
                      <el-form-item label="Function Name" props="funcName">
                        <el-input v-model="currentAction.funcName" :disabled="currentAction.disabled" />
                      </el-form-item>
                    </el-form>
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
  import { defineComponent, ref, computed } from "vue";
  import CustomDialog from "./CustomDialog.vue";
  import actionStore from "@/controller/action";
  export default defineComponent({
    ControlType: "FormAction",
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
    },
    setup(props) {
      const actionRef = ref();
      const action = computed(() => actionStore?.get("action"));
      const currentAction = computed(() => actionStore?.get("currentAction"));
      console.log("action", props);
      const rules = ref({
        funcName: [
          {
            required: true,
            message: "函数名称必填",
            trigger: "change",
          },
        ],
      });
      return {
        rules,
        actionRef,
        action,
        currentAction,
        onAction() {
          actionRef.value.init("动作设置", "icon-bianji");
          actionRef.value.show();
        },
        handleAction(action: any) {
          actionStore?.set("currentAction", action);
        },
      };
    },
    components: { CustomDialog },
  });
</script>
