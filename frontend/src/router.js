import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "login",
      component: () => import("./views/Login")
    },
    {
      path: "/createAccount/",
      name: "createAccount",
      component: () => import("./views/CreateAccount")
    },
    {
      path: "/posts/",
      name: "posts",
      component: () => import("./views/Posts")
    },
    {
      path: "/addPost/",
      name: "addPost",
      component: () => import("./views/AddPost")
    },
    {
      path: "/posts/:id",
      name: "post",
      component: () => import("./views/Post")
    },
    {
      path: "/profile/",
      name: "profile",
      component: () => import("./views/Profile")
    }
  ]
});