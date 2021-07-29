import store from "./index"
import router from "../router/index"
export default {
  state: {
    info: ""
  },
  mutations: {
    getInfo (state, info) {
      state.info = info
      localStorage.setItem("info", JSON.stringify(store.getters.info))

    },
    setRole (state, options) {
      state.info = {
        role: options.role,
        permissions: options.permissions
      }
      localStorage.setItem("info", JSON.stringify(store.getters.info))
      store.dispatch("newRoutes", options.role)
      router.addRoutes(store.getters.addRouters)
    }
  },
  actions: {
    getInfo ({ commit }, token) {
      commit("getInfo", token)
    },
    setRole ({ commit }, options) {
      // 权限测试
      commit("setRole", options)
    }
  }
}
