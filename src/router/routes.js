import PageAuthorization from "../views/PageAuthorization";

const routes = [
  {
    path: "/",
    name: "Authorization",
    component: PageAuthorization
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: () =>
      import(
        /* webpackChunkName: "pageForgotPassword" */ "../views/PageForgotPassword.vue"
      )
  },
  {
    path: "/registration",
    name: "Registration",
    component: () =>
      import(
        /* webpackChunkName: "pageRegistration" */ "../views/PageRegistration.vue"
      )
  },
  {
    path: "/user",
    name: "User",
    component: () =>
      import(
        /* webpackChunkName: "pagePersonalUser" */ "../views/PagePersonalUser.vue"
      )
  },
  {
    path: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "pageNotFound" */ "../views/PageNotFound.vue")
  }
];

export default routes;
