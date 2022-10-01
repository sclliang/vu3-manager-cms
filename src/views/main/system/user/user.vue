<template>
  <div class="user-container">
    <div class="search-box">
      <scl-form
        ref="sclRef"
        v-model="formData"
        :formItem="formItems"
        :label-width="labelWidth"
      >
        <template #footer>
          <div class="handle-btns">
            <el-button icon="RefreshLeft" @click="reset">重置</el-button>
            <el-button type="primary" icon="Search">搜索</el-button>
          </div>
        </template>
      </scl-form>
    </div>
    <div class="content">
      <table-vue
        :list-data="userList"
        :prop-list="propList"
        :showIndexColumn="showIndexColumn"
        :showSelectColumn="showSelectColumn"
        title="用户列表"
        @handle-current-change="handleCurrentChange"
        @handle-size-change="handleSizeChange"
      >
        <template #headerHandler>
          <el-button type="primary" icon="plus">新增用户</el-button>
        </template>
        <template #status="scope">
          <el-button
            size="small"
            :type="!scope.row.enable ? 'success' : 'danger'"
            >{{ !scope.row.enable ? '启用' : '禁用' }}</el-button
          >
        </template>
        <template #createAt="scope">
          {{ formatTime(scope.row.createAt) }}
        </template>
        <template #updateAt="scope">
          {{ formatTime(scope.row.updateAt) }}
        </template>
        <template #handler>
          <div class="handler-box">
            <el-button type="primary" size="small" icon="edit"></el-button>
            <el-button type="danger" size="small" icon="delete"></el-button>
          </div>
        </template>
      </table-vue>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { formatTime } from '@/utils/auth'
import SclForm from '@/components/scl-form/index.vue'
import { IFormItem } from '@/components/scl-form/types'
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import tableVue from '@/components/table/index.vue'
import { propsType } from '@/components/table/type'
const store = useStore()
/**
 *
 * 表单数据
 */

// 表单配置数据
const formItems: IFormItem[] = [
  {
    filed: 'id',
    label: 'id',
    type: 'input',
    placeholder: '请输入id'
  },
  {
    filed: 'name',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名'
  },
  {
    filed: 'password',
    label: '密码',
    type: 'password',
    placeholder: '请输入密码'
  },
  {
    filed: 'sport',
    label: '喜欢的运动',
    type: 'select',
    placeholder: '请选择喜欢的运动',
    options: [
      {
        title: '篮球',
        value: 'basketball'
      },
      {
        title: '足球',
        value: 'football'
      }
    ]
  },
  {
    filed: 'createTime',
    label: '创建时间',
    type: 'datepicker',
    otherOptions: {
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      type: 'daterange'
    }
  }
]
// 表单绑定数据
const formData = ref({
  id: '',
  name: '',
  password: '',
  sport: '',
  createTime: ''
})
// 表单label宽度
const labelWidth = '120px'
// 表单ref
const sclRef = ref<InstanceType<typeof SclForm>>()
// 重置
const reset = () => {
  formData.value = {
    id: '',
    name: '',
    password: '',
    sport: '',
    createTime: ''
  }

  setTimeout(() => {
    sclRef.value?.reset()
  })
}

/**
 * 表格数据
 */
const pageSize = ref(10)
const currentPage = ref(0)
const getLoadData = () => {
  // 获取用户数据（用户列表）
  store.dispatch('system/getPageListAction', {
    pageUrl: '/users/list',
    queryInfo: {
      offset: currentPage.value,
      size: pageSize.value
    }
  })
}
getLoadData()

// 表格数据
const userList = computed(() => store.state.system.userList)
// const userCount = computed(() => store.state.system.userCount)
// 表格配置信息
const propList: propsType[] = [
  {
    prop: 'name',
    label: '用户名',
    minWidth: '100'
  },
  {
    prop: 'realname',
    label: '真实姓名',
    minWidth: '100'
  },
  {
    prop: 'cellphone',
    label: '手机号码',
    minWidth: '100'
  },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '100',
    slotName: 'createAt'
  },

  {
    prop: 'updateAt',
    label: '更新时间',
    minWidth: '100',
    slotName: 'updateAt'
  },
  {
    prop: 'enable',
    label: '状态',
    minWidth: '100',
    slotName: 'status'
  },
  {
    label: '操作',
    minWidth: '100',
    slotName: 'handler'
  }
]
// 是否在表单显示序号
const showIndexColumn = true
const showSelectColumn = true

/**
 * 分页器事件
 */
// 页码切换事件
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getLoadData()
}
const handleSizeChange = (val: number) => {
  pageSize.value = val
  getLoadData()
}
</script>
<style lang="less" scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
