import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: { name: 'login' }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/select-customer',
    name: 'select-customer',
    component: () => import(/* webpackChunkName: "select-customer",webpackPrefetch: 1 */ '@/views/SelectCustomer.vue')
  },
  {
    path: '/register-customer',
    name: 'register-customer',
    component: () =>
      import(/* webpackChunkName: "select-customer", webpackPrefetch: 1 */ '@/views/RegisterCustomer.vue')
  },
  {
    path: '/customer-actions',
    name: 'customer-actions',
    component: () => import(/* webpackChunkName: "select-customer", webpackPrefetch: 1 */ '@/views/CustomerActions.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import(/* webpackChunkName: "products", webpackPrefetch: 2 */ '@/views/Products.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
