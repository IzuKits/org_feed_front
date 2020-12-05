import axios from 'axios';

const HTTP = axios.create({
  baseURL: 'http://0.0.0.0:5000/api/v1',
  timeout: 10000,
  withCredentials: false,
  headers: {
    'Authorization': 'Bearer '.concat(localStorage.getItem('at')),
  }
})

HTTP.interceptors.response.use(
  res => {return res},
  error => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      header = {'Authorization':'Bearer '.concat(localStorage.getItem('rt')),}
      HTTP.post('/employee/auth/refresh', header).then((response) => {
        localStorage.setItem('at', response.data.access_token);
        localStorage.setItem('rt', response.data.refresh_token);

        HTTP.defaults.headers.post['Authorization'] = response.data.access_token;

        return HTTP(originalRequest)
      }).catch((error) => {
        this.$router.push('login');
      })
    }
  }
)

export default HTTP;

