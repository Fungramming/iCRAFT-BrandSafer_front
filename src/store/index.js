import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import state from "./state.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

Vue.use(Vuex);
window.localStorage.clear();

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createPersistedState({})],
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    }
  }
});

export default store;
