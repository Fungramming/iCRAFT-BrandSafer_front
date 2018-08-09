var BASE_URL =
  "http://brandsaferapi-env-2.bkktdgvb3w.ap-northeast-2.elasticbeanstalk.com/api/v1.0";
// var BASE_URL = "http://localhost:5000/api/v1.0";

export default {
  PAGESIZE: 5,

  /* ========= User ========= */
  // Auth
  LOG_IN: `${BASE_URL}/tokens/`,
  // Password
  UPDATE_PASSWORD: `${BASE_URL}/users/\${uid}`,
  RESET_PASSWORD: `${BASE_URL}/users/\${uid}/pwReset`,

  //막 쓰기
  // 기간설정, 고객사 선택
  FETCH_LIVE_STATUS: `${BASE_URL}/dashboard1/`, // 모든 유저가저와서 계산해야됨
  FETCH_MONTHLY_STATUS: `${BASE_URL}/dashboard2/`, // 모든 유저가저와서 계산해야됨

  FETCH_USER_DASHBOARD: `${BASE_URL}/users/\${uid}`,

  // 기간설정
  FETCH_PRODUCT_CERIT: `${BASE_URL}/prod-cert/`, // query, page

  // FETCH_PRODUCT: ${BASE_URL}/prod/,
  // ADD_PRODUCT: ${BASE_URL}/prod/,
  // UPDATE_PRODUCT: ${BASE_URL}/prod/${pid},
  // DELETE_PRODUCT: ${BASE_URL}/prod/${pid},
  // SEARCH_PRODUCT: ${BASE_URL}/prod/search,

  FETCH_APP_LELEASE: `${BASE_URL}/apps/`, // query, page
  ADD_APP_LELEASE: `${BASE_URL}/apps/`,
  UPDATE_APP_LELEASE: `${BASE_URL}/apps/\${aid}`,
  DELETE_APP_LELEASE: `${BASE_URL}/apps/\${aid}`,

  // FETCH_APP: ${BASE_URL}fectchApp,

  FETCH_COMPANY: `${BASE_URL}/company/`,
  ADD_COMPANY: `${BASE_URL}/company/`,
  UPDATE_COMPANY: `${BASE_URL}/company/\${cid}`,

  FETCH_CUSTOMER: `${BASE_URL}/admin/customer/`, // query, page
  ADD_CUSTOMER: `${BASE_URL}/admin/customer/`,
  UPDATE_CUSTOMER: `${BASE_URL}/admin/customer/\${cid}`,

  FETCH_ICRAFT_USER: `${BASE_URL}/admin/icrf-users/`, // query, page
  FETCH_ICRAFT_USER_ID: ` ${BASE_URL}/admin/icrf-users/\${uid}`,
  ADD_ICRAFT_USER: `${BASE_URL}/admin/icrf-users/`,
  UPDATE_ICRAFT_USER: `${BASE_URL}/admin/icrf-users/\${uid}`,
  DELETE_ICRAFT_USER: ` ${BASE_URL}/admin/icrf-users/\${uid}`,

  FETCH_USERS: `${BASE_URL}/users/`,
  ADD_USERS: `${BASE_URL}/users/`,
  FETCH_USER: `${BASE_URL}/users/\${uid}`,
  ADD_USER: `${BASE_URL}/users/\${uid}`,
  UPDATE_USER: ` ${BASE_URL}/users/\${uid}`,
  DELETE_USER: `${BASE_URL}/users/\${uid}`,

  FETCH_ACCOUNT_LOG: `${BASE_URL}/admin/access/`, // query, page

  // 권한관리 서버와 의논 필요

  FETCH_BLACKLIST: `${BASE_URL}/admin/blacklist/`, // query, page
  ADD_BLACKLIST: `${BASE_URL}/admin/blacklist/`,
  DELETE_BLACKLIST: `${BASE_URL}/admin/blacklist/\${bid}`,

  FETCH_OVER_CERT: ` ${BASE_URL}/admin/over-cert/`, // query, page

  FETCH_RANDOM_NUMBER: `${BASE_URL}/admin/randNum/`, // query, page
  ADD_RANDOM_NUMBER: ` ${BASE_URL}/admin/randNum/`,
  UPDATE_RANDOM_NUMBER: `${BASE_URL}/admin/randNum/\${rid}`,

  // 난수정보 조회가 뭐죠??
  // 관리자 app 등록은 어디서 하나요?

  FETCH_ADMIN_APP: `${BASE_URL}/admin/app/`,
  ADD_ADMIN_APP: `${BASE_URL}/admin/app/`,
  UPDATE_ADMIN_APP: `${BASE_URL}/admin/app/\${aid}`,
  // DELETE_ADMIN_APP: ${BASE_URL}/admin/app/${aid},

  FETCH_DISTRIBUTOR: `${BASE_URL}/admin/distributor/`,
  ADD_DISTRIBUTOR: `${BASE_URL}/admin/distributor/`,
  UPDATE_DISTRIBUTOR: `${BASE_URL}/admin/distributor/\${did}`,
  DELETE_DISTRIBUTOR: `${BASE_URL}/admin/distributor/\${did}`,

  FETCH_TAG_TYPE: `${BASE_URL}/admin/tag-type/`,
  ADD_TAG_TYPE: `${BASE_URL}/admin/tag-type/`,
  UPDATE_TAG_TYPE: ` ${BASE_URL}/admin/tag-type/\${tid}`,
  DELETE_TAG_TYPE: `${BASE_URL}/admin/tag-type/\${tid}`

  // 코스토리 유통사 코드 띠용

  // FETCH_BLACKLISI_REGION: ${BASE_URL}fetchBlacklistRegion,
  // ADD_BLACKLISI_REGION: ${BASE_URL}addBlacklistRegion,
  // DELETE_BLACKLISI_REGION: ${BASE_URL}deleteBlacklistRegion
};
