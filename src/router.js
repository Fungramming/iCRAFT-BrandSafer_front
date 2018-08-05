import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login";
// DASHBOARD
import Dashboard from "./views/Dashboard";
// PRODUCT
import Product from "./views/Product";
import ProductCertList from "./components/Product/ProductCertList";
import ProductCertMap from "./components/Product/ProductCertMap.vue";
// APP
import Appv from "./views/Appv";
import AppReleaseInfo from "./components/Appv/AppReleaseInfo";
// ADMIN
import NotFound from "./views/NotFound";
import CustomerManagement from "./components/Admin/CustomerManagement";
import CustomerAccount from "./components/Admin/CustomerAccount";
import IcraftAccount from "./components/Admin/IcraftAccount";
import AccountLog from "./components/Admin/AccountLog";
import BlacklistApp from "./components/Admin/BlacklistApp";
import WarningList from "./components/Admin/WarningList";
import DistributorManagement from "./components/Admin/DistributorManagement";
import TagtypeManagement from "./components/Admin/TagtypeManagement";
import AdminappManagement from "./components/Admin/AdminappManagement";

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
      component: Product,
      children: [
        {
          path: "/product/certList",
          name: "certList",
          component: ProductCertList
        },
        {
          path: "/product/certMap",
          name: "certMap",
          component: ProductCertMap
        }
      ]
    },
    {
      path: "/appv",
      name: "appv",
      component: Appv,
      children: [
        {
          path: "/appv/releaseInfo",
          name: "releaseInfo",
          component: AppReleaseInfo
        }
      ]
    },
    {
      path: "/admin/customerManagement",
      name: "customerManagement",
      component: CustomerManagement
    },
    {
      path: "/admin/customerAccount",
      name: "customerAccount",
      component: CustomerAccount
    },
    {
      path: "/admin/icraftAccount",
      name: "icraftAccount",
      component: IcraftAccount
    },
    {
      path: "/admin/accountLog",
      name: "accountLog",
      component: AccountLog
    },
    {
      path: "/admin/blacklistApp",
      name: "blacklistApp",
      component: BlacklistApp
    },
    {
      path: "/admin/warningList",
      name: "warningList",
      component: WarningList
    },
    {
      path: "/admin/distributorManagement",
      name: "distributorManagement",
      component: DistributorManagement
    },
    {
      path: "/admin/tagtypeManagement",
      name: "tagtypeManagement",
      component: TagtypeManagement
    },
    {
      path: "/admin/adminappManagement",
      name: "adminappManagement",
      component: AdminappManagement
    },
    { path: "*", component: NotFound }
  ],
  mode: "history"
});
