import Vue from 'vue';
import Router from 'vue-router';
import Create from '@/components/create';
import Display from '@/components/display';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Create',
      component: Create,
    },
    {
      path: '/display',
      name: 'Display',
      component: Display,
    },
  ],
});
