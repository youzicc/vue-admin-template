import Vue from 'vue'
import App from './App.vue'
import '@/icons'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './router/permission'
import '@/styles/index.scss' //global css
import axios from 'axios'
import store from './store'
import qs from 'qs';
// import Host from './api/http';


Vue.use(Element)
Vue.use(store)
Vue.prototype.$axios = axios//axios不支持vue.use,可以添加原型使用
Vue.prototype.$qs = qs
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')
