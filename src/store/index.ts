import { createStore } from 'vuex'
import { IRootState } from './type'
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
