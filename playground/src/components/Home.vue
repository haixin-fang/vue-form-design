<template>
  <!-- <starfish-editor style="height: 700px" :basic-fields="['Text']" :layout-fields="['grid']"> </starfish-editor> -->
  <div class="container">
    <starfish-editor class="starfish-editor" @save="onSave" ref="starfishRef" :shortcut-disabled="false" :header-show="false" :menu="menu"> </starfish-editor>
    <div class="btnlist">
      <el-button @click="goSave" type="primary">保存</el-button>
      <el-button @click="setJson" type="primary">自定义json</el-button>
      <el-button @click="goPreview" type="primary"> 表单预览 </el-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, getCurrentInstance, ComponentInternalInstance } from "vue";
  import Store from "../Server";
  export default defineComponent({
    name: "App",
    setup() {
      const starfishRef = ref();
      const { proxy } = getCurrentInstance() as ComponentInternalInstance;
      const menu = ref({
        left: [],
        right: [],
        column: false,
      });
      return {
        starfishRef,
        menu,
        goPreview() {
          proxy?.$router.push("/about");
        },
        onSave(res: any[]) {
          Store.set("allFormList", res);
        },
        goSave() {
          starfishRef.value.getJson();
        },
        setJson() {
          starfishRef.value.setJson([
            {
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
            },
          ]);
        },
      };
    },
  });
</script>
<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    .starfish-editor {
      border: 1px solid rgb(190, 186, 186);
    }
    .btnlist {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-top: 1px solid rgb(190, 186, 186);
      background: white;
      padding: 10px 0;
      z-index: 1;
    }
  }
</style>
