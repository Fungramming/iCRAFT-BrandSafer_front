import Constant from "../constant";
import axios from "axios";

export default {
  [Constant.LOG_IN]: (state, payload) => {
    state.token = payload.token;
    state.user.id = payload.userId;
    axios.defaults.headers.common["Authorization"] =
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
    axios.defaults.headers.common["Authorization"] = "";
  },
  [Constant.SHOW_LOADING]: (state, isLoading) => {
    state.isLoading = isLoading;
  }
};