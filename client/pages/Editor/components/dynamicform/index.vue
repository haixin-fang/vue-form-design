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
        v-for="element in allFormList"
        :key="element.id"
        :prop="element.data.fieldName"
      >
        <component
          :is="element.ControlType"
          :item="element"
          :data="formResult || '{}'"
          :drag="false"
        ></component>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import _ from "@/utils/_";
export default defineComponent({
  props: {
    allFormList: Array,
    formResult: Object,
  },
  setup(props) {
    let { allFormList } = reactive(props);
    let rules: any = ref({});
    allFormList?.forEach((item: any) => {
      let rule: any[] = [];
      if (item.data.required) {
        rule.push({
          required: true,
          message: "请输入" + item.data.label,
          trigger: "blur",
        });
      }
      rule = rule.concat(_.tryParseJson(item.data.rule))
      rules.value[item.data.fieldName] = rule;
    });
    return {
      rules,
    };
  },
});
</script>
