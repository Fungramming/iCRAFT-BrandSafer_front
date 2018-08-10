import Constant from "../constant";
import axios from "axios";

export default {
  [Constant.LOG_IN]: (state, payload) => {
    state.token = payload.token;
    state.user = payload.user;
    axios.defaults.headers.common["Authorization"] =
      "basic " + btoa(payload.token + ":");
  },
  [Constant.LOG_OUT]: state => {
    state.token = "";
    state.user = {
      id: -1,
      companyCode: "",
      companyName: "",
      role: ""
    };
    axios.defaults.headers.common["Authorization"] = "";
  },
  [Constant.SHOW_LOADING]: (state, isLoading) => {
    state.isLoading = isLoading;
  },
  [Constant.SHOW_MODAL]: (state, payload) => {
    console.log("payload :", payload);
    state.isModal = payload.isModal;
    state.modalText = payload.modalText;
  },
  [Constant.FETCH_LIVE_STATUS]: (state, payload) => {
    state.liveStatus = payload;
  },
  [Constant.FETCH_WEEKLY_STATUS]: (state, payload) => {
    state.weeklyStatus = payload;
  },
  [Constant.FETCH_MONTHLY_STATUS]: (state, payload) => {
    state.monthlyStatus = payload;
  }
};
