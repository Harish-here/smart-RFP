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
      path: '/:foo(.*?)/corprate/',
      name: 'Create',
      component: Create,
    },
    {
      path: '/:foo(.*?)/hotel/',
      name: 'proposal',
      component: Proposal,
    },
    {
      path: '/:foo(.*?)/hotel/review',
      name: 'review',
      component: Review,
    },
    {
      path: '/:foo(.*?)/corprate/send',
      name: 'send',
      component: Send,
    },
    {
      path: '/:foo(.*?)/hotel/questions',
      name: 'Display',
      component: Display
    },
    {
      path: '/:foo(.*?)/corprate/questions',
      name: 'displayCorp',
      component: DisplayCorp,
    },
    {
      path: ':foo(.*?)/hotel/engaged',
      name: 'engaged',
      component: Engaged,
    },
    {
      path: '/:foo(.*?)/corprate/received',
      name: 'received',
      component: Received,
    }
  ],
});
