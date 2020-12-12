// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import HTTP from './components/http-common';

Vue.config.productionTip = false;
// eslint-disable-next-line import/prefer-default-export
export const eventBus = new Vue();

export function getRole(callback) {
  HTTP.get('/employee/id').then((response) => {
    // eslint-disable-next-line no-shadow
    HTTP.get('/employee?id='.concat(response.data.id)).then((response) => {
      callback(response.data.user_type);
    });
  });
}
export function getEmployee(callback) {
  HTTP.get('/employee/id').then((response) => {
    // eslint-disable-next-line no-shadow
    HTTP.get('/employee?id='.concat(response.data.id)).then((response) => {
      callback(response.data);
    });
  });
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
