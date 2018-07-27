import Constant from "../constant";

export default {
  [Constant.LOG_IN]: (store, payload) => {
    store.commit(Constant.LOG_IN, payload);
  },
  [Constant.LOG_OUT]: store => {
    store.commit(Constant.LOG_OUT);
  }
};
