import Vue from 'vue'
import Router from 'vue-router'
import NumForecast from '@/pages/NumForecast'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: '数值预报',
      component: NumForecast
    }
  ]
});
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.name) {
    document.title = to.name
  }
  next();
});
export default router;
