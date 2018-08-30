export default {
  /* ========= User ========= */
  // Auth
  LOG_IN: "logIn",
  LOG_OUT: "logOut",
  // Password
  UPDATE_PASSWORD: "updatePassword",
  RESET_PASSWORD: "resetPassword",
  //막 쓰기
  // 기간설정, 고객사 선택
  FETCH_LIVE_STATUS: "fetchLiveStatus",
  FETCH_WEEKLY_STATUS: "fetchWeeklyStatus",
  FETCH_MONTHLY_STATUS: "fetchMonthlyStatus",
  // 기간설정
  FETCH_PRODUCT_CERIT: "fectchProductCert",
  /* ========= Product ========= */
  // FETCH_PRODUCT: "fetchProduct",
  // ADD_PRODUCT: "addProduct",
  // UPDATE_PRODUCT: "updateProduct",
  // DELETE_PRODUCT: "deleteProduct",

  /* ========= App ========= */
  FETCH_APP_LELEASE: "fetchAppLelease",
  ADD_APP_LELEASE: "addAppLelease",
  UPDATE_APP_LELEASE: "updateAppLelease",
  DELETE_APP_LELEASE: "deleteAppLelease",

  FETCH_PUSH_TOKEN: "fetchPushToken",

  /* ========= Admin ========= */
  FETCH_COMPANY: "fetchCompany",
  ADD_COMPANY: "addCompany",
  UPDATE_COMPANY: "updateCompany",

  FETCH_CUSTOMER: "fetchCustomer",
  ADD_CUSTOMER: "addCustomer",
  UPDATE_CUSTOMER: "updateCustomer",

  FETCH_ICRAFT_USER: "fetchIcraftUser",
  ADD_ICRAFT_USER: "addIcraftUser",
  UPDATE_ICRAFT_USER: "updateIcraftUser",
  DELETE_ICRAFT_USER: "deleteIcraftUser",

  FETCH_USERS: "fetchUsers",
  ADD_USERS: "addUsers",
  FETCH_USER: "fetchUser",
  ADD_USER: "addUser",
  UPDATE_USER: "updateUser",
  DELETE_USER: "deleteUser",

  FETCH_ACCOUNT_LOG: "fetchAccountLog",

  // 권한관리 서버와 의논 필요

  FETCH_BLACKLIST: "fetchBlacklist",
  ADD_BLACKLIST: "addBlacklist",
  UPDATE_BLACKLIST: "updateBlacklist",
  DELETE_BLACKLIST: "deleteBlacklist",

  FETCH_OVER_CERT: "fetchOverCert",

  FETCH_RANDOM_NUMBER: "fetchRandomNumber",
  ADD_RANDOM_NUMBER: "addRandomNumber",
  UPDATE_RANDOM_NUMBER: "updateRandomNumber",

  // 난수정보 조회가 뭐죠??
  // 관리자 app 등록은 어디서 하나요?

  FETCH_ADMIN_APP: "fetchAdminApp",
  ADD_ADMIN_APP: "addAdminApp",
  UPDATE_ADMIN_APP: "updateAdminApp",
  DELETE_ADMIN_APP: "deleteAdminApp",

  FETCH_DISTRIBUTOR: "fetchDistributor",
  ADD_DISTRIBUTOR: "addDistributor",
  UPDATE_DISTRIBUTOR: "updateDistributor",
  DELETE_DISTRIBUTOR: "deleteDistributor",

  FETCH_TAG_TYPE: "fetchTagType",
  ADD_TAG_TYPE: "addTagType",
  UPDATE_TAG_TYPE: "updateTagType",
  DELETE_TAG_TYPE: "deleteTagType",

  // 코스토리 유통사 코드 띠용

  // FETCH_BLACKLISI_REGION: "fetchBlacklistRegion",
  // ADD_BLACKLISI_REGION: "addBlacklistRegion",
  // DELETE_BLACKLISI_REGION: "deleteBlacklistRegion",

  /* ========= UI ========= */
  SHOW_LOADING: "showLoading",

  /* ========= TimeSelect ========= */
  WEEK_DAYS: ["일", "월", "화", "수", "목", "금", "토"],
  TIME_SELECT: [
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "4" },
    { label: "5" },
    { label: "6" },
    { label: "7" },
    { label: "8" },
    { label: "9" },
    { label: "10" },
    { label: "11" },
    { label: "12" },
    { label: "13" },
    { label: "14" },
    { label: "15" },
    { label: "16" },
    { label: "17" },
    { label: "18" },
    { label: "19" },
    { label: "20" },
    { label: "21" },
    { label: "22" },
    { label: "23" },
    { label: "24" }
  ],

  /* ========= Modal ========= */
  SHOW_MODAL: "showModal",
  MODAL_SIZE: "80%",
  MODAL_SIZE_HEIGHT: "95%",

  PUSH_APP: "pushToken"
};
