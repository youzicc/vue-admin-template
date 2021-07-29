import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import routerData from "./routerData"
import role from "./role"
import jsencrypt from '@/api/jsencrypt'
Vue.use(Vuex)
export function encryptData (getPublicKey, data) {
  let encrypt = new jsencrypt();
  encrypt.setPublicKey(getPublicKey);
  return encrypt.encrypt(data);
}
let keys = 'MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAZ6fWmvB3y4TDZnlQEt62ig7A565VTC09eqs27NVMP8WvmH2j1pUG3hanJ+JHd5/Mj12KmYlDs7ENGsTHp7P0awIDAQAB'
const state = {
  isCollapse: false,
  logoShow: false,
  token: Cookies.get('token'),// 刷新页面或者在新标签页打开，从cookie获取初始token
  uniquerouter: true,
  rightNav: {},
  tabnavBox: JSON.parse(sessionStorage.getItem("addTab")) || [{
    title: "工作台",
    path: "/index"
  }]
}
const getters = {
  logoShow: state => state.logoShow,
  isCollapse: state => state.isCollapse,
  routers: state => state.routerData.routers,
  info: state => state.role.info,
  token: state => state.token,
  uniquerouter: state => state.uniquerouter,
  tabnavBox: state => state.tabnavBox,
  addRouters: state => state.routerData.addRouters,
}
const mutations = {
  setToken (state, token) {
    state.token = token
    Cookies.set('token', token, { expires: 1 / 24 });
    // state.token = encryptData(keys, token.strCache)
    // var dataToken = new Date(token.expriseTime)
    // Cookies.set('token', state.token, { expires: dataToken })
  },
  collapse (state, arg) {
    state.isCollapse = !state.isCollapse
    if (state.logoShow) {
      setTimeout(function () {
        state.logoShow = false
      }, 300)
    } else {
      state.logoShow = true
    }
  },
  addTab (state, arg) {
    state.isActive = arg.path
    if (state.tabnavBox[0] && state.tabnavBox[0].title !== "工作台") {
      state.tabnavBox.unshift({
        title: "工作台",
        path: "/index"
      })
    }

    for (let i = 0; i < state.tabnavBox.length; i++) {
      if (state.tabnavBox[i].path === arg.path) {
        return false
      }
    }
    state.tabnavBox.push({
      title: arg.title,
      path: arg.path
    })
    sessionStorage.setItem("addTab", JSON.stringify(state.tabnavBox))
  },
  openMenu (state, arg) {
    state.rightNav = arg
  },
  removeTab (state, arg) {
    let index = state.tabnavBox.findIndex(function (value, key) {
      return value.path === arg.tabItem.path
    })
    state.tabnavBox.splice(index, 1)
    if (arg.tabItem.path === arg.fullPath) {
      let tabActive = state.tabnavBox[index] || state.tabnavBox[index - 1]
      arg.router.push(tabActive.path)
    }
    sessionStorage.setItem("addTab", JSON.stringify(state.tabnavBox))
  },
  removeOtherTab (state, arg) {
    state.tabnavBox = [{
      title: "工作台",
      path: "/index"
    }]
    if (arg.all) {
      arg.router.push("/index")
      return false
    }
    state.tabnavBox.push(arg.tabItem)
    arg.router.push(arg.tabItem.path)
    sessionStorage.setItem("addTab", JSON.stringify(state.tabnavBox))
  },
}
const actions = {
  setToken ({ commit }, token) {
    return new Promise((resolve, reject) => {
      commit('setToken', token)
      resolve()
    })
  },
  collapse ({ commit }, arg) {
    commit("collapse", arg)
  },
  addTab ({ commit }, arg) {
    commit("addTab", arg)
  },
  openMenu ({ commit }, arg) {
    commit("openMenu", arg)
  },
  removeTab ({ commit }, arg) {
    commit("removeTab", arg)
  },
  removeOtherTab ({ commit }, arg) {
    commit("removeOtherTab", arg)
  },
}
const modules = {
  routerData,
  role
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
