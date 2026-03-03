import { createMemoryHistory, createRouter } from 'vue-router';
import 状态栏界面 from './状态栏/界面.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/状态栏', component: 状态栏界面 },
  ],
});
router.replace('/状态栏');

$(() => {
  createApp(状态栏界面).use(router).mount('#app');
});
