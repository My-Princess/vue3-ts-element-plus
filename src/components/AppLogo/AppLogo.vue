<template>
  <div class="anticon vtvp-app-logo">
    <img src="@/assets/images/logo.png" />
    <div  class="vtvp-app-logo_title ml-2 truncate md:opacity-100">vtvp-admin</div>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-app-logo";
.@{prefix-cls} {
  display: flex;
  align-items: center;
  padding-left: 7px;
  cursor: pointer;
  transition: all 0.2s ease;


}
</style>
