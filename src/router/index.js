import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Notice from '@/components/Notice'


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
    }
  ]
})
