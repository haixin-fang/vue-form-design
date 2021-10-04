<template>
  <div class="dynamicform">
    <div class="list-item" v-for="element in allFormList" :key="element.id">
      <component
        :is="element.ControlType"
        :item="element"
        :data=" this.formResult || '{}'"
        :drag="false"
      ></component>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore, mapState } from "vuex";
export default defineComponent({
  props: {
    allFormList: Object,
    formResult: Object,
  },
  mounted() {
    console.log("allFormList", this.allFormList);
    console.log("formResult", this.formResult);
  },
  setup(props) {
    let store = useStore();
  },
});
</script>
