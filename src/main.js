import "@babel/polyfill";
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "./plugins/bootstrap-vue";
import routes from "./routes";
import Router from "vue-router";
import { store } from "./store/index";
import NavBar from "./components/NavBar";
import firebase from "firebase";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

window.eventBus = new Vue();

Vue.config.productionTip = false;
let app;

Vue.use(Router);
Vue.use(BootstrapVue);

let router = new Router({
  routes
});

// TODO: FINAL PROJECT 加入用户功能
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && currentUser == null) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

new Vue({
  el: "#app",
  router,
  components: { NavBar },
  store,
  template: "<NavBar/>"
});
