<template>
  <teleport to="body">
    <CustomDialog ref="maxJsonDialog" class="maxJsonDialog">
      <el-main style="padding: 0">
        <el-container style="height: 100%">
          <el-main class="my-pageMain">
            <div class="tipContent">满足以下所有条件时,此组件可用</div>
            <div class="tableContainer" v-for="(table, index) in andData" :key="index">
              <el-table :data="table" style="width: 100%">
                <el-table-column prop="field" label="字段" width="200">
                  <template #default="scope">
                    <el-select v-model="scope.row.field" placeholder="请选择">
                      <el-option v-for="item in fieldList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="logic" label="逻辑" width="150">
                  <template #default="scope">
                    <el-select v-model="scope.row.logic" placeholder="请选择">
                      <el-option v-for="item in logicList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="值类型" width="150">
                  <template #default="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择">
                      <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="value" label="值">
                  <template #default="scope">
                    <el-form :model="scope.row" :rules="getRules(scope.row.type)" v-if="getTypeIsChange(scope.$index, index)" ref="formList">
                      <el-form-item prop="value">
                        <el-input type="text" v-model="scope.row.value" />
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template #default="scope">
                    <el-button size="small" type="danger" @click.prevent="deleteRow(scope.$index, index)"> 删除 </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button class="mt-4" style="width: 100%" type="text" @click="onAddItem(index)">+并条件</el-button>
            </div>
            <el-button class="mt-4" type="text" @click="onOrItem">+或条件</el-button>
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
<script>
  import { defineComponent, reactive, toRefs, ref, toRaw, getCurrentInstance } from "vue";

  export default defineComponent({
    props: {
      fieldList: {
        type: Array,
        default() {
          return [
            { value: "A", label: "价格" },
            { value: "B", label: "折扣" },
          ];
        },
      },
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
    setup(props) {
      const maxJsonDialog = ref();
      const formList = ref();
      const { proxy } = getCurrentInstance();
      const data = reactive({
        andData: [[]],
        logicList: [
          { value: ">", label: "大于" },
          { value: "=", label: "等于" },
          { value: "!=", label: "不等于" },
          { value: "<", label: "小于" },
          { value: ">=", label: "大于等于" },
          { value: "<=", label: "小于等于" },
        ],
        typeList: [
          {
            rule: [
              {
                required: true,
                message: "必填",
                trigger: "blur",
              },
              {
                pattern: "^[0-9]+$",
                message: "必须是数字",
                trigger: "blur",
              },
            ],

            value: "常量",
            label: "常量",
          },
        ],
      });

      return {
        ...toRefs(data),
        maxJsonDialog,
        formList,
        show() {
          maxJsonDialog.value.init("可用条件", "icon-bianji");
          maxJsonDialog.value.show();
        },
        deleteRow(index, tableIndex) {
          data.andData[tableIndex].splice(index, 1);
        },
        getTypeIsChange(index, tableIndex) {
          const nowRow = data.andData[tableIndex][index];
          return !!nowRow.type;
        },
        getRules(value) {
          return {
            value: data.typeList.find((item) => {
              return item.value == value;
            })?.rule,
          };
        },
        async onAddItem(index) {
          let isValidated = true;
          if (formList.value?.length > 0) {
            for (let i = 0; i < formList.value.length; i++) {
              const item = formList.value[i];
              await item.validate((valid) => {
                if (valid) {
                console.log("submit!");
              } else {
                isValidated = false;
                console.log("error submit!");
                return false;
              }
              });
              
            }
          }
          if (!isValidated) {
            proxy.$Flex.open("条件校验失败,请补充完整", "失败", "error");
            return;
          }
          if(formList.value?.length != data.andData[index].length && data.andData[index].length >0){
            proxy.$Flex.open("内容补充完整再新增", "失败", "error");
            return;
          }
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
              const data = tabData.filter((item) => {
                if (item.field) {
                  return item;
                }
              });
              if (data.length > 0) {
                return data;
              }
            })
            .filter((item) => {
              return !!item;
            });
          props.data[props.item.data.fieldName] = andData;
        },
      };
    },
  });
</script>
<style scoped lang="scss">
  .maxJsonDialog {
    :deep(.MyDialogBody) {
      height: 70% !important;
    }
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
  }
</style>
