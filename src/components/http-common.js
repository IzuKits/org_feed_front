import axios from 'axios';
import Cookies from './cookie_tools';

const HTTP = axios.create({
  baseURL: 'http://0.0.0.0:5000/api/v1',
  timeout: 10000,
  withCredentials: false,
  headers: {
    Authorization: 'Bearer '.concat(Cookies.getCookie('at')),
    'Access-Control-Allow-Origin': '*',
  },
});

HTTP.interceptors.response.use(response => response,
  (error) => {
    // const originalRequest = error.config;
    // eslint-disable-next-line no-console
    if (error.message === 'Network Error') {
      // eslint-disable-next-line no-alert
      alert('500');
      console.log(error);
    }
  },
);
/* HTTP.interceptors.response.use(
  res => res,
  (error) => {
    // eslint-disable-next-line no-console
    console.log(error);
    if (error.response.status === 401) {
      const header = { Authorization: 'Bearer '.concat(Cookies.getCookie('rt')) };
      HTTP.post('/employee/auth/refresh', header).then((response) => {
        Cookies.setCookie('at', response.data.access_token);
        Cookies.setCookie('rt', response.data.refresh_token);

        HTTP.defaults.headers.post.Authorization = response.data.access_token;

        return HTTP(originalRequest);
      }).catch(() => {
        this.$router.push('login');
      });
    }
  },
);
*/
export default HTTP;

