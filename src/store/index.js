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
    authSuccess(state, { token, success }) {
      state.token = token;
      localStorage.setItem("token", token);
      state.success = success;
      localStorage.setItem("success", success);
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
            commit("authSuccess", { token, success });
            resolve(resp);
          })
          .catch((err) => reject(err.response));
      });
    },
    registration({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("https://backend-front-test.dev.echo-company.ru/api/user/registration", data)
          .then((resp) => {
            const token = resp.data.token;
            const success = resp.data.success;
            commit("authSuccess", { token, success });
            resolve(resp);
          })
          .catch((err) => reject(err.response));
      });
    },
    forgotPasswordStart(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("https://backend-front-test.dev.echo-company.ru/api/user/forgot-start", data)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => reject(err.response));
      });
    },
    forgotPasswordEnd({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("https://backend-front-test.dev.echo-company.ru/api/user/forgot-end", data)
          .then((resp) => {
            const token = resp.data.token;
            const success = resp.data.success;
            commit("authSuccess", { token, success });
            resolve(resp.data);
          })
          .catch((err) => reject(err.response));
      });
    },
  },
});
