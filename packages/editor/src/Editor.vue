<template>
  <framework>
    <template #nav>
      <Nav></Nav>
    </template>
    <template #navlist>
      <nav-list></nav-list>
    </template>
    <template #left>
      <component-list></component-list>
    </template>
    <template #workspace>
      <workspace ref="workspace"></workspace>
    </template>
    <template #propsPanel>
      <props-panel></props-panel>
    </template>
    <template #other>
      <form-preview></form-preview>
    </template>
  </framework>
</template>

<script lang="ts">
  import { defineComponent, provide, ref, onMounted, onUnmounted } from "vue";
  import Framework from "@/layouts/Framework.vue";
  import NavList from "~editor/NavList.vue";
  import Nav from "~editor/Nav.vue";
  import ComponentList from "~editor/ComponentList.vue";
  import Workspace from "~editor/Workspace.vue";
  import PropsPanel from "~editor/PropsPanel.vue";
  import FormPreview from "~editor/FormPreview.vue";
  import uiControl from "@/controller/ui";
  import hisContrl from "@/controller/history";
  import formStore from "@/store/form";
  import store from "@/store/index";
  import { listenGlobalKeyDown } from "@/utils/shortcutKey";
  // 根据编辑器判断,走不同的快捷键逻辑
  import formKeyconList from "@/utils/formKeycon";
  import type { Controls } from "./type";
  import KeyController from "keycon";

  export default defineComponent({
    name: "StarfishEditor",
    components: { Framework, NavList, ComponentList, Workspace, PropsPanel, FormPreview, Nav },
    setup() {
      const workspace = ref();
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
        store,
      };
      let keycons: KeyController;
      onMounted(() => {
        dom = workspace.value?.$el;
        dom.addEventListener("mouseenter", mouseenterHandler);
        dom.addEventListener("mouseleave", mouseleaveHandler);
        keycons = listenGlobalKeyDown(formKeyconList, dom);
      });
      onUnmounted(() => {
        dom.removeEventListener("mouseenter", mouseenterHandler);
        dom.removeEventListener("mouseleave", mouseleaveHandler);
        keycons.destroy();
      });
      provide("control", control);
      return {
        workspace,
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
