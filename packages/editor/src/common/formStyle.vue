<template>
  <div class="starfish-formitem">
    <div class="label">
      <label>{{ item.data.label }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip
        v-if="item.data.tip"
        class="item"
        effect="dark"
        :content="item.data.tip"
        placement="top"
      >
        <span class="tip iconfontui icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control">
      <el-button
        style="width: 100%"
        @click="onStyleSet"
        :type="code ? 'primary' : ''"
        >{{ code ? "已设置" : "设置" }}</el-button
      >
      <custom-dialog ref="codeDialog" dialogclass="codeDialog" width="1000">
        <div class="custom_code">
          <codemirror
            v-model="code"
            placeholder=".starfish-form-css{}"
            :style="{ height: '400px' }"
            :autofocus="true"
            :extensions="extensions"
            :indent-with-tab="true"
            :tab-size="2"
          />
        </div>
        <el-footer class="my-Footer" style="text-align: center">
          <el-button type="primary" @click="saveCssStyle">确定</el-button>
          <el-button @click="closeCodeDialog">关闭</el-button>
        </el-footer>
      </custom-dialog>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";
import { css } from "@codemirror/lang-css";
import {Codemirror} from 'vue-codemirror';
export default defineComponent({
  ControlType: "FormStyle", // 必须与文件名匹配
  isHide: true,
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    controlItems: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Codemirror,
  },
  setup(props) {
    const extensions = [css()];
    const codeDialog = ref();
    const code = ref();
    const { proxy } = getCurrentInstance() as any;
    return {
      code,
      extensions,
      codeDialog,
      onStyleSet() {
        codeDialog.value.init("表单样式表", "icon-biaodan");
        codeDialog.value.show();
      },
      saveCssStyle() {
        props.data[props.item.data.fieldName] = code.value;
        proxy.extractCssClass();
        proxy.insertCustomCssToHead(code.value);
        codeDialog.value.close();
      },
      closeCodeDialog() {
        codeDialog.value.close();
      },
      extractCssClass() {
        const regExp = /\..*{/g;
        const result = code.value.match(regExp);
        const cssNameArray: any[] = [];
        if (!!result && result.length > 0) {
          result.forEach((rItem: any) => {
            const classArray = rItem.split(","); //切分逗号分割的多个class
            if (classArray.length > 0) {
              classArray.forEach((cItem: any) => {
                const caItem = cItem.trim();
                if (caItem.indexOf(".", 1) !== -1) {
                  //查找第二个.位置
                  const newClass = caItem.substring(
                    caItem.indexOf(".") + 1,
                    caItem.indexOf(".", 1)
                  ); //仅截取第一、二个.号之间的class
                  if (newClass) {
                    cssNameArray.push(newClass.trim());
                  }
                } else if (caItem.indexOf(" ") !== -1) {
                  //查找第一个空格位置
                  const newClass = caItem.substring(
                    caItem.indexOf(".") + 1,
                    caItem.indexOf(" ")
                  ); //仅截取第一、二个.号之间的class
                  if (newClass) {
                    cssNameArray.push(newClass.trim());
                  }
                } else {
                  if (caItem.indexOf("{") !== -1) {
                    //查找第一个{位置
                    const newClass = caItem.substring(
                      caItem.indexOf(".") + 1,
                      caItem.indexOf("{")
                    );
                    cssNameArray.push(newClass.trim());
                  } else {
                    const newClass = caItem.substring(caItem.indexOf(".") + 1);
                    cssNameArray.push(newClass.trim());
                  }
                }
              });
            }
          });
        }
        props.controlItems.find((item: any) => {
          if (item.data.fieldName == "csslist") {
            item.data.itemConfig.items = [];
            cssNameArray.forEach((cssName: string, index: number) => {
              item.data.itemConfig.items.push({
                label: cssName,
                value: cssName,
                select: false,
                id: index + 1,
              });
            });
            return item;
          }
        });
      },
      insertCustomCssToHead(cssCode: string) {
        const head = document.getElementsByTagName("head")[0];
        const oldStyle = document.getElementById("starfish-custom-css");
        if (oldStyle) {
          head.removeChild(oldStyle); //先清除后插入！！
        }
        const newStyle: any = document.createElement("style");
        newStyle.type = "text/css";
        newStyle.rel = "stylesheet";
        newStyle.id = "starfish-custom-css";
        try {
          newStyle.appendChild(document.createTextNode(cssCode));
        } catch (ex) {
          newStyle.styleSheet.cssText = cssCode;
        }

        head.appendChild(newStyle);
      },
    };
  },
});
</script>
