<template>
  <div class="dynamicform">
    <el-form
      ref="ruleForm"
      :model="formResult"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :validate-on-rule-change="false"
    >
      <el-form-item
        v-for="item in allFormList"
        :key="item.id"
        :prop="item.data.fieldName"
      >
        <component
          ref="controlObj"
          @change="handleControlChange"
          :is="item.ControlType"
          :item="item"
          :data="formResult || '{}'"
          :drag="false"
          v-if="item.show"
        ></component>
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
    let { allFormList, formResult } = reactive(props);
    let rules: any = ref({});
    let ruleForm = ref();
    let controlObj = ref();
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
    let handleControlChange = () => {
      let allFormLists: any = allFormList;
      let formResults: any = formResult;
      allFormLists.forEach((item: any) => {
        if (item.data.showRule === "{}") {
          item.show = true;
        } else {
          let showRule = JSON.parse(item.data.showRule);
          for (let key in showRule) {
            if (formResults[key] == showRule[key]) {
              item.show = true;
            } else {
              item.show = false;
            }
          }
          console.log("11", allFormList);
        }
      });
    };
    onMounted(handleControlChange);
    return {
      rules,
      ruleForm,
      controlObj,
      handleControlChange
    };
  },
});
</script>
