// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import App from './App';
import VueResource from 'vue-resource';

import './common/stylus/index.styl';

Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render使用存疑？？？？？？？？？？？？？？？？？？？？？？？？
  render: h => h(App)
});
