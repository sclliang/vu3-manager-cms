<template>
  <div class="crumb-box">
    <el-breadcrumb spellcheck="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { IBreadcrumb } from './type'
import { defineProps, PropType } from 'vue'
defineProps({
  breadcrumbs: {
    type: Array as PropType<IBreadcrumb[]>,
    default: () => []
  }
})
</script>
<style lang="less" scoped>
.crumb-box {
  margin-left: 10px;
  /deep/ .el-breadcrumb {
    &:first-child {
      font-weight: bold;
      .el-breadcrumb__inner {
        color: #000;
        text-transform: capitalize;
        transition: all 0.1s;
      }
    }
  }
}
</style>
