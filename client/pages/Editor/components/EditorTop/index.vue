<template>
  <div class="editorHeadTop">
    <div class="component_pages_header"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
<style lang="scss" scoped>
.editorHeadTop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: $editor_header_top;
  //   background: green;
  .component_pages_header {
    width: 100%;
    height: 100%;
    box-shadow: 0 2px 3px 0 hsla(0, 0%, 39.2%, 0.06);
  }
}
</style>
