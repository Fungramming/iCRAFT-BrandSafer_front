import Vue from "vue";
import App from "./App.vue";

import axios from "axios";
import router from "./router";
import store from "./store/index.js";

// MODULE CSS
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "vuetify/dist/vuetify.min.js";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

import DatePicker from 'vue2-datepicker'

Vue.use(Vuetify);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// Use v-calendar, v-date-picker & v-popover components
Vue.use(VCalendar, {
  firstDayOfWeek: 2,  // Monday
            // ...other defaults
});

Vue.use(DatePicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
