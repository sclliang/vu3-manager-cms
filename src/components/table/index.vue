<!-- table表格组件 -->
<template>
  <div>
    <div class="header-box">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      @selection-change="handleSelectionChange"
      :data="listData"
      style="width: 100%"
      border
    >
      <!-- 是否显示选择框 -->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <!-- 是否显示序号 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="60"
      ></el-table-column>

      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center">
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">{{
              scope.row[item.prop || '']
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer-box">
      <slot name="footer">
        <!-- 分页器 -->
        <el-pagination
          v-model:currentPage="currentPage"
          :page-size="pageSize"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, PropType, defineEmits, ref } from 'vue'
import { propsType } from './type'
defineProps({
  // 表格数据
  listData: {
    type: Array,
    required: true
  },
  // 表格表头显示配置信息
  propList: {
    type: Array as PropType<propsType[]>,
    required: true
  },
  // 是否显示序号
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  // 是否显示选择框
  showSelectColumn: {
    type: Boolean,
    default: false
  },
  // 表格标题
  title: {
    type: String,
    default: ''
  },
  // 每页显示多少条数据
  pageSize: {
    type: Number,
    default: 10
  }
})
// 复选框选中事件,value是所有选中框的值
const emit = defineEmits([
  'handleSelectionChange',
  'handleSizeChange',
  'handleCurrentChange'
])
const handleSelectionChange = (value: any) => {
  emit('handleSelectionChange', value)
}

/**
 * 分页器属性与事件
 */
// 选中的页码
const currentPage = ref(1)
// 是否小图标显示分页器
const small = ref(false)
// 是否为分页器添加背景
const background = ref(false)
// 是否禁用分页器
const disabled = ref(false)

// 每页显示多少数据事件，
const handleSizeChange = (val: number) => {
  emit('handleSizeChange', val)
  console.log(val)
}
// 页码切换事件，val是当前选中页码
const handleCurrentChange = (val: number) => {
  emit('handleCurrentChange', val)
}
</script>
<style lang="less" scoped>
.header-box {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
.footer-box {
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 20px 0;
}
</style>
