import Vue from 'vue';
import Router from 'vue-router';
import Create from '@/components/create';
import Display from '@/components/display';
import Question from '@/components/question';

Vue.use(Router);

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'Create',
      component: Create,
    },
    {
      path: '/questions',
      name: 'Display',
      component: Display,
      children: [
        {path: '/questions/:category',component: Question }
      ]
    },
  ],
});
