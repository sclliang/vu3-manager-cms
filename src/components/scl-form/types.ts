type IFormType = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  filed: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
}
export interface IForm {
  formItem: IFormItem
  lableWidth?: string
  colLayout?: any
  itemLayout?: any
}
