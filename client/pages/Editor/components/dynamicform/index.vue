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
export default defineComponent({
  props: {
    allFormList: Array,
    formResult: Object,
  },
  setup(props) {
    let { allFormList } = reactive(props);
    let rules: any = ref({});
    allFormList?.forEach((item: any) => {
      if (item.data.required) {
        let rule: any[] = [];
        rule.push({
          required: true,
          message: "请输入" + item.data.label,
          trigger: "blur",
        });
        rules.value[item.data.fieldName] = rule;
      }
    });
    return {
      rules,
    };
  },
});
</script>
