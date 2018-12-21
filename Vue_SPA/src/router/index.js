import Vue from 'vue'
import Router from 'vue-router'
import gheader from '../components/gheader'
import login from '../components/login'
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
    }
  ]
})
