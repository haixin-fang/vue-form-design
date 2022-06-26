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
      <div ref="richText" v-if="drag" ></div>
      <div ref="richText" v-if="!drag" ></div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, onUnmounted } from "vue";
  import E from "wangeditor";
  import { getFormConfig } from "../../utils/fieldConfig";
  import fieldProps from "../../utils/fieldProps";
  import { useWatch } from "../../utils/customHooks";
  export default defineComponent({
    ControlType: "RichText", // 必须与文件名匹配
    nameCn: "富文本",
    icon: "icon-textEdit",
    formConfig: getFormConfig("RichText"),
    props: {
      ...fieldProps,
    },
    data() {
      const editor: any = null;
      return {
        random: Math.ceil(Math.random() * 100),
        editor: editor,
      };
    },
    setup(props) {
      const random = ref(Math.ceil(Math.random() * 100));
      const richText = ref();
      let editor: any = null;
      useWatch(props.data);
      onMounted(() => {
        if (props.drag) {
          editor = new E(richText.value);
          editor.config.focus = false;
          editor.create();
        } else {
          editor = new E(richText.value);
          editor.config.focus = false;
          editor.create();
          const data: any = props.data;
          const item: any = props.item;
          editor.config.onchange = function (newHtml: string) {
            console.log("onblur", newHtml); // 获取最新的 html 内容
            data[item.data.fieldName] = newHtml;
          };
        }
      });
      onUnmounted(() => {
        editor.destroy();
        editor = null;
      });
      return {
        richText
      };
    },
  });
</script>
