import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello' // test
import Index from '../components/index/index.vue'
import Login from '../components/login/login.vue'
import Client from '../components/client/client.vue'
// import Home from '../components/home/home.vue'

Vue.use(Router)
const URI = 'http://localhost:9080'

const router = new Router({
  routes: [
    {
      path: '/', redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component : Login
    },
    {
      path: '/index',
      // name: 'index',
      component: Index,
      children: [
          { path: '',     name: 'home', component: require('../components/home/home.vue') },
          { path: 'client', name: 'client', component: Client,

          },
          {path:'client/renew', name: 'renew', component: require('../components/client/renew.vue')},
          { path: 'question', name: 'question', component: require('../components/question/question.vue')},
          { path: 'service', name: 'service', component: require('../components/service/service.vue')},
          { path: 'system', name: 'system', component: require('../components/system/system.vue')},
          { path: 'hello', name: 'hello', component: Hello },
        ]
    }
  ]
})



export default  router
