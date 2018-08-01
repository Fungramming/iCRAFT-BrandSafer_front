import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
// DASHBOARD
import Dashboard from "./views/Dashboard.vue";
// PRODUCT
import Product from "./views/Product.vue";
import ProductCertList from "./components/Product/ProductCertList.vue";
import ProductCertMap from "./components/Product/ProductCertMap.vue";
// APP
import Appv from "./views/Appv.vue";
// ADMIN
import CustomerManagement from "./components/Admin/CustomerManagement.vue";
import CustomerAccount from "./components/Admin/CustomerAccount.vue";
import IcraftAccount from "./components/Admin/IcraftAccount.vue";
import AccountLog from "./components/Admin/AccountLog.vue";
import BlacklistApp from "./components/Admin/BlacklistApp.vue";
import WarningList from "./components/Admin/WarningList.vue";
import DistributorManagement from "./components/Admin/DistributorManagement.vue";
import NotFound from "./views/NotFound.vue";

Vue.use(Router);

export default new Router({
    routes: [{
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
            children: [{
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
            component: Appv
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
        { path: "*", component: NotFound }
    ],
    mode: "history"
});