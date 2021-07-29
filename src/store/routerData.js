import { defaultRouter, addRouter } from "@/router/routers"

// import { LoadNavigationBar } from "@/api/api"
// export function generaMenu (routers, data) {
//   data.forEach(item => {
//     const getRouter = {
//       path: item.Url == null ? "/" : item.Url,
//       name: item.MenuName,
//       iconCls: 'el-icon-tickets',
//       component: item.Url == null || item.Componnet == 'Foo' ? Layout : () => import(`@/views/${item.Componnet}`),
//       children: [],
//     }
//     if (item.children !== null) {
//       generaMenu(getRouter.children, item.children)
//     }
//     routers.push(getRouter)
//   });
// }
const routerData = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    setRouters: (state, routers) => {
      state.addRouters = routers // 保存动态路由用来addRouter
      state.routers = defaultRouter.concat(routers) // 所有有权限的路由表，用来生成菜单列表
    }
  },
  actions: {
    newRoutes ({ commit }, role) {
      //  通过递归路由表，删除掉没有权限的路由
      function eachSelect (routers, userRole) {
        for (let j = 0; j < routers.length; j++) {
          if (routers[j].meta && routers[j].meta.roles.length && routers[j].meta.roles.indexOf(userRole) === -1) {
            routers.splice(j, 1)
            j = j !== 0 ? j - 1 : j
          }
          if (routers[j].children && routers[j].children.length) {
            eachSelect(routers[j].children, userRole)
          }
        }
      }

      // return new Promise(resolve => {
      //   LoadNavigationBar().then((res) => {
      //     if (res.data.StatusCode == 'Ok') {
      //       const resList = res.data.Data.list
      //       generaMenu(addRouter, resList)
      //       eachSelect(addRouter, role)
      //       commit('setRouters', addRouter)
      //       resolve(addRouter)
      //     }
      //   })
      // })
      // 仅限演示
      let newArr = [...addRouter] // 拷贝这个数组是因为做权限测试的时候可以从低级切回到高级角色，仅限演示，正式开发时省略这步直接使用 addRouter
      eachSelect(newArr, role)
      commit("setRouters", newArr)

      // 正式开发
      // eachSelect(addRouter, role)
      // commit('setRouters', addRouter)
    }
  }
}
export default routerData
