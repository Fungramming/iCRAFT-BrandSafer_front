import BSAPI from "../api/BSAPI";
import Constant from "../constant";

function promise(apiFunction, payload, store, constant) {
  store.commit(Constant.SHOW_LOADING, true);

  return new Promise((resolve, reject) => {
    apiFunction(payload)
      .then(resp => {
        if (constant) {
          store.commit(constant, resp.data);
        }
        console.log(resp.data);
        resolve(resp);
        store.commit(Constant.SHOW_LOADING, false);
      })
      .catch(err => {
        console.log(err);
        reject(err);
        store.commit(Constant.SHOW_LOADING, false);
      });
  });
}
export default {
  [Constant.LOG_OUT]: store => {
    store.commit(Constant.LOG_OUT);
  },
  async [Constant.LOG_IN](store, payload) {
    return promise(BSAPI.logIn, payload, store, Constant.LOG_IN);
  },
  // Dashboard
  async [Constant.FETCH_LIVE_STATUS](store, payload) {
    return promise(
      BSAPI.fetchLiveStatus,
      payload,
      store,
      Constant.FETCH_LIVE_STATUS
    );
  },
  [Constant.FETCH_WEEKLY_STATUS]: (store, payload) => {
    store.commit(Constant.FETCH_WEEKLY_STATUS, payload);
  },
  async [Constant.FETCH_MONTHLY_STATUS](store, payload) {
    return promise(
      BSAPI.fetchMonthlyStatus,
      payload,
      store,
      Constant.FETCH_MONTHLY_STATUS
    );
  },
  // Product
  async [Constant.FETCH_PRODUCT_CERIT](store, payload) {
    return promise(BSAPI.fectchProductCert, payload, store, null);
  },
  // App
  async [Constant.FETCH_APP_LELEASE](store, payload) {
    return promise(BSAPI.fetchAppLelease, payload, store, null);
  },
  async [Constant.ADD_APP_LELEASE](store, payload) {
    return promise(BSAPI.addAppLelease, payload, store, null);
  },
  async [Constant.UPDATE_APP_LELEASE](store, payload) {
    return promise(BSAPI.updateAppLelease, payload, store, null);
  },
  async [Constant.DELETE_APP_LELEASE](store, payload) {
    return promise(BSAPI.deleteAppLelease, payload, store, null);
  },
  //Admin
  async [Constant.FETCH_COMPANY](store, payload) {
    return promise(BSAPI.fetchCompany, payload, store, null);
  },
  async [Constant.ADD_COMPANY](store, payload) {
    return promise(BSAPI.addCompany, payload, store, null);
  },
  async [Constant.UPDATE_COMPANY](store, payload) {
    return promise(BSAPI.updateCompany, payload, store, null);
  },

  async [Constant.FETCH_CUSTOMER](store, payload) {
    return promise(BSAPI.fetchCustomer, payload, store, null);
  },
  async [Constant.ADD_CUSTOMER](store, payload) {
    return promise(BSAPI.addCustomer, payload, store, null);
  },
  async [Constant.UPDATE_CUSTOMER](store, payload) {
    return promise(BSAPI.updateCustomer, payload, store, null);
  },

  async [Constant.FETCH_ICRAFT_USER](store, payload) {
    return promise(BSAPI.fetchIcraftUser, payload, store, null);
  },
  async [Constant.FETCH_ICRAFT_USER_ID](store, payload) {
    return promise(BSAPI.fetchIcraftUserId, payload, store, null);
  },
  async [Constant.ADD_ICRAFT_USER](store, payload) {
    return promise(BSAPI.addIcraftUser, payload, store, null);
  },
  async [Constant.UPDATE_ICRAFT_USER](store, payload) {
    return promise(BSAPI.updateIcraftUser, payload, store, null);
  },
  async [Constant.DELETE_ICRAFT_USER](store, payload) {
    return promise(BSAPI.deleteIcraftUser, payload, store, null);
  },

  async [Constant.FETCH_USERS](store, payload) {
    return promise(BSAPI.fetchUsers, payload, store, null);
  },
  async [Constant.ADD_USERS](store, payload) {
    return promise(BSAPI.addUsers, payload, store, null);
  },
  async [Constant.FETCH_USER](store, payload) {
    return promise(BSAPI.fetchUser, payload, store, null);
  },
  async [Constant.ADD_USER](store, payload) {
    return promise(BSAPI.addUser, payload, store, null);
  },
  async [Constant.UPDATE_USER](store, payload) {
    return promise(BSAPI.updateUser, payload, store, null);
  },
  async [Constant.DELETE_USER](store, payload) {
    return promise(BSAPI.deleteUser, payload, store, null);
  },

  async [Constant.FETCH_ACCOUNT_LOG](store, payload) {
    return promise(BSAPI.fetchAccountLog, payload, store, null);
  },

  async [Constant.FETCH_BLACKLIST](store, payload) {
    return promise(BSAPI.fetchBlacklist, payload, store, null);
  },
  async [Constant.ADD_BLACKLIST](store, payload) {
    return promise(BSAPI.addBlacklist, payload, store, null);
  },
  async [Constant.DELETE_BLACKLIST](store, payload) {
    return promise(BSAPI.deleteBlacklist, payload, store, null);
  },

  async [Constant.FETCH_OVER_CERT](store, payload) {
    return promise(BSAPI.fetchOverCert, payload, store, null);
  },

  async [Constant.FETCH_RANDOM_NUMBER](store, payload) {
    return promise(BSAPI.fetchRandomNumber, payload, store, null);
  },
  async [Constant.ADD_RANDOM_NUMBER](store, payload) {
    return promise(BSAPI.addRandomNumber, payload, store, null);
  },
  async [Constant.UPDATE_RANDOM_NUMBER](store, payload) {
    return promise(BSAPI.updateRandomNumber, payload, store, null);
  },

  async [Constant.FETCH_ADMIN_APP](store, payload) {
    return promise(BSAPI.fetchAdminApp, payload, store, null);
  },
  async [Constant.ADD_ADMIN_APP](store, payload) {
    return promise(BSAPI.addAdminApp, payload, store, null);
  },
  async [Constant.UPDATE_ADMIN_APP](store, payload) {
    return promise(BSAPI.updateAdminApp, payload, store, null);
  },

  async [Constant.FETCH_DISTRIBUTOR](store, payload) {
    return promise(BSAPI.fetchDistributor, payload, store, null);
  },
  async [Constant.ADD_DISTRIBUTOR](store, payload) {
    return promise(BSAPI.addDistributor, payload, store, null);
  },
  async [Constant.UPDATE_DISTRIBUTOR](store, payload) {
    return promise(BSAPI.updateDistributor, payload, store, null);
  },
  async [Constant.DELETE_DISTRIBUTOR](store, payload) {
    return promise(BSAPI.deleteDistributor, payload, store, null);
  },

  async [Constant.FETCH_TAG_TYPE](store, payload) {
    return promise(BSAPI.fetchTagType, payload, store, null);
  },
  async [Constant.ADD_TAG_TYPE](store, payload) {
    return promise(BSAPI.addTagType, payload, store, null);
  },
  async [Constant.UPDATE_TAG_TYPE](store, payload) {
    return promise(BSAPI.updateTagType, payload, store, null);
  },
  async [Constant.DELETE_TAG_TYPE](store, payload) {
    return promise(BSAPI.deleteTagType, payload, store, null);
  },

  [Constant.SHOW_LOADING]: (state, isLoading) => {
    state.isLoading = isLoading;
  }
};
