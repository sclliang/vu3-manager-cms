<template>
  <!-- element-plus国际化处理 -->
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import { ElConfigProvider } from 'element-plus'
</script>
<style lang="less"></style>
