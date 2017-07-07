import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie'

Vue.use(Vuex);


export const USER_LOGIN = 'USER_LOGIN' //登录成功
export const USER_LOGINOUT = 'USER_LOGINOUT' //退出登录
export const SET_USERINFO = 'SET_USERINFO'

export const store = new Vuex.Store({
  state: {
    user: JSON.parse(window.sessionStorage.getItem('user')) || {},
    userinfo: {},
    options: [],
    activeRoute: {},
    TokenID: ''
  },
  getters: {
    activeItem: state => {
      return state.activeRoute ?　state.activeRoute.path : ''
    },
    getTokenID: state => {
      return state.TokenID || Cookies.get('UserTokenID')
    }
  },
  mutations: {
    SET_USERINFO: (state, payload) => {
      console.log(456,payload)
      state.userinfo = payload['userinfo']
    },

    /*login*/
    USER_LOGIN: (state, payload) => {
      state.user = payload['user']
      window.sessionStorage.setItem('user', JSON.stringify(payload['user']))
      state.TokenID = payload['tokenid']
      window.sessionStorage.setItem('UserTokenID', payload['tokenid'])
      Cookies.set('UserTokenID',  payload['tokenid'], { expires: 1/24 })
    },
    USER_LOGINOUT: (state, user) => {
      window.sessionStorage.removeItem('user')
      //Object.keys(state).forEach( k => Vue.delete(state, k))
    },
    /*end*/

    /*route config*/
    AddOption: (state, route) => {

      let _names = state.options.map (i => i.name)
      if ( !_names.find(i => i === route.name)
          && route.name !== 'login'
          && route.name !== 'ErrorCompoent') {
            state.options.push(route)
      }
    },
    RemoveOption: (state, route) => {
      let _item = state.options.find( i => i.name === route.name)
      state.options.splice(state.options.indexOf(_item), 1)
    },
    ActiveOption: (state, route) => {
      if ( route.name !== 'login' && route.name !== 'ErrorCompoent' ) {
        state.activeRoute = route
      }
    }

    /*end*/
  },
  actions: {
    USER_LOGIN: ({commit}, user) => {
      commit(USER_LOGIN, user)
    },
    USER_LOGINOUT: ({commit}) => {
      commit(USER_LOGINOUT)
    },
    SET_USERINFO: ({commit}, userinfo) => {
      commit(SET_USERINFO, userinfo)
    },
    AddOption: ({commit}, route) => {
      commit('AddOption', route)
    },
    RemoveOption: ({commit}, route) => {
      commit('RemoveOption', route)
    },
    ActiveOption: ({commit}, route) => {
      commit('ActiveOption', route)
    }
  }
})
