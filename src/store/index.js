import Vue from "vue";
import Vuex from "vuex";
/* import axios from "axios"; */

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    success: localStorage.getItem("success") || false,
    token: localStorage.getItem("token") || "",
  },
  mutations: {},
  getters: {
    getSuccess: (state) => state.success,
    getToken: (state) => state.token,
  },
  actions: {},
});
