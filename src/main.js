import Vue from "vue";
import App from "./App.vue";
import ES6Promise from "es6-promise";
ES6Promise.polyfill();

import axios from "axios";
import router from "./router";
import store from "./store/index.js";

// CSS MODULE
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "vuetify/dist/vuetify.min.js";
import "material-design-icons-iconfont/dist/material-design-icons.css";
Vue.use(Vuetify);

// CALENDAR
import DatePicker from "vue2-datepicker";
Vue.use(DatePicker);

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:5000";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
