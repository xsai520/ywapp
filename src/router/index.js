import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Notice from '@/components/Notice'
import Monitor from '@/components/Monitor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/monitor',
      name: 'Monitor',
      component: Monitor
    }
  ]
})
