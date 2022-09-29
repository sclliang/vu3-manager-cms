import type { FormRules } from 'element-plus'
export const rules: FormRules = {
  name: [
    {
      required: true,
      message: '账户名不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5-10为数字或字母',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 15,
      message: '密码长度必须在6-15位',
      trigger: 'blur'
    }
  ]
}
