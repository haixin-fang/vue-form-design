<template>
  <div class="dynamicform">
    <el-form ref="ruleForm" :model="formResult" :rules="rules" label-width="120px" class="demo-ruleForm" :validate-on-rule-change="false">
      <el-form-item v-for="item in allFormList" :key="item.id" :prop="item.data.fieldName">
        <component ref="controlObj" @change="handleControlChange" :is="item.ControlType" :item="item" :data="formResult || '{}'" :drag="false" v-if="item.show"></component>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from "vue";
import _ from "@/utils/_";
export default defineComponent({
  props: {
    allFormList: Array,
    formResult: Object,
  },
  setup(props) {
    const { allFormList, formResult } = reactive(props);
    const rules: any = ref({});
    const ruleForm = ref();
    const controlObj = ref();
    allFormList?.forEach((item: any) => {
      let rule: any[] = [];
      if (item.data.required) {
        rule.push({
          required: true,
          message: "请输入" + item.data.label,
          trigger: "blur",
        });
      }
      rule = rule.concat(_.tryParseJson(item.data.rule));
      // 特殊的jsoneditor表单要单独处理
      if (item.data.json) {
        rule.push(..._.getJsonValidate());
      }
      rules.value[item.data.fieldName] = rule;
    });
    const handleControlChange = () => {
      const allFormLists: any = allFormList;
      const formResults: any = formResult;
      allFormLists.forEach((item: any) => {
        if (item.data.showRule === "{}") {
          item.show = true;
        } else {
          let showRule;
          try {
            showRule = JSON.parse(item.data.showRule);
            for (const key in showRule) {
              if (_.getDataType(formResults[key]) == "Array") {
                let isHave = false; // 默认不显示
                // 配置数组就是或者的关系
                if (_.getDataType(showRule[key]) == "Array") {
                  showRule[key].forEach((rule: any) => {
                    if (formResults[key].indexOf(String(rule)) > -1) {
                      isHave = true;
                    }
                  });
                } else {
                  if (formResults[key].indexOf(String(showRule[key])) > -1) {
                    isHave = true;
                  }
                }
                item.show = isHave;
              } else {
                if (formResults[key] == showRule[key]) {
                  item.show = true;
                } else {
                  item.show = false;
                }
              }
            }
          } catch (e) {
            item.show = true;
          }
        }
      });
    };
    onMounted(handleControlChange);
    return {
      rules,
      ruleForm,
      controlObj,
      handleControlChange,
    };
  },
});
</script>
