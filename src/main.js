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

import DatePicker from "vue2-datepicker";

import * as VueGoogleMaps from "vue2-google-maps";
import GmapCluster from "vue2-google-maps/src/components/cluster";

Vue.use(Vuetify);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(DatePicker);

Vue.use(VueGoogleMaps, {
    load: {
        key: "",
        libraries: "places"
    }
});
Vue.component("GmapCluster", GmapCluster);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");