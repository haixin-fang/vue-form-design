<template>
  <teleport to="body">
    <CustomDialog ref="maxJsonDialog">
      <el-main style="padding: 0">
        <el-container style="height: 100%">
          <el-main class="my-pageMain">
            <div class="tipContent">满足以下所有条件时,此组件可用</div>
            <div class="tableContainer" v-for="(table, index) in andData" :key="index">
              <el-table :data="table" style="width: 100%" border>
                <el-table-column prop="field" label="字段">
                  <template #default="scope">
                    <el-select v-model="scope.row.field" placeholder="请选择">
                      <el-option v-for="item in fieldList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="logic" label="逻辑">
                  <template #default="scope">
                    <el-select v-model="scope.row.logic" placeholder="请选择">
                      <el-option v-for="item in getLogic(scope.$index, index)" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="值类型">
                  <template #default="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择" @change="handleType(scope.$index, index, scope.row.type)">
                      <el-option v-for="item in getNewTypeList(scope.$index, index)" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="value" label="值">
                  <template #default="scope">
                    <el-form :model="scope.row" :rules="getRules(scope.row.type)" v-if="getTypeIsChange(scope.$index, index) && scope.row.type == '常量'" ref="formList">
                      <el-form-item prop="value">
                        <el-input text v-model="scope.row.value" />
                      </el-form-item>
                    </el-form>
                    <el-select v-model="scope.row.rightField" filterable placeholder="请选择" v-if="scope.row.type == '选项'" :multiple="getMultiple(scope.$index, index)">
                      <el-option :label="'未选择'" :value="''"></el-option>
                      <el-option v-for="(item, rightIndex) in getFiled(scope.$index, index)" :key="rightIndex" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                    <el-switch v-model="scope.row.value" v-if="scope.row.type == '布尔'" />
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template #default="scope">
                    <el-button size="small" type="danger" @click.prevent="deleteRow(scope.$index, index)"> 删除 </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button class="mt-4" style="width: 100%" text @click="onAddItem(index)">+并条件</el-button>
            </div>
            <el-button class="mt-4" text @click="onOrItem">+或条件</el-button>
          </el-main>

          <el-footer class="my-Footer" style="height: 60px; padding-top: 10px; text-align: right">
            <el-button type="primary" @click="saveJson">保存</el-button>
            <el-button @click="closeDialog">关闭</el-button>
          </el-footer>
        </el-container>
      </el-main>
    </CustomDialog>
  </teleport>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, toRaw, computed, onMounted } from "vue";
  import formStore from "@/store/form";
  import { list } from "_postcss@8.4.14@postcss";
  export default defineComponent({
    props: {
      data: {
        type: Object,
        default() {
          return {};
        },
      },
      item: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    emits: ["change"],
    setup(props, { emit }) {
      const maxJsonDialog = ref();
      const formList = ref();
      const fieldList = computed(() => {
        const allFormList = formStore?.get("allFormList");
        const fieldList = toRaw(allFormList)
          ?.filter((item: any) => {
            if (item.data.fieldName !== props.data.fieldName) {
              return item;
            }
          })
          .map((item: any) => {
            if (item.nameCn == "开关") {
              return {
                value: item?.data?.fieldName,
                label: item?.data?.label + "-" + item?.data?.fieldName,
                switch: true,
              };
            }
            if (item.data.itemConfig) {
              let multiple = false;
              if (Array.isArray(item.data.itemConfig.value)) {
                multiple = true;
              }
              const options = item.data.itemConfig.items;
              return {
                value: item?.data?.fieldName,
                label: item?.data?.label + "-" + item?.data?.fieldName,
                multiple,
                options,
              };
            }
            return {
              value: item?.data?.fieldName,
              label: item?.data?.label + "-" + item?.data?.fieldName,
            };
          });
        return fieldList;
      });
      interface logicItem {
        value: string;
        label: string;
        rule?: any[];
      }
      interface ConditionSelect {
        andData: Array<Array<any>>;
        logicList: Array<logicItem>;
        typeList: Array<logicItem>;
      }
      const data = reactive<ConditionSelect>({
        andData: [[]],
        logicList: [
          { value: "=", label: "等于" },
          { value: "!=", label: "不等于" },
        ],
        typeList: [
          {
            value: "常量",
            label: "常量",
          },
        ],
      });
      return {
        ...toRefs(data),
        fieldList,
        maxJsonDialog,
        formList,
        handleType(index: number, tableIndex: number, type: string) {
          if (type == "布尔") {
            data.andData[tableIndex][index].value = true;
          }
        },
        getLogic(index: number, tableIndex: number) {
          const item = fieldList.value.find((item: any) => {
            if (data.andData[tableIndex][index]) {
              if (item.value == data.andData[tableIndex][index].field) {
                return item;
              }
            }
          });
          if (item && item.options && item.multiple) {
            return [
              { value: "in", label: "包含" },
              { value: "not in", label: "不包含" },
            ];
          }
          if (item && item.switch) {
            return [
              {
                value: "=",
                label: "等于",
              },
            ];
          }
          return data.logicList;
        },
        getFiled(index: number, tableIndex: number) {
          if (!data.andData[tableIndex][index] || !(data.andData[tableIndex][index] as any).field) return [];
          const item = fieldList.value.find((item: any) => {
            if (data.andData[tableIndex][index]) {
              if (item.value == data.andData[tableIndex][index].field) {
                return item;
              }
            }
          });
          return item.options || [];
        },
        show() {
          maxJsonDialog.value.init("可用条件", "icon-bianji");
          maxJsonDialog.value.show();
          console.log(props.data);
          if (typeof props.data.showRule != "string" && Array.isArray(props.data.showRule)) {
            data.andData = props.data.showRule;
          } else {
            data.andData = [[]];
          }
        },
        getMultiple(index: number, tableIndex: number) {
          const item = fieldList.value.find((item: any) => {
            if (data.andData[tableIndex][index]) {
              if (item.value == data.andData[tableIndex][index].field) {
                return item;
              }
            }
          });
          return !!item.multiple;
        },
        getNewTypeList(index: number, tableIndex: number) {
          const item = fieldList.value.find((item: any) => {
            if (data.andData[tableIndex][index]) {
              if (item.value == data.andData[tableIndex][index].field) {
                return item;
              }
            }
          });
          if (item && item.options) {
            return [
              {
                rule: [],
                value: "选项",
                label: "选项",
              },
            ];
          }
          if (item && item.switch) {
            return [
              {
                value: "布尔",
                label: "布尔",
              },
            ];
          }
          return data.typeList;
        },
        deleteRow(index: number, tableIndex: number) {
          data.andData[tableIndex].splice(index, 1);
        },
        getTypeIsChange(index: number, tableIndex: number) {
          const nowRow = data.andData[tableIndex][index];
          return !!nowRow.type;
        },
        getRules(value: any) {
          return {
            value: data.typeList.find((item) => {
              return item.value == value;
            })?.rule,
          };
        },
        async onAddItem(index: number) {
          // console.log(fieldList.value);
          // let isValidated = true;
          // if (formList.value?.length > 0) {
          //   for (let i = 0; i < formList.value.length; i++) {
          //     const item = formList.value[i];
          //     await item.validate((valid) => {
          //       if (valid) {
          //         console.log("submit!");
          //       } else {
          //         isValidated = false;
          //         console.log("error submit!");
          //         return false;
          //       }
          //     });
          //   }
          // }
          // if (!isValidated) {
          //   this.$message.error("条件校验失败,请补充完整!");
          //   return;
          // }
          // if (formList.value?.length != data.andData[index].length && data.andData[index].length > 0) {
          //   this.$message.error("内容补充完整再新增!");
          //   return;
          // }
          data.andData[index].push({
            field: "",
            logic: "",
            type: "",
            value: "",
          });
        },
        onOrItem() {
          data.andData.push([]);
        },
        closeDialog() {
          maxJsonDialog.value.close();
        },
        saveJson() {
          const andData = toRaw(data.andData)
            .filter((item) => {
              if (item.length > 0) {
                return item;
              }
            })
            .map((tabData) => {
              const newTabData = tabData.filter((item) => {
                if (item.field) {
                  return item;
                }
              });
              if (newTabData.length > 0) {
                return newTabData;
              }
            })
            .filter((item) => {
              return !!item;
            });
          // props.data[props.item.data.fieldName] = andData;
          emit("change", andData);
          maxJsonDialog.value.close();
        },
      };
    },
  });
</script>
<style scoped lang="scss">
  .my-pageMain {
    .tipContent {
      margin-bottom: 20px;
      font-size: 14px;
      color: rgb(118, 116, 116);
    }
    padding: 20px 50px !important;
    .tableContainer {
      border: 1px solid #dfe6ec;
      margin-bottom: 15px;
    }
    :deep(.el-form) {
      padding-bottom: 0px !important;
      .el-form-item__content {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        margin-bottom: 0 !important;
        .el-form-item__error {
          white-space: nowrap;
          position: static;
        }
      }
    }
  }
</style>
