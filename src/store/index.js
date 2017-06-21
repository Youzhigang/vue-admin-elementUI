import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);


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


function addNewObjectiveRow(value) {
            var $divElements = "<div class='row'>"
                + "<div class='form-inline'>"
                + "<br /><div class='form-group'><label class='control-label'>Title</label><div class=''><input type='text' class='form-control objectivetitle' placeholder='Title' /></div></div>"
                + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
                + "<div class='form-group input-group'><label class='control-label'>Target Completion Date</label><div class=''><input readonly type='text' class='form-control targetdateinput' placeholder='Select Date' /><span class='input-group-addon'><i class='glyphicon glyphicon-calendar'></i></span></div></div>"
                + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
                + "<div class='form-group'><label class='control-label'></label><div><input type='button' value='Remove Goal' class='btn-remove btn-danger deleteButton' /></div></div>"
                + "</div>"
                + "<br />"
                + "<div class='form-group'><label class='control-label'> Details</label><div><textarea class='form-control text-area-width goaldetails' rows='4' placeholder='Enter details here...'></textarea></div></div><hr />"
                + "</div>"
            return $divElements;
        }
