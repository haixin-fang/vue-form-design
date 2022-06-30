<template>
  <!-- <Editor></Editor> -->
  <framework>
    <template #nav>
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
  import { defineComponent, provide, ref, onMounted } from "vue";
  // import Editor from "@/pages/Editor/index.vue";
  import Framework from "@/layouts/Framework.vue";
  import NavList from "~editor/NavList.vue";
  import ComponentList from "~editor/ComponentList.vue";
  import Workspace from "~editor/Workspace.vue";
  import PropsPanel from "~editor/PropsPanel.vue";
  import FormPreview from "~editor/FormPreview.vue";
  import uiControl from "@/controller/ui";
  import { listenGlobalKeyDown } from "@/utils/shortcutKey";
  // 根据编辑器判断,走不同的快捷键逻辑
  import formKeyconList from "@/utils/formKeycon";
  import type { Controls } from "./type";

  export default defineComponent({
    name: "Editor",
    components: { Framework, NavList, ComponentList, Workspace, PropsPanel, FormPreview },
    setup() {
      const workspace = ref();
      const control: Controls = {
        uiControl,
      };
      onMounted(() => {
        listenGlobalKeyDown(formKeyconList, workspace.value.$el);
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
