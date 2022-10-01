import { Module } from 'vuex'
import { IRootState, ISystemState } from '@/store/type'
import { getPageListData } from '@/service/main/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: () => ({
    userList: [],
    userCount: 0
  }),
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    }
  },
  actions: {
    async getPageListAction({ commit }, paylod: any) {
      const pageResult = await getPageListData(paylod.pageUrl, paylod.queryInfo)
      const { list, totalCount } = pageResult.data.data
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemModule
