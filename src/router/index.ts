import LocalCache from '@/utils/cache'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('@/views/main/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to) => {
  const token = LocalCache.getItem('token')
  if (token) {
    if (to.path === '/login') {
      return '/'
    }
  } else {
    if (to.path !== '/login') {
      return '/login'
    }
  }
})

export default router
