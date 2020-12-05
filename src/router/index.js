import Vue from 'vue';
import Router from 'vue-router';
import News from '@/components/News';
import Announcement from '@/components/Announcement';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/news',
      name: 'news',
      component: News,
    },
    {
      path: '/announcements',
      name: 'announcements',
      component: Announcement,
    },
  ],
  mode: 'history',
});
