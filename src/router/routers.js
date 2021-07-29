import Login from '@/views/login/login'
import Layout from '@/views/layout/layout'
import Index from '@/views/index/index'
// component路由页面
const ButtonManagement = () => import('@/views/systemsetting/buttonManagement')
const MenuManagement = () => import('@/views/systemsetting/menuManagement')
const NotFound = () => import("@/views/page404")
// 静态路由
export const defaultRouter = [
  {
    path: '/',
    redirect: '/index',
    hidden: true,
    children: []
  },
  {
    path: '/login',
    component: Login,
    hidden: true,
    children: []
  },

  {
    path: '/index',
    iconCls: 'el-icon-menu',
    component: Layout,
    name: "工作台",
    alone: true,
    children: [
      {
        path: '/index',
        iconCls: 'fa fa-dashboard',
        name: '工作台',
        component: Index,
        children: []
      },
    ]
  },
  {
    path: "*",
    component: NotFound,
    name: "404",
    hidden: true,
    children: []
  }
]
// 动态(异步)路由(需要权限的页面)
export const addRouter = [
  {
    path: '/',
    iconCls: 'el-icon-s-tools',
    name: 'CRM',
    component: Layout,
    children: [
      {
        path: '/buttonManagement',
        name: '客户管理',
        component: ButtonManagement,
        children: []
      },
      {
        path: '/menuManagement',
        name: '渠道管理',
        component: MenuManagement,
        children: []
      },

    ]
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
    children: []
  }
]