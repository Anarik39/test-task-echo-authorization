const mutations = {
  authSuccess(state, { token, success }) {
    state.token = token;
    state.success = success;
  },
  logOutOfProfile(state) {
    state.token = "";
    state.success = false;
  }
};

export default mutations;
