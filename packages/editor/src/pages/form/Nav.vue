<template>
  <div class="nav">
    <div class="logo">
      <div><span>starfish</span> 表单设计器</div>
      <!-- <iframe src="https://ghbtns.com/github-btn.html?user=haixin-fang&amp;repo=starfish-vue3-lowcode&amp;type=star&amp;count=true" frameborder="0" scrolling="0" width="160px" height="30px" style="vertical-align: middle; margin-top: 10px; margin-left: 10px"></iframe> -->
    </div>
    <div class="starfish-link">
      <a href="https://github.com/haixin-fang/starfish-vue3-lowcode" target="_black">GitHub</a>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  /**
   * 2022.7.1想到的优化点
   * 新增json导入导出功能
   */
  export default defineComponent({});
</script>
<style lang="scss" scoped>
  .nav {
    height: $editor_nav;
    display: flex;
    align-items: center;
    justify-content: space-between;
    -webkit-box-shadow: 0 2px 10px rgb(70 160 252 / 60%);
    box-shadow: 0 2px 10px rgb(70 160 252 / 60%);
    padding: 0 10px;
    background-image: -webkit-gradient(linear, left top, right top, from(#1278f6), to(#00b4aa));
    background-image: linear-gradient(to right, #1278f6, #00b4aa);
    position: relative;
    border-bottom: 1px solid #d8dee8;
    padding: 0 15px;
    .logo {
      font-size: 20px;
      color: white;
      font-weight: bold;
      display: flex;
      span {
        font-size: 30px;
      }
    }
    .starfish-link {
      a{
        color: #fff;
      text-decoration: none;
      font-size: 14px;
      line-height: 50px;
      font-weight: 500;
      margin-left: 15px;
      background: transparent;
      }
    }
  }
</style>
