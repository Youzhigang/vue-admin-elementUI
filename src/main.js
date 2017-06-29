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
import Cookies from 'js-cookie'

// import _ from 'lodash'
import $ from 'jquery'
import api from './api'

Vue.config.productionTip = false
Vue.prototype.axios = Vue.prototype.axios || axios
Vue.prototype.cookies = Vue.prototype.cookies || Cookies
Vue.prototype.api = api

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
  // console.log(vm,123121312312)
  store.dispatch('ActiveOption', route)
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



// 请求的拦截器
axios.interceptors.request.use(function (config) {
    let TokenID = Cookies.get('UserTokenID')
    console.log('TokenID=',TokenID)
     // 判断请求的类型
     // 如果是post请求就把默认参数拼到data里面
     // 如果是get请求就拼到params里面
     console.log(config)
    if(config.method === 'post') {
        console.log(config.data.params)
        config.data.params = {
            TokenID: TokenID,
            ...config.data.params
        }
    } else if(config.method === 'get') {

        config.params = {
            TokenID:TokenID,
            ...config.params
        }
        console.log(config.params)
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  })

