import Constant from "../constant";

export default {
  [Constant.LOG_IN]: (state, payload) => {
    state.token = payload.token;
    state.user = payload.user;
    this.$axios.defaults.headers.common["Authorization"] =
      "basic " + btoa(payload.token + ":");
  },
  [Constant.LOG_OUT]: state => {
    state.token = "";
    state.user = {
      email: "",
      id: -1,
      name: "",
      role: ""
    };
    this.$axios.defaults.headers.common["Authorization"] = "";
  },
  [Constant.SHOW_LOADING]: (state, isLoading) => {
    state.isLoading = isLoading;
  }
};
