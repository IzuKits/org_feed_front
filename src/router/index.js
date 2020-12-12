import Vue from 'vue';
import Router from 'vue-router';
import Announcement from '@/components/Announcement';
import Profile from '@/components/Profile';
import Login from '@/components/Login';
import MainPage from '@/components/MainPage';
import NewPost from '@/components/NewPost';
import Post from '@/components/Post';
import UserPosts from '@/components/UserPosts';
import AdminPanel from '@/components/AdminPanel/AdminPanel';
import NoAccess from '@/components/AdminPanel/NoAccess';
import Consideration from '@/components/AdminPanel/Consideration';
import AdminPost from '@/components/AdminPanel/AdminPost';
import Subunits from '@/components/AdminPanel/Subunits';
import EditPost from '@/components/AdminPanel/EditPost';
import PostsBySubunit from '@/components/AdminPanel/PostsBySubunit';
import News from '../components/News';
import Cookies from '../components/cookie_tools';
import HTTP from '../components/http-common';


Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/noaccess',
      name: 'NoAccess',
      component: NoAccess,
    },
    {
      path: '/admin',
      name: 'AdminPanel',
      component: AdminPanel,
      meta: {
        admin: true,
      },
      children: [
        {
          path: 'consideration',
          name: 'consideration',
          component: Consideration,
        },
        {
          path: 'post/:id',
          name: 'adminpost',
          component: AdminPost,
        },
        {
          path: 'subunits',
          name: 'subunits',
          component: Subunits,
        },
        {
          path: 'subunit/posts/:id',
          name: 'sumunitposts',
          component: PostsBySubunit,
        },
        {
          path: 'post/:id/edit',
          name: 'editpost',
          component: EditPost,
        },
      ],
    },
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

function getUserRole(callback) {
  HTTP.get('/employee/id').then((response) => {
    const id = response.data.id;
    // eslint-disable-next-line no-shadow
    HTTP.get('/employee?id='.concat(id)).then((response) => {
      // eslint-disable-next-line no-unused-expressions
      callback(response.data.user_type);
    }).catch(() => { 'error'; });
  }).catch(() => { 'error'; });
}

router.beforeEach((to, from, next) => {
  const isAuth = Cookies.getCookie('at') !== undefined;
  if (to.matched.some(record => record.meta.guest)) {
    next({
      query: { redirect: to.fullPath },
    });
  } else if (to.matched.some(record => record.meta.admin)) {
    getUserRole((result) => {
      if (result === 'moderator' || result === 'admin') {
        next({ query: { redirect: to.fullPath } });
      } else {
        next({ path: '/noaccess',
          redirect: to.fullPath });
      }
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
