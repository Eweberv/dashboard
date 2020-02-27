import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
        path: '/home',
        name: 'myServices',
        component: Home
    },
];

const router = new VueRouter({
    mode: 'history', //enlève le # dans les liens
    routes
});

export default router
