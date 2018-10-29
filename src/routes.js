import Login from "./components/Login";
import App from "./App";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import About from "./components/About";
import FeedList from "./components/FeedList";
import LandingPage from "./components/LandingPage";

const routes = [
  {
    path: "/",
    name: "home-page",
    component: LandingPage,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/list",
    name: "list",
    component: FeedList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/about",
    name: "about",
    component: LandingPage,
    meta: {
      requiresGuest: true
    }
  }
];

export default routes;

// AUTH GUARD
