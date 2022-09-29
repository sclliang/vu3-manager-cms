<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '210px'"
        ><nav-menu :isCollapse="isCollapse"></nav-menu
      ></el-aside>
      <el-container class="page">
        <el-header height="45px" class="page-header">
          <nav-header
            :isCollapse="isCollapse"
            @changeIscollapse="changeIscollapse"
          ></nav-header>
        </el-header>
        <el-main class="page-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import navMenu from '@/layout/navMenu/index.vue'
import navHeader from '@/layout/navHeader/index.vue'
import { ref } from 'vue'
const isCollapse = ref(false)
const changeIscollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>
<style lang="less" scoped>
.common-layout {
  height: 100%;
  /deep/ .el-container {
    height: 100%;
    // 清楚菜单展开后的滚轮
    .el-aside::-webkit-scrollbar {
      display: none;
    }
    .el-aside {
      background-color: #304542;
      /* 加过渡给侧边导航*/

      transition: width 0.25s;
      -webkit-transition: width 0.25s;
      -moz-transition: width 0.25s;
      -webkit-transition: width 0.25s;
      -o-transition: width 0.25s;
    }
    .page {
      .page-header {
        background-color: #fff;
        display: flex;
        align-items: center;
      }
      .page-main {
        background-color: #eef0f4;
      }
    }
  }
}
</style>
