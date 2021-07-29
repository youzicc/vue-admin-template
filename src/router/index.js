import Vue from 'vue'
import VueRouter from "vue-router"
import { defaultRouter } from './routers'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

export default new VueRouter({
  routes: defaultRouter,
  mode: 'hash',
  base: process.env.BASE_URL
})

