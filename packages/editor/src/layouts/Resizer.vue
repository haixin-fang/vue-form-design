<template>
  <div class="starfish-editor-resizer" ref="target"></div>
</template>
<script lang="ts">
import {
  defineComponent,
  inject,
  ref,
  onMounted,
  toRaw,
  onUnmounted,
} from "vue";
import type { Controls, setColumnWidth } from "@/type";
import Gesto from "gesto";
export default defineComponent({
  props: {
    type: {
      type: String,
    },
  },
  setup(props) {
    const target = ref<HTMLDivElement>();
    const { uiControl } = inject<Controls>("control") || {};
    let getso: Gesto;
    onMounted(() => {
      if (!target.value) return;
      getso = new Gesto(target.value, {
        container: window,
        pinchOutside: true,
      }).on("drag", (e) => {
        if (!target.value || !uiControl) return;
        let { right, left } = {
          ...toRaw(uiControl?.get("columnWidth") as Required<setColumnWidth>),
        };
        if (props.type == "right") {
          right -= e.deltaX;
        } else {
          left += e.deltaX;
        }
        uiControl?.set("columnWidth", { left, right });
      });
    });

    onUnmounted(() => {
      getso?.unset();
    });

    return {
      target,
    };
  },
});
</script>

