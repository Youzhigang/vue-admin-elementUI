// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import {store} from './store/index'


// import _ from 'lodash'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false
Vue.prototype.$http = Vue.prototype.$http || axios


Vue.use(ElementUI)


/*
router.beforeEach( (to, from, next) => {
  console.log('router to ', to);
  console.log('router from ', from);

  next()
})
*/


router.beforeEach( ({meta, path}, from, next) => {
  // console.log(meta, path)
  let isLogin
  let {auth = true} = meta
  isLogin = store.state.user.id ? true : false
  console.log(store.state)
  console.log(isLogin)
  if (auth && !isLogin && path !== '/login') {
    console.log('not login')
    return next({path: '/login'})
  }
  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
