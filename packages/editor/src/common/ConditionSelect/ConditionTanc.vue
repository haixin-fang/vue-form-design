<template>
  <teleport to="body">
    <CustomDialog ref="maxJsonDialog" class="maxJsonDialog">
      <el-main style="padding: 0">
        <el-container style="height: 100%">
          <el-main class="my-pageMain">
            <el-table :data="table" style="width: 100%" border>
              <el-table-column prop="field" label="字段">
                <template #default="scope">
                  <el-select v-model="scope.row.field" placeholder="请选择">
                    <el-option :label="'未选择'" :value="''"></el-option>
                    <el-option v-for="(item, index) in fieldList" :key="index" :label="item.label" :value="item.value"> </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="logic" label="逻辑">
                <template #default="scope">
                  <el-select v-model="scope.row.logic" placeholder="请选择">
                    <el-option v-for="item in getLogic()" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="值类型">
                <template #default="scope">
                  <el-select v-model="scope.row.type" placeholder="请选择" @change="handleType">
                    <el-option v-for="item in newtypeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="值">
                <template #default="scope">
                  <el-form :model="scope.row" :rules="getRules(scope.row.type)" v-if="getTypeIsChange(scope.$index, index)" ref="formList">
                    <el-form-item prop="value">
                      <el-input text v-model="scope.row.value" />
                    </el-form-item>
                  </el-form>
                  <el-select v-model="scope.row.value" filterable placeholder="请选择" v-if="scope.row.type == '选项'" :multiple="getMultiple()">
                    <el-option :label="'未选择'" :value="''"></el-option>
                    <el-option v-for="(item, index) in getFiled()" :key="index" :label="item.label" :value="item.value"> </el-option>
                  </el-select>
                  <el-switch v-model="scope.row.value" :active-icon="Check" :inactive-icon="Close" v-if="scope.row.type == '布尔'" />
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">
                  <el-button size="small" type="danger" @click.prevent="deleteRow(scope.$index, index)"> 删除 </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button class="mt-4" text @click="onAddItem" v-if="table.length == 0" style="width: 100%">+条件</el-button>
          </el-main>
          <el-footer class="my-Footer" style="height: 60px; padding-top: 10px">
            <el-button type="primary" @click="saveJson">保存</el-button>
            <el-button @click="closeDialog">关闭</el-button>
          </el-footer>
        </el-container>
      </el-main>
    </CustomDialog>
  </teleport>
</template>
<script >
  export default {
    props: {
      fieldList: {
        type: Object,
        default() {
          return {};
        },
      },
      data: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    data() {
      return {
        table: [],
        groupSelect: [
          {
            value: "andgroup",
            label: "+并组",
          },
          {
            value: "orgroup",
            label: "+或组",
          },
          {
            value: "data",
            label: "条件",
          },
        ],
        logicList: [
          { value: "=", label: "等于" },
          { value: "!=", label: "不等于" },
        ],
        typeList: [
          {
            rule: [],
            value: "常量",
            label: "常量",
          },
          // {
          //   rule: [],
          //   value: "字段",
          //   label: "字段",
          // },
          // {
          //   rule: [],
          //   value: "请求参数",
          //   label: "请求参数",
          // },
        ],
      };
    },
    computed: {
      newtypeList() {
        const item = this.fieldList.find((item) => {
          if (this.table && this.table.length > 0) {
            if (item.value == this.table[0].field) {
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
        return this.typeList;
        // const newtypelist = this.typelist.map((item) => {
        //   return {
        //     rule: [],
        //     value: item.value,
        //     label: item.value,
        //   };
        // });
        // return this.typeList.concat(newtypelist);
        // return this.typeList.filter((item) => {
        //   if (item.value == "字段") {
        //     if (this.rightField && this.rightField.length > 0) {
        //       return item;
        //     }
        //   } else {
        //     return item;
        //   }
        // });
      },
    },
    methods: {
      handleType(type) {
        if(type == '布尔'){
          this.table[0].value = true;
        }
      },
      getFiled() {
        if (!this.table[0] || !this.table[0].field) return [];
        const item = this.fieldList.find((item) => {
          if (this.table && this.table.length > 0) {
            if (item.value == this.table[0].field) {
              return item;
            }
          }
        });
        return item.options || [];
      },
      getMultiple() {
        const item = this.fieldList.find((item) => {
          if (this.table && this.table.length > 0) {
            if (item.value == this.table[0].field) {
              return item;
            }
          }
        });
        return !!item.multiple;
      },
      getLogic() {
        const item = this.fieldList.find((item) => {
          if (this.table && this.table.length > 0) {
            if (item.value == this.table[0].field) {
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
        return this.logicList;
      },
      show(data) {
        this.$refs.maxJsonDialog.init("可用条件", "icon-bianji");
        this.$refs.maxJsonDialog.show();
        if (Object.keys(data).length > 0) {
          this.table = [data];
        }
      },
      onAddItem() {
        this.table.push({
          field: "",
          logic: "",
          type: "",
          value: "",
        });
      },
      getTypeIsChange(index) {
        const nowRow = this.table[index];
        return !!nowRow.type && nowRow.type == "常量";
      },
      getRules(value) {
        return {
          value: this.typeList.find((item) => {
            return item.value == value;
          })?.rule,
        };
      },
      closeDialog() {
        this.$refs.maxJsonDialog.close();
      },
      deleteRow() {
        this.table = [];
      },
      async saveJson() {
        if (this.table.length > 0) {
          const data = this.table[0];
          if (!data.field) {
            this.$message.error("字段不能为空!");
            return;
          }
          if (!data.type) {
            this.$message.error("请选择值类型!");
            return;
          }
          if (data.type && data.type == "选项" && !data.value) {
            this.$message.error("值类型为字段时值不能为空!");
            return;
          }
          for (const key in this.table[0]) {
            this.data[key] = this.table[0][key];
          }
        } else {
          for (const key in this.data) {
            delete this.data[key];
          }
        }
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.closeDialog();
        this.$emit("end");
      },
    },
  };
</script>
<style scoped lang="scss">
  .my-pageMain {
    padding: 20px 50px !important;
  }
  :deep(.el-form) {
    .el-form-item {
      margin-bottom: 0;
    }
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
</style>
