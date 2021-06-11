import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  // data
  state: {
    drawer: false,
  },
  // methods
  mutations: {
    drawerFn (state) {
      state.drawer = !state.drawer;
    }
  },
  // 异步方法
  actions: {
  },
  // 模块
  modules: {
  }
})
