var BASE_URL = "/api/v1";

export default {
  PAGESIZE: 5,

  /* ========= User ========= */
  // Auth
  LOG_IN: BASE_URL + "/tokens/",
  // Users
  FETCH_USERS: BASE_URL + "/users/",
  ADD_USERS: BASE_URL + "/users/",

  // Password
  UPDATE_PASSWORD: BASE_URL + "/users/${uid}",
  RESET_PASSWORD: BASE_URL + "/users/${uid}/pwReset",
  //막 쓰기
  // 기간설정, 고객사 선택
  FETCH_STATUS: BASE_URL + "/users/dashBoard",
  FETCH_USER_STATUS: BASE_URL + "/users/${uid}/dashBoard",

  // 기간설정
  FETCH_PRODUCT_CERIT: BASE_URL + "/prodCert/",
  FETCH_PRODUCT_CERIT_LOCATE: BASE_URL + "/prodCert/location",

  FETCH_PRODUCT: BASE_URL + "/prod/",
  ADD_PRODUCT: BASE_URL + "/prod/",
  UPDATE_PRODUCT: BASE_URL + "/prod/${pid}",
  DELETE_PRODUCT: BASE_URL + "/prod/${pid}",
  SEARCH_PRODUCT: BASE_URL + "/prod/search",

  FETCH_APP_LELEASE: BASE_URL + "/apps/",
  ADD_APP_LELEASE: BASE_URL + "/apps/",
  UPDATE_APP_LELEASE: BASE_URL + "/apps/${aid}",
  DELETE_APP_LELEASE: BASE_URL + "/apps/${aid}",

  FETCH_APP: BASE_URL + "fectchApp",

  FETCH_CUSTOMER: BASE_URL + "/admin/customer/",
  ADD_CUSTOMER: BASE_URL + "/admin/customer/",
  UPDATE_CUSTOMER: "/admin/customer/${cid}",

  FETCH_ICRAFT_USER: BASE_URL + "/admin/icrf_users/",
  ADD_ICRAFT_USER: BASE_URL + "/admin/icrf_users/",
  UPDATE_ICRAFT_USER: BASE_URL + "/admin/icrf_users/${iid}",
  DELETE_ICRAFT_USER: BASE_URL + "/admin/icrf_users/${iid}",

  FETCH_USER: BASE_URL + "/users/$<id>",
  ADD_USER: BASE_URL + "/users/",
  UPDATE_USER: BASE_URL + "/users/$<id>",
  DELETE_USER: BASE_URL + "/users/$<id>",

  FETCH_ACCOUNT_LOG: BASE_URL + "/users/access",

  // 권한관리 서버와 의논 필요

  FETCH_BLACKLIST: BASE_URL + "/admin/blacklist/",
  ADD_BLACKLIST: BASE_URL + "/admin/blacklist/",
  DELETE_BLACKLIST: BASE_URL + "/admin/blacklist/${bid}",

  FETCH_OVER_CERT: BASE_URL + "/admin/overCert/",
  FETCH_RANDOM_NUMBER: BASE_URL + "/admin/randNum/",
  ADD_RANDOM_NUMBER: BASE_URL + "/admin/randNum/",
  UPDATE_RANDOM_NUMBER: BASE_URL + "/admin/randNum/${rid}",

  // 난수정보 조회가 뭐죠??
  // 관리자 app 등록은 어디서 하나요?

  FETCH_ADMIN_APP: BASE_URL + "/admin/app/",
  UPDATE_ADMIN_APP: BASE_URL + "/admin/app/${aid}",
  DELETE_ADMIN_APP: BASE_URL + "/admin/app/${aid}",

  FETCH_DISTRIBUTOR: BASE_URL + "/admin/distributor/",
  ADD_DISTRIBUTOR: BASE_URL + "/admin/distributor/",
  UPDATE_DISTRIBUTOR: BASE_URL + "/admin/distributor/${did}",
  DELETE_DISTRIBUTOR: BASE_URL + "/admin/distributor/${did}",

  FETCH_TAG_TYPE: BASE_URL + "/admin/tagType/",
  ADD_TAG_TYPE: BASE_URL + "/admin/tagType/",
  UPDATE_TAG_TYPE: BASE_URL + "/admin/tagType/${tid}",
  DELETE_TAG_TYPE: BASE_URL + "/admin/tagType/${tid}",

  // 코스토리 유통사 코드 띠용

  FETCH_BLACKLISI_REGION: BASE_URL + "fetchBlacklistRegion",
  ADD_BLACKLISI_REGION: BASE_URL + "addBlacklistRegion",
  DELETE_BLACKLISI_REGION: BASE_URL + "deleteBlacklistRegion"
};
