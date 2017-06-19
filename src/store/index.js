import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// const store = {}

// export default store

export const bus = new Vue ({
  data: {
    user: {}
  }
})


if (window.sessionStorage.user) {
  bus.user = JSON.parse (window.sessionStorage.user)
}


export const USER_LOGIN = 'USER_LOGIN' //登录成功
export const USER_LOGINOUT = 'USER_LOGINOUT' //退出登录


export const store = new Vuex.Store({
  state: {
    user: JSON.parse(window.sessionStorage.getItem('user')) || {},
  },
  mutations: {
    USER_LOGIN: (state, user) => {
      state.user = user
      window.sessionStorage.setItem('user', JSON.stringify(user))
    },
    USER_LOGINOUT: (state, user) => {
      window.sessionStorage.removeItem('user')
      Object.keys(state).forEach( k => Vue.delete(state, k))
    }
  },
  actions: {
    USER_LOGIN: ({commit}, user) => {
      commit(USER_LOGIN, user)
    },
    USER_LOGINOUT: ({commit}) => {
      commit(USER_LOGINOUT)
    }
  }
})
