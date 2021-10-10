import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const getTitleByRouteName = routeName => {
  return {
    Authorization: "Авторизация",
    User: "Личный кабинет",
    NotFound: "Страница не найдена",
    ForgotPassword: "Забыл пароль",
    Registration: "Регистрация"
  }[routeName];
};

router.afterEach(to => {
  document.title = getTitleByRouteName(to.name);
  if (
    to.path === "/" ||
    to.path === "/forgotpassword" ||
    to.path === "/registration"
  ) {
    store.commit("profile/logOutOfProfile");
  }
});

router.beforeEach((to, from, next) => {
  if (to.path === "/user" && !store.getters["profile/getSuccess"]) {
    next({ name: "Authorization" });
  } else {
    next();
  }
});

export default router;
