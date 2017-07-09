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
          { path: '',     name: '主页', component: require('../components/home/home.vue') },
          { path: 'client', name: '客户列表', component: Client,},
          { path: 'client/renew', name: '续费情况', component: require('../components/client/renew.vue')},
          { path: 'question', name: '问题列表', component: require('../components/question/question.vue')},
          { path: 'service', name: '查看文档', component: require('../components/document/document.vue')},
          { path: 'system', name: '系统设置', component: require('../components/system/system.vue')},
          { path: 'hello', name: 'hello', component: Hello },
        ]
    },
    { path: '*', name: 'ErrorCompoent', component : require('../components/404.vue') },
  ]

export default routes


