<template>
  <div class="login-account-container">
    <el-form label-width="60px" :rules="rules" ref="formRef" :model="account">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="account.password"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { defineExpose } from 'vue'
import { FormInstance } from 'element-plus'
import { rules } from '../config/account-config'
import { ref } from 'vue'
import LocalCache from '@/utils/cache'
import { useStore } from 'vuex'
const formRef = ref<FormInstance>()
const account = ref({
  name: LocalCache.getItem('name') || '',
  password: LocalCache.getItem('password') || ''
})
// 登录事件
const store = useStore()
const loginAction = (checkPwd: boolean) => {
  formRef.value?.validate((valid: boolean) => {
    // 验证通过
    if (valid) {
      // 是否记住密码
      if (checkPwd) {
        LocalCache.setItem('name', account.value.name)
        LocalCache.setItem('password', account.value.password)
      } else {
        LocalCache.removeItem('name')
        LocalCache.removeItem('password')
      }
      // 登录逻辑
      store.dispatch('login/accountLoginAction', account.value)
      console.log('验证通过')
    }
  })
}
// 向外暴露属性或者方法
defineExpose({
  loginAction
})
</script>
<style lang="less" scoped></style>
