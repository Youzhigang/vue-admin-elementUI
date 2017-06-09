import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// const store = {}

// export default store

const bus = new Vue ({
  data: {
    user: {}
  }
})


if (window.sessionStorage.user) {
  bus.user = JSON.parse (window.sessionStorage.user)
}

export default bus
