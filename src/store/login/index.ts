import { Module } from 'vuex'
import { IRootState } from '../type'
import { ILoginState } from './type'
import { mapMenusToRoutes } from '@/utils/map-menus'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuById
} from '@/service/login/login'
import { IAccount } from '@/service/login/type'
import LocalCache from '@/utils/cache'
import router from '@/router'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => ({
    token: LocalCache.getItem('token') || '',
    userInfo: LocalCache.getItem('userInfo') || {},
    userMenus: LocalCache.getItem('userMenus') || []
  }),
  mutations: {
    setToken(state, token: string) {
      state.token = token
      LocalCache.setItem('token', token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setuserMenus(state, userMenus) {
      state.userMenus = userMenus
    },
    // 动态添加路由逻辑
    addRoute(state) {
      const routes = mapMenusToRoutes(state.userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    },
    delToken(state) {
      state.token = ''
      state.userInfo = {}
      state.userMenus = []
      LocalCache.removeItem('token')
      LocalCache.removeItem('userInfo')
      LocalCache.removeItem('userMenus')
    }
  },
  actions: {
    // 登录
    async accountLoginAction({ commit }, payload: IAccount) {
      const res = await accountLoginRequest(payload)
      const { id, token } = res.data.data
      commit('setToken', token)
      // 请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data.data
      commit('setUserInfo', userInfo)

      LocalCache.setItem('userInfo', userInfo)

      // 请求用户菜单
      const userMenuResult = await requestUserMenuById(id)
      const userMenus = userMenuResult.data.data
      commit('setuserMenus', userMenus)

      LocalCache.setItem('userMenus', userMenus)
      // 跳转到首页
      router.push('/main')
    }
  }
}
export default loginModule
