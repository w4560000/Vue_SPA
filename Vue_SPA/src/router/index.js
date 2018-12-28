import Vue from 'vue'
import Router from 'vue-router'
import gheader from '../components/gheader'
import login from '../components/login'
import login_signup from '../components/login_signup'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'gheader',
      component: gheader,
      mode: 'history'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/login_signup',
      name:'login_signup',
      component:login_signup
    }
  ]
})
