<template>
  <div class="form-container">
    <div class="header">
      <slot name="header"> </slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row :gutter="70">
        <template v-for="item in formItem" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :style="itemStyle">
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :type="item.type"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.filed}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.filed}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.title"
                    :value="option.value"
                  ></el-option
                ></el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.filed}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  defineProps,
  defineExpose,
  defineEmits,
  PropType,
  ref,
  watch
} from 'vue'
import { IFormItem } from './types'
const props = defineProps({
  formItem: {
    type: Array as PropType<IFormItem[]>,
    default: () => {
      return []
    }
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  itemStyle: {
    type: Object,
    default: () => {
      return {
        padding: '10px 40px'
      }
    }
  },
  // ?????????????????????????????????
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  },
  // ????????????????????????
  modelValue: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])
const formData = ref({ ...props.modelValue })
watch(
  // ??????formaData?????????????????????????????????????????????????????????????????????????????????????????????
  formData,
  (newVal) => {
    emit('update:modelValue', newVal)
  },
  { deep: true }
)
const reset = () => {
  formData.value = { ...props.modelValue }
}
defineExpose({
  reset
})
</script>
<style lang="less" scoped>
.form-container {
  padding-top: 22px;
}
</style>
