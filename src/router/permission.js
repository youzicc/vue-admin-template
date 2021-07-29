import router from "./index"
import store from "../store/index"

//  获取角色信息，根据用户权限动态加载路由
router.beforeEach((to, from, next) => {
  // 判断是否有token
  if (store.getters.token) {
    if (to.path === "/login") {
      next({ path: "/" })
    } else {
      if (!store.getters.info) {
        // 省略 axios 请求代码 通过 token 向后台请求用户权限等信息，这里用假数据赋值
        !(async function getAddRouters () {
          await store.dispatch("getInfo", {
            role: "admin",
            permissions: "超级管理员"
          })
          await store.dispatch("newRoutes", store.getters.info.role)
          let newAddRouters = store.getters.addRouters
          await router.addRoutes(newAddRouters)
          next({ path: to.path })
        }())
        // let newAddRouters = store.getters.addRouters
        // console.log(store.getters.addRouters, 55555)
        // router.addRoutes(newAddRouters)
        // next({ path: to.path })
      }
      else {
        let is404 = to.matched.some(record => {
          if (record.meta.roles) {
            return record.meta.roles.indexOf(store.getters.info.role) === -1
          }
        })
        if (is404) {
          next({ path: "/index" })
          return false
        }
        next()
      }
    }
  } else {
    // sessionStorage.removeItem("addTab");
    if (to.path === "/login") {
      next()
    }
    next({ path: "/login" })
  }
})

router.afterEach(() => {

})
