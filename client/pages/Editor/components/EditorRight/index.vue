<template>
  <div class="editor_pages_right"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
<style lang="scss" scoped>
.editor_pages_right {
  width: 318px;
  height: 100%;
  position: fixed;
  right: 0;
  top: $editor_header_top;
  background: yellow;
}
</style>
