// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import { store } from './store/index'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-default/index.css'
import Cookies from 'js-cookie'
import iview from 'iview'

// import _ from 'lodash'
import $ from 'jquery'
import { BasePath,ValidateApi } from './api'

Vue.config.productionTip = false
Vue.prototype.axios = Vue.prototype.axios || axios
Vue.prototype.cookies = Vue.prototype.cookies || Cookies
Vue.prototype.api = BasePath
Vue.prototype.Validate = ValidateApi

Vue.use(ElementUI)
Vue.use(iview)
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
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

import {Loading, Message} from 'element-ui'
var loadinginstace
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 请求的拦截器
axios.interceptors.request.use(function (config) {
    let TokenID = Cookies.get('UserTokenID')

    // axios.get('VALIDATE_API' + TokenID).then(
    //   res => {
    //     console.log(res)
    //   }
    // )
    //loadinginstace = Loading.service({ fullscreen: true })
    console.log('TokenID=',TokenID)
     // 判断请求的类型
     // 如果是post请求就把默认参数拼到data里面
     // 如果是get请求就拼到params里面

    if(config.method === 'post') {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        console.log(config.data)
        config.data = {
            TokenID: TokenID,
            ...config.data
        }

    } else if(config.method === 'get') {

        config.params = {
            TokenID:TokenID,
            ...config.params
        }

    }
    return config;
  }, function (error) {
    //loadinginstace.close()
    return Promise.reject(error);
  })

/*
axios.interceptors.response.use(data => {// 响应成功关闭loading
  loadinginstace.close()
  return data
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
})
*/
