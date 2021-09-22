import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    success: localStorage.getItem("success") || false,
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    auth_success(state, { token, success }) {
      state.success = success;
      state.token = token;
    },
  },
  getters: {
    getSuccess: (state) => state.success,
    getToken: (state) => state.token,
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("https://backend-front-test.dev.echo-company.ru/api/auth/login", data)
          .then((resp) => {
            const token = resp.data.token;
            const success = resp.data.success;
            localStorage.setItem("token", token);
            localStorage.setItem("success", success);
            commit("auth_success", { token, success });
            resolve(resp);
          })
          .catch((err) => reject(err.response));
      });
    },
  },
});
