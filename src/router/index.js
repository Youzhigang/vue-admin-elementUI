

import Index from '../components/index/index.vue'
import Login from '../components/login/login.vue'
import Client from '../components/client/client.vue'
import Hello from '@/components/Hello' // test
// import Home from '../components/home/home.vue'


const routes =  [
    { path: '/', redirect:'/login'},
    { path: '/login', name: 'login', component : Login },

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
    },
    { path: '*', name: 'ErrorCompoent', component : require('../components/404.vue') },
  ]

export default routes


