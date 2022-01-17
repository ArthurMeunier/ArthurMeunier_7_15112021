import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "Login",
      component: () => import("./views/Login")
    },
    {
      path: "/createAccount/",
      name: "createAccount",
      component: () => import("./views/CreateAccount")
    },
    {
      path: "/posts/",
      name: "Posts",
      component: () => import("./views/Posts")
    },
    {
      path: "/addPost/",
      name: "AddPost",
      component: () => import("./views/AddPost")
    },
    {
      path: "/posts/:id",
      name: "Post",
      component: () => import("./views/Post")
    },
    {
      path: "/profile/",
      name: "Profile",
      component: () => import("./views/Profile")
    },
    {
      path: "/admin/",
      name: "Admin",
      component: () => import("./views/Admin")
    },
    {
      path: '*',
      redirect: 'posts'
    }
  ]
});