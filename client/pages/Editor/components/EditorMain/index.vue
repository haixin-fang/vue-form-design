<template>
  <div class="editor_page_main">
    <EditorLeft />
    <EditorCenter />
    <EditorRight />
    <FormPreview />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import EditorLeft from "~editor/EditorLeft/index.vue";
import EditorCenter from "~editor/EditorCenter/index.vue";
import EditorRight from "~editor/EditorRight/index.vue";
import FormPreview from '~editor/FormPreview/index.vue'
export default defineComponent({
  components: {
    EditorLeft,
    EditorCenter,
    EditorRight,
    FormPreview
  },
});
</script>
<style lang="scss" scoped>
.editor_page_main {
  display: flex;
  height: 100%;
}
</style>
