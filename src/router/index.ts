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
    redirect: '/main/analysis/overview'
  },
  {
    path: '/main',
    name: 'main',
    // redirect: '/main/analysis/overview'
    component: () => import('@/views/main/index.vue')
    // children: []
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/main/not-found/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 导航守卫
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
