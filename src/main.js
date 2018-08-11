// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueResource from 'vue-resource'
import $ from 'jquery'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import '../static/common.css'
import '@/assets/fonts/alibaba/iconfont.css'
Vue.use(vueResource);

Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{
  if(to.path=="/"){
    next({ path: './login' })
  }else{
    next()
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
