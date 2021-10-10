import axios from "axios";

const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "https://backend-front-test.dev.echo-company.ru/api/auth/login",
          data
        )
        .then(response => {
          const token = response.data.token;
          const success = response.data.success;
          commit("authSuccess", { token, success });
          resolve(response);
        })
        .catch(error => reject(error.response));
    });
  },
  registration({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "https://backend-front-test.dev.echo-company.ru/api/user/registration",
          data
        )
        .then(response => {
          const token = response.data.token;
          const success = response.data.success;
          commit("authSuccess", { token, success });
          resolve(response);
        })
        .catch(error => reject(error.response));
    });
  },
  forgotPasswordStart(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "https://backend-front-test.dev.echo-company.ru/api/user/forgot-start",
          data
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error.response));
    });
  },
  forgotPasswordEnd({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "https://backend-front-test.dev.echo-company.ru/api/user/forgot-end",
          data
        )
        .then(response => {
          const token = response.data.token;
          const success = response.data.success;
          commit("authSuccess", { token, success });
          resolve(response.data);
        })
        .catch(error => reject(error.response));
    });
  }
};

export default actions;
