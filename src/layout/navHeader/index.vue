<template>
  <div class="nav-header-container">
    <div class="nav-left">
      <!-- 面包屑，控制左侧菜单伸展 -->
      <el-icon :size="30" class="icon" @click="handleFoldClick">
        <component :is="isCollapse ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
      <!-- <el-icon></el-icon> -->
    </div>
    <div class="nav-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            size="small"
            class="avatar"
          ></el-avatar>
          <span> sclliang</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="CircleCloseFilled" @click="logout"
              >退出登录</el-dropdown-item
            >
            <el-dropdown-item icon="User" divided>用户信息</el-dropdown-item>
            <el-dropdown-item icon="Setting">系统管理</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { computed, defineEmits, defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import breadcrumb from '@/components/breadcrumb/index.vue'
// import { IBreadcrumb } from '@/components/breadcrumb/type'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
defineProps({
  isCollapse: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['changeIscollapse'])
const handleFoldClick = () => {
  emit('changeIscollapse')
}
const store = useStore()
const router = useRouter()
const logout = () => {
  store.commit('login/delToken')
  router.push('/login')
  ElMessage({
    message: '退出登录成功',
    type: 'success'
  })
}

// 面包屑
const route = useRoute()

const breadcrumbs = computed(() => {
  const userMenus = store.state.login.userMenus
  const currentPath = route.path
  return pathMapBreadcrumbs(userMenus, currentPath)
})
</script>
<style lang="less" scoped>
.nav-header-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    cursor: pointer;
    &:hover {
      background-color: rgb(209, 204, 204);
    }
  }
  .nav-left {
    display: flex;
    align-items: center;
  }
  .nav-right {
    .el-dropdown-link {
      cursor: pointer;
      display: flex;
      align-items: center;
      .avatar {
        vertical-align: top;
      }
    }
  }
}
</style>
