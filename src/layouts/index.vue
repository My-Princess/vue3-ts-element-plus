<template>
  <div class="app-wrapper">
    <div class="drawer-bg"></div>
    <Sidebar></Sidebar>
    <div class="main-container">
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Sidebar} from "./components/index"
</script>
<style lang="less" scoped>
.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: @sideBarWidth;
  position: relative;
  background: pink;
}
</style>
