<template>
  <div class="login-panel-container">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label
          ><span class="user-login-title">
            <el-icon><UserFilled /></el-icon><span>账号登录</span>
          </span>
        </template>
        <LoginAccount ref="accountRef"></LoginAccount
      ></el-tab-pane>
      <el-tab-pane name="phone">
        <template #label
          ><span class="mobile-login-title">
            <el-icon><Iphone /></el-icon>手机登录
          </span>
        </template>
        <LoginPhone></LoginPhone
      ></el-tab-pane>
    </el-tabs>
    <div class="checkNum">
      <el-checkbox v-model="checkPwd" label="记住密码" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" @click="handleLoginClick" class="login-btn"
      >立即登录</el-button
    >
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
// 登录表单组件ref,获取组件ref类型通用方式
const accountRef = ref<InstanceType<typeof LoginAccount>>()
// 当前选中标签时手机登录还是账户名登录
const currentTab = ref('account')
// 记住密码
const checkPwd = ref<boolean>(true)

// 立即登录点击事件
const handleLoginClick = () => {
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(checkPwd.value)
  } else {
    console.log(currentTab.value)
  }
}
</script>
<style lang="less" scoped>
.login-panel-container {
  .login-btn {
    width: 100%;
  }
  .checkNum {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  h1 {
    text-align: center;
  }
  width: 300px;
  .user-login-title {
    .el-icon {
      margin-right: 5px;
    }
  }
  .mobile-login-title {
    .el-icon {
      margin-right: 5px;
    }
  }
}
</style>
