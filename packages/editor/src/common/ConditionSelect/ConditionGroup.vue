<template>
  <div class="conditionSelect" :class="result.type">
    <!-- {{ result.type }} -->
    <div class="control" v-show="result.result && result.result.length > 0 && result.type !== 'data'">
      <span class="iconfont icon-jiahao" v-if="!result.control" @click="handleControl(true)"></span>
      <span class="iconfont icon-jianhao" v-else @click="handleControl(false)"></span>
    </div>
    <el-select v-model="result.type" placeholder="请选择" @change="onChange">
      <el-option v-for="item in groupSelect" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-button type="primary" @click="onAddItem" size="small" :disabled="!result.type || result.type == 'data'">增加条件</el-button>
    <el-button type="danger" @click="onDeleteItem" size="small">删除</el-button>
    <el-button type="primary" v-if="result.type == 'data'" @click="onEditData" size="small">编辑</el-button>
    <Transition>
      <div v-show="result.type && result.type !== 'data' && result.control" class="moreCondition">
        <div v-for="(item, index) in result.result" :key="index" class="selectList">
          <ConditionGroup :result="item" @update="handleUpdateForce" @delete="handleDelete" :index="index" :fieldList="fieldList" />
          <!-- :rightField="rightField"
          :request="request" -->
        </div>
        <div class="line" :class="result.type" v-if="result.result && result.result.length >= 2"></div>
      </div>
    </Transition>
    <div v-show="result.type && result.type == 'data'">
      <ConditionTanc ref="ConditionTanc" :data="result.data" :fieldList="fieldList" @end="handleUpdateForce"></ConditionTanc>
    </div>
  </div>
</template>
<script>
  import ConditionTanc from "./ConditionTanc.vue";
  export default {
    name: "ConditionGroup",
    components: {
      ConditionTanc,
    },
    props: {
      result: {
        type: Object,
        default() {
          return {};
        },
      },
      index: {
        type: Number,
        default: 0,
      },
      fieldList: {
        type: Array,
        default() {
          return [];
        },
      },
      rightField: {
        type: Array,
        default() {
          return [];
        },
      },

      request: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {
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
      };
    },
    watch: {
      result: {
        handler() {
          this.$forceUpdate();
        },
        deep: true,
      },
    },
    methods: {
      onAddItem() {
        if (!this.result.type) return;
        if (!this.result.result && this.result.type != "data") {
          this.result.result = [];
        }
        if (this.result.type == "data" && !this.result.data) {
          this.result.data = {};
        }
        this.result.control = true;

        switch (this.result.type) {
          case "orgroup":
            this.result.result.push({ type: "orgroup", result: [] });
            break;
          case "andgroup":
            this.result.result.push({ type: "andgroup", result: [] });
            break;
          case "data":
            this.result.result.push({ type: "data", data: {} });
            break;
        }
        this.handleUpdateForce();
      },
      handleControl(bool) {
        this.result.control = bool;
        this.handleUpdateForce();
      },
      onDeleteItem() {
        if (this.index == 0) {
          delete this.result.data
          delete this.result.result;
          delete this.result.type
          this.handleUpdateForce();
        } else {
          this.$emit("delete", this.index);
        }
      },
      handleDelete(index) {
        this.result.result.splice(index, 1);
        this.handleUpdateForce();
      },
      onChange(a) {
        this.result.type = a;
        if (a == "andgroup") {
          this.result.result = [];
          if (this.result.data) {
            delete this.result.data;
          }
        } else if (a == "orgroup") {
          this.result.result = [];
          if (this.result.data) {
            delete this.result.data;
          }
        } else {
          this.result.data = {};
          if (this.result.result) {
            delete this.result.result;
          }
          // this.$nextTick(() => {
          //   if (this.$refs.ConditionTanc) {
          //     this.$refs.ConditionTanc.show();
          //   }
          // });
        }
        this.handleUpdateForce();
      },
      handleUpdateForce() {
        this.$forceUpdate();
        this.$emit("update");
      },
      onEditData() {
        this.$refs.ConditionTanc.show(this.result.data);
      },
    },
  };
</script>
<style scoped lang="scss">
  .control {
    display: inline-block;
    position: absolute;
    left: -16px;
    top: 10px;
    font-size: 8px;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #b4bccc;
    box-sizing: border-box;
    color: #b4bccc;
  }
  .el-button {
    margin-left: 10px;
  }
</style>
