<template>
  <div
    class="editor_pages_right"
    :class="
      moduleIsHidden
        ? 'editor_pages_right_visible'
        : 'editor_pages_right_hidden'
    "
  >
    <div class="editor_right_accept" @click="handleEditBtn">
      <i
        class="iconfont icon-jiantou_xiangyouliangci"
        :class="
          moduleIsHidden
            ? 'icon-jiantou_xiangyouliangci'
            : 'icon-jiantou_xiangzuoliangci'
        "
      ></i>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    // 该模块是否隐藏 默认显示
    let moduleIsHidden = ref(true);
    let handleEditBtn = () => {
      moduleIsHidden.value = !moduleIsHidden.value;
    };
    return {
      moduleIsHidden,
      handleEditBtn,
    };
  },
});
</script>
<style lang="scss" scoped>
.editor_pages_right {
  width: 318px;
  height: 100%;
  position: fixed;
  right: 0;
  top: $editor_header_top;
  background: yellow;
  transition: all 0.5s ease-in-out 0s;
  &.editor_pages_right_visible {
    right: 0;
  }
  &.editor_pages_right_hidden {
    right: -318px;
  }
  .editor_right_accept {
    width: 20px;
    height: 80px;
    background: #fff;
    box-shadow: -2px 0 4px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    right: 304px;
    top: 50%;
    cursor: pointer;
    position: absolute;
    left: -20px;
  }
}
</style>
