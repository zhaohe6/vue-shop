import Vue from 'vue'
import 'ant-design-vue/dist/antd.css'
import antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from '../node_modules/element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import axios from 'axios'
// 将axios挂在到Vue的原型上
Vue.prototype.$http = axios
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8899'
Vue.use(ElementUI)
Vue.use(router)
Vue.use(antd)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
