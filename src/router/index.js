import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello' // test
import Index from '../components/index/index.vue'
import Login from '../components/login/login.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component : Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        // {
        //   path: '/',
        //   name: 'Hello',
        //   component: Hello
        // },
           {
          path: '/index/hello',
          name: 'Hello',
          component: Hello
          }
      ]
    }

  ]
})
