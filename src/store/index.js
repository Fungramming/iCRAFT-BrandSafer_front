import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import ES6Promise from "es6-promise";

import state from "./state.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

ES6Promise.polyfill();
Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createPersistedState({})],
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    date(state) {
      function formatDate() {
        var d = new Date(),
          hour = "" + d.getHours(),
          minute = "" + d.getMinutes(),
          second = "" + d.getSeconds(),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();
        if (second.length == 1) second = "0" + second;
        if (minute.length == 1) minute = "0" + minute;
        if (hour.length == 1) hour = "0" + hour;
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return (
          [year, month, day].join(".") + " " + [hour, minute, second].join(":")
        );
      }
      return (state.date.today = formatDate());
    }
  }
});

export default store;
