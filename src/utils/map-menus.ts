/* eslint-disable @typescript-eslint/no-var-requires */
// 将路由路径映射到路由数组
import { RouteRecordRaw } from 'vue-router'
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  //  1、加载所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // 加载router/main文件夹内所有以.ts结尾的文件，true表示递归查找
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2、根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    menus.forEach((menu) => {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => {
          return route.path === menu.url
        })

        if (route) {
          routes.push(route)
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    })
  }
  _recurseGetRoute(userMenus)
  return routes
}
