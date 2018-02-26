import Vue from 'vue';
import Router from 'vue-router';
import RfpCreate from '@/components/corporate/RfpCreate';
import Display from '@/components/display';
import Trash from '@/components/trash';
import Question from '@/components/question';
import Proposal from '@/components/proposal';
import Review from '@/components/review';
import Preview from '@/components/preview';
import RfpQuestions from '@/components/corporate/RfpQuestions';
import Engaged from '@/components/engaged';
import RfpList from '@/components/corporate/RfpList';
import RfpSend from '@/components/corporate/RfpSend';
import RfpPreview from '@/components/corporate/RfpPreview';
import RfpQuoteList from '@/components/corporate/RfpQuoteList';
import RfpQuoteReview from '@/components/corporate/RfpQuoteReview';
import RfpConnected from '@/components/corporate/RfpConnected';
import RfpDraft from '@/components/corporate/RfpDraft';
import RfpTrash from '@/components/corporate/RfpTrash';
import RfpQuestionPreview from '@/components/corporate/RfpQuestionPreview';
Vue.use(Router);

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/:foo(.*?)/corprate/create',
      name: 'RfpCreate',
      component: RfpCreate,
    },
    {
      path: '/:foo(.*?)/hotel/',
      name: 'proposal',
      component: Proposal,
    },
    {
      path: '/:foo(.*?)/hotel/trash',
      name: 'trash',
      component: Trash,
    },
    {
      path: '/:foo(.*?)/hotel/review/:rid/:stat',
      name: 'review',
      component: Review,
    },
    {
      path: '/:foo(.*?)/corprate/send',
      name: 'RfpSend',
      component: RfpSend,
    },
    {
      path: '/:foo(.*?)/hotel/questions',
      name: 'display',
      component: Display
    },
    {
      path: '/:foo(.*?)/corprate/questions',
      name: 'RfpQuestions',
      component: RfpQuestions,
    },
    {
      path: '/:foo(.*?)/corprate/connected',
      name: 'RfpConnected',
      component: RfpConnected,
    },
    {
      path: '/:foo(.*?)/hotel/engaged',
      name: 'engaged',
      component: Engaged,
    },
    {
      path: '/:foo(.*?)/hotel/preview',
      name: 'preview',
      component: Preview,
    },
    {
      path: '/:foo(.*?)/corprate',
      name: 'RfpList',
      component: RfpList,
    },
    {
      path: '/:foo(.*?)/corprate/draft',
      name: 'RfpDraft',
      component: RfpDraft,
    },
    {
      path: '/:foo(.*?)/corprate/preview',
      name: 'RfpPreview',
      component: RfpPreview,
    },
    {
      path: '/:foo(.*?)/corprate/quotelist/:id',
      name: 'RfpQuoteList',
      component: RfpQuoteList,
    },
    {
      path: '/:foo(.*?)/corprate/quotereview/:rid/:hid/:ty',
      name: 'RfpQuoteReview',
      component: RfpQuoteReview,
    },
    {
      path: '/:foo(.*?)/corprate/questionview/:id/:type',
      name: 'RfpQuestionPreview',
      component: RfpQuestionPreview,
    },
    {
      path: '/:foo(.*?)/corprate/trash',
      name: 'RfpTrash',
      component: RfpTrash,
    }
  ],
});
