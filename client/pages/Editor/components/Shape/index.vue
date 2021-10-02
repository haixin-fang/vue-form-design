<template>
  <div class="shape" :class="[active ? 'shape_border' : '']">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";

export default defineComponent({
  props: {
    active: Boolean,
  },
  //   setup(props) {
  //     let { active } = toRefs(props);
  //     console.log("1bb1", active);
  //   },
});
</script>
<style lang="scss">
.shape {
  box-sizing: content-box;
  border: 3px solid transparent;
}
.shape_border {
  border: 3px solid blue;
}
</style>
