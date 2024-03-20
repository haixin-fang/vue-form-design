<template>
  <framework :headerShow="headerShow">
    <template #nav v-if="headerShow">
      <Nav></Nav>
    </template>
    <template #navlist>
      <nav-list :menu="menu"></nav-list>
    </template>
    <template #left>
      <component-list
        :basic-fields="basicFields"
        :layout-fields="layoutFields"
      ></component-list>
    </template>
    <template #workspace>
      <workspace ref="workspace"></workspace>
    </template>
    <template #propsPanel v-if="panel.length > 0">
      <props-panel @save="onSave" :column="menu.column" :panel="panel"></props-panel>
    </template>
    <template #other>
      <form-preview ref="formPreview"></form-preview>
    </template>
  </framework>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  ref,
  onMounted,
  onUnmounted,
  PropType,
  defineAsyncComponent,
} from "vue";
import Framework from "@/layouts/Framework.vue";
import NavList from "~editor/NavList.vue";
import Nav from "~editor/Nav.vue";
import ComponentList from "~editor/ComponentList.vue";
import Workspace from "~editor/Workspace.vue";
import PropsPanel from "~editor/PropsPanel.vue";
import uiControl from "@/controller/ui";
import hisContrl from "@/controller/history";
import formStore from "@/controller/form";
import actionContrl from "@/controller/action";
import store from "@/controller/shortcut";
import { listenGlobalKeyDown } from "@/utils/shortcutKey";
// 根据编辑器判断,走不同的快捷键逻辑
import formKeyconList from "@/utils/formKeycon";
import type { Controls, MenuBarData } from "./type";
import KeyController from "keycon";

export default defineComponent({
  name: "StarfishEditor",
  components: {
    Framework,
    NavList,
    ComponentList,
    Workspace,
    PropsPanel,
    FormPreview: defineAsyncComponent(() => import("~editor/FormPreview.vue")),
    Nav,
  },
  props: {
    /**
     * 基础控件
     */
    basicFields: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * 布局控件
     */
    layoutFields: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * 是否禁用快捷键
     */
    shortcutDisabled: {
      type: Boolean,
      default: false,
    },
    /**
     * 导航头是否展示
     */
    headerShow: {
      type: Boolean,
      default: true,
    },
    /** 顶部工具栏配置 */
    menu: {
      type: Object as PropType<MenuBarData>,
      default: () => ({ left: [], right: [], column: true }),
    },
    // 右侧配置属性tab
    panel: {
      type: Array,
      default: () => (["form", "json", "global"])
    }
  },
  setup(props: any, { emit }) {
    const workspace = ref();
    const formPreview = ref();
    let dom: HTMLDivElement;
    const mouseenterHandler = () => {
      dom?.focus();
    };

    const mouseleaveHandler = () => {
      dom?.blur();
    };
    const control: Controls = {
      uiControl,
      hisContrl,
      formStore,
      actionContrl,
      store,
    };
    let keycons: KeyController;
    onMounted(() => {
      dom = workspace.value?.$el;
      if (!props.shortcutDisabled) {
        dom.addEventListener("mouseenter", mouseenterHandler);
        dom.addEventListener("mouseleave", mouseleaveHandler);
        keycons = listenGlobalKeyDown(formKeyconList, dom);
      }
    });
    onUnmounted(() => {
      if (!props.shortcutDisabled) {
        dom.removeEventListener("mouseenter", mouseenterHandler);
        dom.removeEventListener("mouseleave", mouseleaveHandler);
        keycons.destroy();
      }
    });
    provide("control", control);
    return {
      workspace,
      formPreview,
      onSave() {
        emit("save", formStore?.get("AllFormResult"));
      },
      getJson() {
        window.VApp.$EventBus.emit("setSave");
      },
      setJson(jsonList: any[]) {
        const newJson = jsonList.map((json: any) => {
          return window.VApp.$Flex.jsonToForm(json);
        });
        formStore.updateAllFormList(newJson);
      },
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
