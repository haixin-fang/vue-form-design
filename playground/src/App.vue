<template>
  <!-- <starfish-editor style="height: 700px" :basic-fields="['Text']" :layout-fields="['grid']"> </starfish-editor> -->
  <starfish-editor @save="onSave" ref="starfishRef" style="height: 700px" :shortcut-disabled="true"> </starfish-editor>
  <el-button @click="goSave">保存</el-button>
  <el-button @click="setJson">自定义json</el-button>
</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";
  export default defineComponent({
    name: "App",
    setup() {
      const starfishRef = ref();
      return {
        starfishRef,
        onSave(res) {},
        goSave() {
          starfishRef.value.getJson();
        },
        setJson() {
          starfishRef.value.setJson([{
            ControlType: "Text",
            nameCn: "文本框",
            id: "fPgb7Xb_w6HXixCAyA4k4",
            layout: false,
            data: {
              fieldName: "Text_n6SZkfztwMLHMr1A0GX5B",
              label: "标签名称",
              tip: "",
              placeholder: "",
              showRule: "{}",
              required: false,
              rule: "[]",
              default: "",
            },
          }]);
        },
      };
    },
  });
</script>
