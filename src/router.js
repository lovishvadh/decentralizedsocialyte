import Vue from "vue";
import auth from "./auth.js";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SignUp from "./views/SignUp/SignUp.vue";
import Login from "./views/Login/Login.vue";
import MainWall from "./views/MainWall/MainWall.vue";
import Profile from "./views/Profile/Profile.vue";

Vue.use(Router);

export default new Router({
  // mode: "history",
  // base: __dirname,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/wall",
      name: "mainwall",
      component: MainWall,
      beforeEnter: requireAuth
    },
    {
      path: "/logout",
      beforeEnter(to, from, next) {
        auth.logout();
        next("/");
      }
    },
    {
      path: "/user/:id",
      name: "userprofile",
      component: Profile,
      props: true,
      beforeEnter: requireAuth
    }
  ]
});

function requireAuth(to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}
