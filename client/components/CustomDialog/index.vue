<template>
  <div class="MyDialogFrame" v-if="isshow || showDialog">
    <div
      class="MyDialogBody"
      :class="[{ fullscreen: isFullScreen }, dialogclass]"
    >
      <div
        class="pageContent"
        style="
          height: 100%;
          padding: 0;
          overflow: hidden;
          background-color: transparent;
        "
      >
        <el-container class="my-pageContainer">
          <el-header class="my-pageHeader" style="height: 45px">
            <div class="my-icon">
              <em class="iconfont" :class="icon"></em>
            </div>
            <div class="my-title">{{ title }}</div>
            <div class="my-toolbar">
              <el-button
                class="my-toolbtn"
                @click="isFullScreen = !isFullScreen"
              >
                <em
                  class="icon-quanping iconfont icon"
                  :class="{ 'icon-suoxiao': isFullScreen }"
                ></em>
              </el-button>
              <el-button class="my-toolbtn" @click="close">
                <em class="el-icon-close icon"></em>
              </el-button>
            </div>
          </el-header>
          <slot></slot>
        </el-container>
      </div>
    </div>
    <div class="myDialogMask"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    dialogclass: String,
    showDialog: Boolean
  },
  data() {
    return {
      isshow: false,
      title: "",
      icon: "",
      isFullScreen: false,
    };
  },
  methods: {
    init(title: string, icon: string) {
      this.title = title;
      this.icon = icon;
    },
    show() {
      this.isshow = true;
      this.$emit("open");
    },
    close() {
      this.isshow = false;
      this.$emit("close");
    },
  },
});
</script>
<style scoped lang="scss">
.MyDialogFrame {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 2000;

  .MyDialogBody {
    width: 80%;
    height: 90%;
    position: fixed;
    left: 10%;
    top: 5%;
    // transform: translate(-50%, -50%);
    // -webkit-transform: translate(-50%, -50%);
    z-index: 2;
  }

  .myDialogMask {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
}

.my-pageContainer {
  background-color: #fff;
  border: 1px solid #e4e7ed;
  height: 100%;
  border-radius: 3px;
  overflow: hidden;

  .my-pageHeader {
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #ebeef5;
    background-color: #f8f8f8;
    padding-left: 10px;
    padding-right: 10px;
  }

  .my-pageMain {
    padding: 0;
  }

  .my-icon {
    float: left;
    width: 30px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    color: white;
    border-radius: 50%;
    text-align: center;
    background-color: #03a9f4;
    position: relative;
    top: 6px;
    font-size: 14px;
  }

  .my-title {
    float: left;
    margin-left: 5px;
  }

  .my-toolbar {
    float: right;
  }

  .my-toolbtn {
    background-color: transparent;
    border: 0;
    padding: 0;
    line-height: 48px;
    overflow: hidden;

    .icon {
      font-size: 20px;
    }
  }

  .my-toolbtn:hover,
  .my-toolbtn:focus {
    color: #333;
  }

  .my-toolbtn:hover {
    transform: scale(1.3);
  }

  .my-Footer {
    text-align: right;
    padding-top: 3px;
    border-top: 1px solid #ebeef5;
  }
}
</style>