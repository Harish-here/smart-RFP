import Vue from 'vue';
import Router from 'vue-router';
import Create from '@/components/create';
import Display from '@/components/display';
import Question from '@/components/question';
import Proposal from '@/components/proposal';
import Review from '@/components/review';
import Send from '@/components/send';
import DisplayCorp from '@/components/displayCorp';
import Engaged from '@/components/engaged';
import Received from '@/components/received';

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
      path: '/proposal',
      name: 'proposal',
      component: Proposal,
    },
    {
      path: '/review',
      name: 'review',
      component: Review,
    },
    {
      path: '/send',
      name: 'send',
      component: Send,
    },
    {
      path: '/questions',
      name: 'Display',
      component: Display,
      children: [
        {path: '/questions/:category',component: Question }
      ]
    },
    {
      path: '/questionsCorp',
      name: 'displayCorp',
      component: DisplayCorp,
    },
    {
      path: '/engaged',
      name: 'engaged',
      component: Engaged,
    },
    {
      path: '/received',
      name: 'received',
      component: Received,
    }
  ],
});
