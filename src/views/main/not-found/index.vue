<template>
  <div class="Err-container">
    <h2>您访问的页面不存在~</h2>
    <el-button type="primary" @click="gotoHome">点击可回到主页</el-button>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const gotoHome = () => {
  router.push('/')
}
</script>
<style lang="less" scoped>
.Err-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: cadetblue;
}
</style>
