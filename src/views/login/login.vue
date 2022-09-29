<template>
  <div class="login-container">
    <login-panel-vue></login-panel-vue>
  </div>
</template>
<script lang="ts" setup>
import loginPanelVue from './cpns/login-panel.vue'
</script>
<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('@/assets/img/login-bg.svg');
}
</style>
