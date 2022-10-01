<template>
  <div class="nav-menu-container">
    <div class="logo">
      <img src="@/assets/logo.png" class="icon-logo" />
      <span class="title" v-if="!isCollapse">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="currentRoute"
      background-color="#304542"
      active-text-color="#ffd04b"
      text-color="#fff"
      router
      :collapse="isCollapse"
      :collapse-transition="false"
      class="menu-box"
      unique-opened
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.url">
            <template #title>
              <el-icon v-if="item.icon"
                ><component
                  :is="item.icon.split('-').slice(2).join('-')"
                ></component
              ></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.url">{{
                subItem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.url">{{ item.name }}</el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
const store = useStore()
const userMenus = computed(() => {
  return store.state.login.userMenus
})
// 动态计算当前路由地址currentRoute
const route = useRoute()
const currentRoute = computed(() => {
  return route.fullPath
})
defineProps({
  isCollapse: {
    type: Boolean,
    required: true
  }
})
</script>
<style lang="less" scoped>
.nav-menu-container {
  .menu-box {
    transition: all 10ms;
    border-right: none;
  }
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    .icon-logo {
      height: 30px;
      width: 30px;
    }
    .title {
      color: #fff;
      margin-left: 10px;
    }
  }
}
</style>
