import Vue from 'vue';
import Router from 'vue-router';
import News from '@/components/News';
import Announcement from '@/components/Announcement';
import Profile from '@/components/Profile';
import Login from '@/components/Login';

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
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
  mode: 'history',
});
