import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello' // test
import Index from '../components/index/index.vue'
import Login from '../components/login/login.vue'
import Client from '../components/client/client.vue'
// import Home from '../components/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component : Login
    },
    {
      path: '/index',
      // name: 'index',
      component: Index,
      children: [
          { path: '',     name: 'home', component: require('../components/home/home.vue') },
          { path: 'client', name: 'client', component: Client },
          { path: 'question', name: 'question', component: require('../components/question/question.vue')},
          { path: 'archive', name: 'archive', component: require('../components/archive/archive.vue')},
          { path: 'system', name: 'system', component: require('../components/system/system.vue')},

          { path: 'hello', name: 'hello', component: Hello },
        ]
    }
  ]
})
