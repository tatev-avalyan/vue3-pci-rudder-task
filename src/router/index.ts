import { createRouter, createWebHistory } from 'vue-router';

import PaymentView from '../views/PaymentView.vue';
import ThreeDSResultView from '../views/ThreeDSResultView.vue';

const routes = [
  {
    path: '/',
    name: 'PaymentView',
    component: PaymentView,
  },
  {
    path: '/3ds-simulated-callback',
    name: 'ThreeDSCallback',
    component: ThreeDSResultView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
