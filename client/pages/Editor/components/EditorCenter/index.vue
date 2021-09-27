<template>
  <div class="editor_pages_center">
    <div class="editor_container"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
<style lang="scss" scoped>
.editor_pages_center {
  flex: 1;
  background: #f0f2f5;
  .editor_container {
    width: 100%;
    height: 100%;
    border: 1px solid #f5f5f5;
    border-width: 0 1px;
    position: relative;
  }
}
</style>
