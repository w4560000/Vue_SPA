import Vue from 'vue'
import Router from 'vue-router'
import gheader from '@/components/gheader'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'gheader',
      component: gheader
    }
  ]
})
