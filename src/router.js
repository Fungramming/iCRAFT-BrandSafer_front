import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import Product from "./views/Product.vue";
import Appv from "./views/Appv.vue";
import Admin from "./views/Admin.vue";
import NotFound from "./views/NotFound.vue";
import CustomerManagement from "./components/Admin/CustomerManagement.vue";
import CustomerAccount from "./components/Admin/CustomerAccount.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: { name: "login" }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/product",
      name: "product",
      component: Product
    },
    {
      path: "/appv",
      name: "appv",
      component: Appv
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      children: [
        {
          path: "/admin/customerManagement",
          name: "customerManagement",
          component: CustomerManagement
        },
        {
          path: "/admin/customerAccount",
          name: "customerAccount",
          component: CustomerAccount
        }
      ]
    },
    { path: "*", component: NotFound }
  ],
  mode: "history"
});
