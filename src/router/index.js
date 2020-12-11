import Vue from 'vue';
import Router from 'vue-router';
import Announcement from '@/components/Announcement';
import Profile from '@/components/Profile';
import Login from '@/components/Login';
import MainPage from '@/components/MainPage';
import NewPost from '@/components/NewPost';
import Post from '@/components/Post';
import UserPosts from '@/components/UserPosts';
import News from '../components/News';
import Cookies from '../components/cookie_tools';


Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/u',
      name: 'u',
      component: MainPage,
      children: [
        {
          path: 'news',
          name: 'news',
          component: News,
        },
        {
          path: 'announcements',
          name: 'announcements',
          component: Announcement,
        },
        {
          path: 'profile',
          name: 'profile',
          component: Profile,
        },
        {
          path: 'newpost',
          name: 'newpost',
          component: NewPost,
        },
        {
          path: 'post/:id',
          name: 'post',
          component: Post,
        },
        {
          path: 'myposts',
          name: 'myposts',
          component: UserPosts,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true,
      },
    },
  ],
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const isAuth = Cookies.getCookie('at') !== undefined;
  if (to.matched.some(record => record.meta.guest)) {
    next({
      query: { redirect: to.fullPath },
    });
  }
  if (!isAuth) {
    next({ path: '/login',
      redirect: to.fullPath });
  } else {
    next({
      query: { redirect: to.fullPath },
    });
  }
});
export default router;
