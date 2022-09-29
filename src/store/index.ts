import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import login from './login'

export default createStore<IRootState>({
  state: () => ({
    name: 'sclliang',
    age: 18
  }),
  getters: {},
  mutations: {},
  actions: {},
  modules: { login }
})
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
