import { createRouter, createWebHistory } from 'vue-router';
import AuthLayout from '../layouts/AuthLayout.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import AuthMiddleware from '@/utils/middleware';
import VueRouteMiddleware from 'vue-route-middleware';

const routes = [
  {
    path: '/authLayout',
    name: 'AuthLayout',
    component: AuthLayout,
    children: [
      {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "Register" */ '@/views/auth/Register.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '@/views/auth/Login.vue'),
      },
      {
        path: '/reset-password',
        name: 'ResetPassword',
        component: () => import(/* webpackChunkName: "ResetPassword" */ '@/views/auth/ResetPassword.vue'),
      },
      {
        path: '/verify-password',
        name: 'VerifyPassword',
        component: () => import(/* webpackChunkName: "VerifyPassword" */ '@/views/auth/VerifyPassword.vue'),
      },
      {
        path: '/new-password',
        name: 'NewPassword',
        component: () => import(/* webpackChunkName: "NewPassword" */ '@/views/auth/NewPassword.vue'),
      },
    ],
  },
  {
    path: '/onboard',
    name: 'Onboard',
    meta: {
      middleware: [AuthMiddleware],
    },
    component: () => import(/* webpackChunkName: "Onboard" */ '@/views/auth/Onboard.vue'),
  },
  {
    path: '/dashboardLayout',
    name: 'DashboardLayout',
    component: DashboardLayout,
    children: [
      {
        path: '/jobs',
        name: 'Jobs',
        component: () => import(/* webpackChunkName: "Jobs" */ '@/views/Jobs.vue'),
        meta: {
          title: '',
          text: '',
          middleware: [AuthMiddleware],
        },
      },
      {
        path: '/jobs/:id',
        name: 'Jobs-Description',
        component: () => import(/* webpackChunkName: "SingleJob" */ '@/views/JobDescription.vue'),
        meta: {
          middleware: [AuthMiddleware],
        },
      },
      {
        path: '/applied',
        name: 'Applied',
        component: () => import(/* webpackChunkName: "Applied" */ '@/views/Applied.vue'),
        meta: {
          title: 'Applications',
          text: 'Here is all the jobs you have applied for',
          middleware: [AuthMiddleware],
        },
      },
      {
        path: '/applied/:id/:name',
        name: 'Applications-Description',
        component: () => import(/* webpackChunkName: "SingleApplication" */ '@/views/ApplicationDescription.vue'),
        meta: {
          middleware: [AuthMiddleware],
        },
      },
      {
        path: '/assessment',
        name: 'Assessment',
        component: () => import(/* webpackChunkName: "Assessment" */ '@/views/Assessment.vue'),
        meta: {
          title: 'Assessments',
          text: '',
          middleware: [AuthMiddleware],
        },
      },
      {
        path: '/wallet',
        name: 'Wallet',
        component: () => import(/* webpackChunkName: "Wallet" */ '@/views/Wallet.vue'),
        meta: {
          title: 'Wallet',
          text: '',
          middleware: [AuthMiddleware],
        },
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Assessment" */ '@/views/Profile.vue'),
        meta: {
          title: 'Edit your Tamborin Profile',
          text: '',
          middleware: [AuthMiddleware],
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(VueRouteMiddleware({ AuthMiddleware }));

export default router;
