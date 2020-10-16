import Vue from 'vue'
import Router from 'vue-router'
// 导入登录组件
import Login from './components/Login.vue'
// 导入home页面组件
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import User from './components/User.vue'
import Charactor from './components/Charactor.vue'
import practice from './components/practice.vue'
Vue.use(Router)
export default new Router({
  routes: [
    //   当我访问login路径时候，就会调用Login组件
    { path: '/login', component: Login },
    // 重定向
    { path: '/', redirect: '/login' },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/user', component: User }
      ]
    },
    {
      path: '/home',
      component: Home,
      redirect: '/charactor',
      children: [
        { path: '/charactor', component: Charactor }
      ]
    },
    {
      path: '/home',
      component: Home,
      redirect: '/power',
      children: [
        { path: '/power', component: practice }
      ]
    }
  ]
})
