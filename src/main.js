import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import VueMq from 'vue-mq';
import App from './App.vue';
import router from './router';
import store from './store';
// Import Loader stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueMq, {
  breakpoints: {
    // default breakpoints - customize this
    mobile: 600,
    tablet: 1240,
    others: Infinity
  }
});

// Init plugin
Vue.use(Loading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
