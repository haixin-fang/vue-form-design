<template>
  <div class="editor_page_main">
    <EditorLeft />
    <EditorCenter />
    <EditorRight />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import EditorLeft from "~editor/EditorLeft/index.vue";
import EditorCenter from "~editor/EditorCenter/index.vue";
import EditorRight from "~editor/EditorRight/index.vue";
export default defineComponent({
  components: {
    EditorLeft,
    EditorCenter,
    EditorRight,
  },
});
</script>
<style lang="scss" scoped>
.editor_page_main {
  display: flex;
  height: 100%;
}
</style>
