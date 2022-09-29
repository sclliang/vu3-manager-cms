<template>
  <div class="login-account-container">
    <el-form label-width="70px" :rules="rules" ref="formRef" :model="account">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="account.mobile"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="code">
          <el-input v-model="account.code" show-password></el-input>
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { FormRules } from 'element-plus'
import { ref } from 'vue'

const account = ref({
  mobile: '',
  code: ''
})
const rules: FormRules = {
  mobile: [
    {
      required: true,
      message: '手机号不能为空',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur'
    }
  ]
}
</script>
<style lang="less" scoped>
.login-account-container {
  .code {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      margin-left: 8px;
    }
  }
}
</style>
