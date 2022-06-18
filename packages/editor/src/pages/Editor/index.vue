<template>
  <div class="editor_layout">
    <EditorTop />
    <EditorMain />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import EditorTop from "./components/EditorTop/index.vue";
import EditorMain from "./components/EditorMain/index.vue";
import {listenGlobalKeyDown} from '@/utils/shortcutKey'
export default defineComponent({
  components: {
    EditorTop,
    EditorMain,
  },
  created(){
    listenGlobalKeyDown()
  }
});
</script>
<style lang="scss" scoped>
.editor_layout {
  padding-top: $editor_header_top;
  height: 100%;
}
</style>
