import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import ES6Promise from "es6-promise";

import state from "./state.js";
import mutations from "./mutations.js";
// import actions from "./actions.js";

ES6Promise.polyfill();
Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  // actions,
  plugins: [createPersistedState()],
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    }
  }
});

export default store;
