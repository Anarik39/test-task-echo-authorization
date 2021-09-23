import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import PageAuthorization from "../views/PageAuthorization.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Authorization",
    component: PageAuthorization,
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "pageNotFound" */ "../views/PageNotFound.vue"),
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: () =>
      import(/* webpackChunkName: "pageForgotPassword" */ "../views/PageForgotPassword.vue"),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () =>
      import(/* webpackChunkName: "pageRegistration" */ "../views/PageRegistration.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () =>
      import(/* webpackChunkName: "pagePersonalUser" */ "../views/PagePersonalUser.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const getTitleByRouteName = (routeName) => {
  return {
    Authorization: "Авторизация",
    User: "Личный кабинет",
    NotFound: "Страница не найдена",
    ForgotPassword: "Забыл пароль",
    Registration: "Регистрация",
  }[routeName];
};

router.afterEach((to) => {
  document.title = getTitleByRouteName(to.name);
});

router.beforeEach((to, from, next) => {
  if (to.name === "User" && !store.getters["getSuccess"]) {
    next({ name: "Authorization" });
  } else {
    next();
  }
});

export default router;
