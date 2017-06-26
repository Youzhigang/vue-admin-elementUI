// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import {store} from './store/index'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-default/index.css'

// import _ from 'lodash'

Vue.config.productionTip = false
Vue.prototype.$http = Vue.prototype.$http || axios


Vue.use(ElementUI)
Vue.use(VueRouter)


const router = new VueRouter({
  routes: routes,
  //mode: 'history'
})
/*
router.beforeEach( (to, from, next) => {
  console.log('router to ', to);
  console.log('router from ', from);
  next()
})
*/

import {Loading} from 'element-ui'



router.beforeEach( ({meta, path}, from, next) => {
  let isLogin
  let {auth = true} = meta

  isLogin = store.state.user.id ? true : false
  if (auth && !isLogin && path !== '/login') {
    console.log('not login')
    next({path: '/login'})
  }
  next()
})

router.afterEach( route => {
  // these hooks do not get a next function and cannot affect the navigation
  // console.log(store.dispatch('AddOption', route))
  console.log(vm,123121312312)
  store.dispatch('AddOption', route)
  console.log('afterEach',route)
})

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})



