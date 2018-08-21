import axios from "axios";
import CONF from "../Config";

export default {
    /* ========= Login ========= */
    logIn(payload) {
        return new Promise((resolve, reject) => {
            axios({
                    method: "post",
                    url: CONF.LOG_IN,
                    auth: payload
                })
                .then(resp => {
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },

    /* ========= Password ========= */
    updatePassword({ uid, oldPw, newPw }) {
        return axios.put(CONF.UPDATE_PASSWORD.replace("${uid}", uid), {
            old_password: oldPw,
            new_password: newPw
        });
    },
    resetPassword(uid) {
        return axios.put(CONF.RESET_PASSWORD.replace("${uid}", uid));
    },

    /* ========= Dashboard ========= */
    fetchLiveStatus() {
        return axios.get(CONF.FETCH_LIVE_STATUS);
    },
    fetchMonthlyStatus() {
        return axios.get(CONF.FETCH_MONTHLY_STATUS);
    },
    fetchUserDashboard(uid) {
        return axios.get(CONF.FETCH_USER_DASHBOARD.replace("${uid}", uid));
    },

    /* ========= Product ========= */
    fectchProductCert({
        page,
        perPage,
        date_start,
        date_finish,
        company,
        tag_type,
        os,
        cert
    }) {
        let query_str = "?";
        if (company !== "all") {
            query_str += `&companyCode=${company}`;
        }
        if (tag_type !== "all") {
            query_str += `&tagType=${tag_type}`;
        }
        if (os !== "all") {
            query_str += `&osType=${os}`;
        }
        if (cert !== "all") {
            query_str += `&result=${cert}`;
        }
        query_str += `&page=${page}&perPage=${perPage}&start=${date_start}&end=${date_finish}`;
        console.log(query_str);
        return axios.get(CONF.FETCH_PRODUCT_CERIT + query_str);
    },

    /* ========= App ========= */
    fetchAppLelease() {
        return axios.get(CONF.FETCH_APP_LELEASE);
    },
    addAppLelease(app) {
        return axios.post(CONF.ADD_APP_LELEASE, app);
    },
    updateAppLelease({ aid, app }) {
        return axios.put(CONF.UPDATE_APP_LELEASE.replace("${aid}", aid), app);
    },
    deleteAppLelease(aid) {
        return axios.delete(CONF.DELETE_APP_LELEASE.replace("${aid}", aid));
    },

    /* ========= Admin ========= */
    fetchCompany(company) {
        return axios.get(CONF.FETCH_COMPANY, company);
    },
    addCompany(company) {
        return axios.post(CONF.ADD_COMPANY, company);
    },
    updateCompany({ cid, company }) {
        return axios.put(CONF.UPDATE_COMPANY.replace("${cid}", cid), company);
    },

    fetchCustomer(customer) {
        return axios.get(CONF.FETCH_CUSTOMER, customer);
    },
    // fetchCustomer({ page, query }) {
    //   return axios.get(CONF.FETCH_CUSTOMER, {
    //     params: { page, query }
    //   });
    // },
    addCustomer(customer) {
        return axios.post(CONF.ADD_CUSTOMER, customer);
    },
    updateCustomer({ cid, customer }) {
        return axios.put(CONF.UPDATE_CUSTOMER.replace("${cid}", cid), customer);
    },

    fetchIcraftUser(uid) {
        return axios.get(CONF.FETCH_ICRAFT_USER, uid);
    },
    // fetchIcraftUser({ page, query }) {
    //   return axios.get(CONF.FETCH_ICRAFT_USER, {
    //     params: { page, query }
    //   });
    // },
    fetchIcraftUserId(uid) {
        return axios.get(CONF.FETCH_ICRAFT_USER_ID.replace("${uid}", uid));
    },
    addIcraftUser(user) {
        return axios.post(CONF.ADD_ICRAFT_USER, user);
    },
    updateIcraftUser({ uid, user }) {
        return axios.put(CONF.UPDATE_ICRAFT_USER.replace("${uid}", uid), user);
    },
    deleteIcraftUser(uid) {
        return axios.delete(CONF.DELETE_ICRAFT_USER.replace("${uid}", uid), uid);
    },
    fetchUsers() {
        return axios.get(CONF.FETCH_USERS);
    },
    addUsers(users) {
        return axios.post(CONF.ADD_USERS, users);
    },
    fetchUser() {
        return axios.get(CONF.FETCH_USER);
    },
    addUser(user) {
        return axios.post(CONF.ADD_USER, user);
    },
    updateUser({ uid, user }) {
        return axios.put(CONF.UPDATE_USER.replace("${uid}", uid), user);
    },
    deleteUser(uid) {
        return axios.delete(CONF.DELETE_USER, uid);
    },

    // fetchAccountLog() {
    //   return axios.get(CONF.FETCH_ACCOUNT_LOG);
    // },
    fetchAccountLog({ start, end }) {
        return axios.get(CONF.FETCH_ACCOUNT_LOG, {
            params: { start, end }
        });
    },

    fetchBlacklist() {
        return axios.get(CONF.FETCH_BLACKLIST);
    },
    // fetchBlacklist({ page, query }) {
    //   return axios.get(CONF.FETCH_BLACKLIST, {
    //     params: { page, query }
    //   });
    // },
    addBlacklist(list) {
        return axios.post(CONF.ADD_BLACKLIST, list);
    },
    // deleteBlacklist(bid) {
    //   return axios.delete(CONF.DELETE_BLACKLIST.replace("${bid}", bid));
    // },
    deleteBlacklist(bid) {
        return axios.delete(CONF.DELETE_BLACKLIST.replace("${bid}", bid), bid);
    },

    fetchOverCert({ start, end }) {
        return axios.get(CONF.FETCH_OVER_CERT, {
            params: { start, end }
        });
    },

    fetchPushToken(pushToken) {
        return axios.get(CONF.FETCH_PUSH_TOKEN.replace("${pushtoken}", pushToken));
    },
    // fetchCustomer({ page, query }) {
    //   return axios.get(CONF.FETCH_CUSTOMER, {
    //     params: { page, query }
    //   });
    // },

    fetchRandomNumber({ page, query }) {
        return axios.get(CONF.FETCH_RANDOM_NUMBER, {
            params: { page, query }
        });
    },
    addRandomNumber(number) {
        return axios.post(CONF.ADD_RANDOM_NUMBER, number);
    },
    updateRandomNumber({ nid, number }) {
        return axios.delete(
            CONF.UPDATE_RANDOM_NUMBER.replace("${nid}", nid),
            number
        );
    },

    fetchAdminApp() {
        return axios.get(CONF.FETCH_ADMIN_APP);
    },
    addAdminApp({ nid, number }) {
        return axios.delete(CONF.ADD_ADMIN_APP.replace("${nid}", nid), number);
    },
    updateAdminApp({ aid, app }) {
        return axios.put(CONF.UPDATE_ADMIN_APP.replace("${aid}", aid), app);
    },
    deleteAdminApp(aid) {
        return axios.delete(CONF.DELETE_ADMIN_APP.replace("${aid}", aid), aid);
    },

    fetchDistributor(distributor) {
        return axios.get(CONF.FETCH_DISTRIBUTOR, distributor);
    },
    // fetchDistributor({ page, query }) {
    //   return axios.get(CONF.FETCH_DISTRIBUTOR, {
    //     params: { page, query }
    //   });
    // },
    addDistributor(distributor) {
        return axios.post(CONF.ADD_DISTRIBUTOR, distributor);
    },
    updateDistributor({ did, distributor }) {
        return axios.put(
            CONF.UPDATE_DISTRIBUTOR.replace("${did}", did),
            distributor
        );
    },
    deleteDistributor(did) {
        return axios.delete(CONF.DELETE_DISTRIBUTOR.replace("${did}", did), did);
    },

    fetchTagType(tagType) {
        return axios.get(CONF.FETCH_TAG_TYPE, tagType);
    },
    // fetchTagType({ page, query }) {
    //   return axios.get(CONF.FETCH_TAG_TYPE, {
    //     params: { page, query }
    //   });
    // },
    addTagType(tagType) {
        return axios.post(CONF.ADD_TAG_TYPE, tagType);
    },
    updateTagType({ tid, tagType }) {
        return axios.put(CONF.UPDATE_TAG_TYPE.replace("${tid}", tid), tagType);
    },
    deleteTagType(tid) {
        return axios.delete(CONF.DELETE_TAG_TYPE.replace("${tid}", tid));
    }
};