import axios from "axios";
import CONF from "../config";

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
  fetchDashboard() {
    return axios.get(CONF.FETCH_DASHBOARD);
  },
  fetchUserDashboard(uid) {
    return axios.get(CONF.FETCH_USER_DASHBOARD.replace("${uid}", uid));
  },

  /* ========= Product ========= */
  fectchProductCert({ page, query }) {
    return axios.get(CONF.FETCH_PRODUCT_CERIT, {
      params: { page, query }
    });
  },

  /* ========= App ========= */
  fetchAppLelease({ page, query }) {
    return axios.get(CONF.FETCH_APP_LELEASE, {
      params: { page, query }
    });
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
  fetchCustomer({ page, query }) {
    return axios.get(CONF.FETCH_CUSTOMER, {
      params: { page, query }
    });
  },
  addCustomer(customer) {
    return axios.post(CONF.ADD_CUSTOMER, customer);
  },
  updateCustomer({ cid, customer }) {
    return axios.put(CONF.UPDATE_CUSTOMER.replace("${cid}", cid), customer);
  },

  fetchIcraftUser({ page, query }) {
    return axios.get(CONF.FETCH_ICRAFT_USER, {
      params: { page, query }
    });
  },
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
    return axios.delete(CONF.DELETE_ICRAFT_USER, uid);
  },

  fetchUser(uid) {
    return axios.get(CONF.FETCH_USER.replace("${uid}", uid));
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

  fetchAccountLog({ page, query }) {
    return axios.get(CONF.FETCH_ACCOUNT_LOG, {
      params: { page, query }
    });
  },

  fetchBlacklist({ page, query }) {
    return axios.get(CONF.FETCH_BLACKLIST, {
      params: { page, query }
    });
  },
  addBlacklist(list) {
    return axios.post(CONF.ADD_BLACKLIST, list);
  },
  deleteBlacklist({ bid }) {
    return axios.delete(CONF.DELETE_BLACKLIST.replace("${bid}", bid));
  },

  fetchOverCert({ page, query }) {
    return axios.get(CONF.FETCH_OVER_CERT, {
      params: { page, query }
    });
  },

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

  fetchAdminApp({ page, query }) {
    return axios.get(CONF.FETCH_ADMIN_APP, {
      params: { page, query }
    });
  },
  addAdminApp({ nid, number }) {
    return axios.delete(CONF.ADD_ADMIN_APP.replace("${nid}", nid), number);
  },
  updateAdminApp(app) {
    return axios.put(CONF.UPDATE_ADMIN_APP, app);
  },

  fetchDistributor({ page, query }) {
    return axios.get(CONF.FETCH_DISTRIBUTOR, {
      params: { page, query }
    });
  },
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
    return axios.delete(CONF.DELETE_DISTRIBUTOR, did);
  },

  fetchTagType({ page, query }) {
    return axios.get(CONF.FETCH_TAG_TYPE, {
      params: { page, query }
    });
  },
  addTagType(tagType) {
    return axios.post(CONF.ADD_TAG_TYPE, tagType);
  },
  updateTagType({ tid, tagType }) {
    return axios.put(CONF.UPDATE_TAG_TYPE.replace("${tid}", tid), tagType);
  },
  deleteTagType(tid) {
    return axios.delete(CONF.DELETE_TAG_TYPE, tid);
  }
};
