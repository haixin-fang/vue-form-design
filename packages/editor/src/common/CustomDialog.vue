<template>
  <teleport to="body">
    <Transition name="fade">
      <div class="MyDialogFrame" v-if="isshow || showDialog">
        <div
          class="MyDialogBody"
          :class="[{ fullscreen: isFullScreen }, dialogclass]"
          :style="`width: ${newWidth}`"
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
                  <em class="iconfontui" :class="icon"></em>
                </div>
                <div class="my-title">{{ title }}</div>
                <div class="my-toolbar">
                  <el-button
                    class="my-toolbtn"
                    @click="isFullScreen = !isFullScreen"
                  >
                    <em
                      class="iconfontui icon"
                      :class="{
                        'icon-suoxiao1': isFullScreen,
                        'icon-quanping': !isFullScreen,
                      }"
                    ></em>
                  </el-button>
                  <el-button class="my-toolbtn" @click="close">
                    <em class="iconfontui icon-guanbi"></em>
                  </el-button>
                </div>
              </el-header>
              <slot></slot>
            </el-container>
          </div>
        </div>
        <div class="myDialogMask"></div>
      </div>
    </Transition>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  props: {
    dialogclass: String,
    showDialog: Boolean,
    width: Number,
  },
  emits: ["open", "close"],
  setup(props, { emit }) {
    const isshow = ref<boolean>(false);
    const title = ref<string>("");
    const icon = ref<string>("");
    const isFullScreen = ref<boolean>(false);
    const newWidth = computed(() => {
      if (typeof props.width == "number") {
        return props.width + "px";
      } else {
        return props;
      }
    });
    return {
      isshow,
      title,
      icon,
      isFullScreen,
      newWidth,
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
