<template>
  <div class="dynamicform">
    <el-form ref="ruleForm" :model="formResult" :rules="rules" label-width="120px" class="demo-ruleForm" :validate-on-rule-change="false">
      <el-form-item v-for="item in allFormList" :key="(item as any).id" :prop="item.data.fieldName">
        <component ref="controlObj" @change="handleControlChange" :is="item.ControlType" :item="item" :data="formResult || '{}'" :drag="false" v-if="item.show"></component>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, getCurrentInstance, toRaw, PropType } from "vue";
  export default defineComponent({
    name: "Dynamicform",
    props: {
      allFormList: {
        type: Array as PropType<any>,
        default(){
          return []
        }
      },
      formResult: {
        type: Object,
        default(){
          return {}
        }
      },
    },
    setup(props: any) {
      const { proxy } = getCurrentInstance() as any;
      // const { allFormList, formResult } = props;
      const rules: any = ref({});
      const ruleForm = ref();
      const controlObj = ref();
      props.allFormList?.forEach((item: any) => {
        let rule: any[] = [];
        if (item.data.required) {
          rule.push({
            required: true,
            message: "请输入" + item.data.label,
            trigger: "blur",
          });
        }
        if (typeof item.data.rule == "string") {
          rule = rule.concat(proxy.$Flex.tryParseJson(item.data.rule));
        } else {
          rule = rule.concat(item.data.rule);
        }
        // 特殊的jsoneditor表单要单独处理
        if (item.data.json) {
          rule.push(...proxy.$Flex.getJsonValidate());
        }
        rules.value[item.data.fieldName] = rule;
      });
      const handleControlChange = () => {
        const allFormLists: any = props.allFormList;
        allFormLists.forEach((item: any) => {
          if (item.data.showRule === "{}") {
            item.show = true;
          } else {
            try {
              if (Array.isArray(item.data.showRule)) {
                item.show = conditionChange(transformData(toRaw(item.data.showRule)));
              } else {
                item.show = conditionChange(toRaw(item.data.showRule));
              }
            } catch (e) {
              item.show = true;
            }
          }
        });
      };
      function transformData(data: any) {
        /**普通模式转为高级模式的数据结构,方便复用 */
        const r: any = [];
        data.forEach((item: any) => {
          r.push({
            type: "andgroup",
            result: item.map((d: any) => {
              return {
                type: "data",
                data: d,
              };
            }),
          });
        });
        const result = {
          type: "orgroup",
          result: r,
        };
        return result;
      }
      function conditionChange(data: any) {
        if (data.type == "andgroup") {
          const result = data.result
            .map((item: any) => {
              const r = conditionChange(item);
              return r;
            })
            .find((item: boolean) => {
              return item == false;
            });
          return result === undefined ? true : result;
        } else if (data.type == "orgroup") {
          const result = data.result
            .map((item: any) => {
              const r = conditionChange(item);
              return r;
            })
            .find((item: boolean) => {
              return item == true;
            });
          return result === undefined ? false : result;
        } else if (data.type == "data") {
          const result = data.data;
          const formResults: any = props.formResult;
          const value = formResults[result.field];
          let isShow = false;
          switch (result.logic) {
            case "=":
              isShow = value == result.value;
              break;
            case "!=":
              isShow = value != result.value;
              break;
            case "in":
              if (Array.isArray(value)) {
                value.find((item) => {
                  if (result.value.include(item)) {
                    isShow = result.value.includes(item);
                    return item;
                  }
                });
              } else {
                isShow = result.value.includes(value);
              }
              break;
            case "not in":
              if (Array.isArray(value)) {
                value.find((item) => {
                  if (!result.value.include(item)) {
                    isShow = !result.value.includes(item);
                    return item;
                  }
                });
              } else {
                isShow = !result.value.includes(value);
              }
              break;
          }
          return isShow;
        }
      }
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
