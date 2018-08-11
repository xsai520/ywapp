import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home'
import Notice from '@/components/Notice'
import Monitor from '@/components/Monitor'
import EquipmentDetailList from '@/components/EquipmentDetailList'
import Service from '@/components/Service'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
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
    },
    {
      path: '/equipmentDetailList',
      name: 'EquipmentDetailList',
      component: EquipmentDetailList

    },
    {
      path: '/service',
      name: 'Service',
      component: Service

    }
  ]
})
