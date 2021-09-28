<template>
  <div class="editor_pages_left">
    <draggable class="dragArea list-group" :list="list1" :group="{ name: 'people', pull: 'clone', put: false }" :clone="cloneDog" @change="log" item-key="id">
      <template #item="{ element }">
        <div class="list-group-item">
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";
export default defineComponent({
  components: {
    draggable,
  },
  data() {
    return {
      list1: [
        { name: "dog 1", id: 1 },
        { name: "dog 2", id: 2 },
        { name: "dog 3", id: 3 },
        { name: "dog 4", id: 4 },
      ],
    };
  },
});
</script>
<style lang="scss" scoped>
.editor_pages_left {
  width: 248px;
  height: 100%;
}
</style>
