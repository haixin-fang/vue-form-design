<template>
  <div class="starfish-formitem" :class="drag ? 'formCover' : ''">
    <div class="label">
      <label>{{ item.data.label }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="bottom-start">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control">
      <div :class="'richText' + random" v-if="drag"></div>
      <div :class="'richText' + random" v-if="!drag"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import E from "wangeditor";
export default defineComponent({
  ControlType: "RichText", // 必须与文件名匹配
  nameCn: "富文本",
  icon: "icon-textEdit",
  formConfig: {
    data() {
      return {
        fieldName: "",
        label: "标签名称",
        tip: "",
        placeholder: "",
        showRule: "{}",
        required: false,
        rule: "[]",
        default: "",
      };
    },
    morenConfig() {
      return [];
    },
  },
  props: {
    drag: Boolean,
    data: Object,
    item: Object,
  },
  data(){
    let editor: any = null
    return {
      random: Math.ceil(Math.random() * 100),
      editor: editor
    }
  },
  watch: {
    data: {
      handler() {
        this.$emit("change");
      },
      deep: true,
    },
  },
  mounted() {
    if (this.drag) {
      const editor = new E(".richText" + this.random);
      editor.config.focus = false
      editor.create();
      this.editor = editor
    } else {
      const editor = new E(".richText"+ this.random);
      editor.config.focus = false
      editor.create();
      let data: any = this.data;
      let item: any = this.item;
      editor.config.onchange  = function (newHtml: string) {
        console.log("onblur", newHtml); // 获取最新的 html 内容
        data[item.data.fieldName] = newHtml
      };
      this.editor = editor
    }
  },
  unmounted(){
    this.editor.destroy()
    this.editor = null
  }
});
</script>
