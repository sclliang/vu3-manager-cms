<template>
  <div class="nav-header-container">
    <div class="nav-left">
      <!-- 面包屑，控制左侧菜单伸展 -->
      <el-icon :size="30" class="icon" @click="handleFoldClick">
        <component :is="isCollapse ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <el-breadcrumb class="crumb-box">
        <el-breadcrumb-item class="crumb-left">homepage</el-breadcrumb-item>
        <el-breadcrumb-item class="crumb-right" :to="{ path: '/' }"
          >promotion management</el-breadcrumb-item
        >
      </el-breadcrumb>
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
import { defineEmits, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

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
    .crumb-box {
      margin-left: 10px;
      .crumb-left {
        font-weight: bold;
        .el-breadcrumb__inner {
          color: #000;
        }
      }
      .crumb-right {
        color: #999;
      }
    }
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
