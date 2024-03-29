import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';


const routes = [
  {
    path: '/',
    name: 'HomeScreen',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'DashboardScreen',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'LoginScreen',
    component: Login,
  },
  {
    path: '/register',
    name: 'RegisterScreen',
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;






