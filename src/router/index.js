import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue"
import RegisterView from "../views/auth/RegisterView.vue"
import ForgotView from "../views/auth/ForgotView.vue"
import PrivateChatView from '../views/chat/privateChat'
let VueCookies = require('vue-cookies')

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {requireAuth: true}
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {requireAuth: true}
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView
  },
  {
    path: "/forgot",
    name: "forgot",
    component: ForgotView
  },
  {
    path: "/user/chat/:id",
    name: "privateChat",
    component: PrivateChatView
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
/*redireccionamiento en caso de no estar logeado */

router.beforeEach((to, from, next) =>{
  const rutaProtegida = to.matched.some((record) => record.meta.requireAuth)
  if(rutaProtegida && VueCookies.get('accessToken') === null){
    next({name: 'login'})
  }else{
    next()
  }
})

export default router;
