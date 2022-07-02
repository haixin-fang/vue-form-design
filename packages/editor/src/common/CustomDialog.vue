<template>
  <div class="MyDialogFrame" v-if="isshow || showDialog">
    <div class="MyDialogBody" :class="[{ fullscreen: isFullScreen }, dialogclass]"  :style="`width: ${width}px`">
      <div class="pageContent" style="height: 100%; padding: 0; overflow: hidden; background-color: transparent">
        <el-container class="my-pageContainer">
          <el-header class="my-pageHeader" style="height: 45px">
            <div class="my-icon">
              <em class="iconfont" :class="icon"></em>
            </div>
            <div class="my-title">{{ title }}</div>
            <div class="my-toolbar">
              <el-button class="my-toolbtn" @click="isFullScreen = !isFullScreen">
                <em class="iconfont icon" :class="{ 'icon-suoxiao1': isFullScreen, 'icon-quanping': !isFullScreen }"></em>
              </el-button>
              <el-button class="my-toolbtn" @click="close">
                <em class="iconfont icon-guanbi"></em>
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
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    props: {
      dialogclass: String,
      showDialog: Boolean,
      width: Number
    },
    setup(props, { emit }) {
      const isshow = ref<boolean>(false);
      const title = ref<string>("");
      const icon = ref<string>("");
      const isFullScreen = ref<boolean>(false);
      return {
        isshow,
        title,
        icon,
        isFullScreen,
        init(titles: string, icons: string) {
          title.value = titles;
          icon.value = icons;
        },
        show() {
          isshow.value = true;
          emit("open");
        },
        close() {
          isshow.value = false;
          emit("close");
        },
      };
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
      width: 100%;
      height: 100%;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      z-index: 5;
    }
    .fullscreen{
      width: 100% !important;
      height: 100% !important;
    }

    .myDialogMask {
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 4;
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
      color: #03a9f4;
      border-radius: 50%;
      text-align: center;
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
