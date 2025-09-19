<template>
  <div class="starfish-dynamicform">
    <el-form ref="ruleForm" :model="formResult" :rules="rules" label-width="120px" class="demo-ruleForm" :size="globalConfig.size || 'large'" :validate-on-rule-change="false">
      <template v-for="item in allFormList" >
        <el-form-item :prop="item.data.fieldName" v-if="!item.layout && item.show" :key="item.id">
          <component ref="controlObj" @change="handleControlChange" :is="item.ControlType" v-bind="globalConfig" :item="item" :data="formResult || '{}'" :drag="false"></component>
        </el-form-item>
        <template v-else-if="item.show">
          <component ref="controlObj" @change="handleControlChange" :is="item.ControlType" :key="item.id" v-bind="globalConfig" :item="item" :data="formResult || '{}'" :drag="false"></component>
        </template>
      </template>
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
        default() {
          return [];
        },
      },
      formResult: {
        type: Object,
        default() {
          return {};
        },
      },
      globalConfig: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    setup(props: any, { emit }) {
      const { proxy } = getCurrentInstance() as any;
      const rules: any = ref({});
      const ruleForm = ref();
      const controlObj = ref();
      props.allFormList?.forEach((item: any) => {
        getRules(item);
      });

      function getFormListRules(rules: any[]) {
        const result: any[] = [];
        if (Array.isArray(rules) && rules && rules.length > 0) {
          rules.forEach((item) => {
            if (item.type == "enum") {
              const func = eval(`(${item.value})`);
              result.push({
                validator: func,
                trigger: "blur",
              });
            } else if (item.type == "func") {
              const mainData = props.formResult;
              const func = eval(`((rule, value, callback, mainData = mainData) => {${item.value.func}})`);
              result.push({
                validator: func,
                trigger: "blur",
              });
              console.log('mainData', mainData)
            } else if (item.type == "high") {
              if (item.value.ruleType == 5) {
                result.push({
                  validator: eval(item.value.validor),
                  trigger: item.value.trigger,
                });
                return;
              }
              // let high = JSON.parse(JSON.stringify(item.value));
              // delete high.ruleType;
              result.push(item.value);
            }
          });
        }
        return result;
      }

      function getRules(item: any) {
        if (!item.layout) {
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
            rule = rule.concat(getFormListRules(item.data.rule));
          }
          // 特殊的jsoneditor表单要单独处理
          if (item.data.json) {
            rule.push(...proxy.$Flex.getJsonValidate());
          }
          rules.value[item.data.fieldName] = rule;
        } else if (item.layout) {
          if (item.ControlType == "Grid") {
            item.data.columns.forEach((colItem: any) => {
              colItem.list.forEach((listItem: any) => {
                getRules(listItem);
              });
            });
          } else if (item.ControlType == "TableLayout") {
            const trs = item.data.trs;
            trs.forEach((trItem: any) => {
              trItem.tds.forEach((tdItem: any) => {
                tdItem.list.forEach((listItem: any) => {
                  getRules(listItem);
                });
              });
            });
          } else if (item.ControlType == "Collapse" || item.ControlType == "Tabs") {
            const items = item.data.items;
            items.forEach((colItem: any) => {
              colItem.list.forEach((listItem: any) => {
                getRules(listItem);
              });
            });
          }
        }
      }

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
        executeFunc("updated");
        emit("change");
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
                  if (result.value.includes(item)) {
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
      function reset() {
        ruleForm.value.resetFields();
      }
      function getValidate() {
        return new Promise((resolve) => {
          ruleForm.value.validate((valide: boolean) => {
            resolve(valide);
          });
        });
      }
      onMounted(() => {
        handleControlChange();
        executeFunc("mounted");
      });
      function executeFunc(funcName: string) {
        const mountedAction = props.globalConfig.action?.find((item: any) => {
          if (item.type == funcName) {
            return item;
          }
        });
        if (mountedAction) {
          eval(`(function(){${mountedAction.funcStr}}).call(proxy)`);
        }
      }
      return {
        rules,
        ruleForm,
        controlObj,
        handleControlChange,
        reset,
        getValidate,
      };
    },
  });
</script>
