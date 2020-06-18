import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { isMobileOnly } from 'mobile-device-detect';
import Loading from 'vue-loading-overlay';
// Import Loader stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

// Init plugin
Vue.use(Loading);

Vue.config.productionTip = false;

//Set global read only variable;
Vue.mixin({
  data: function() {
    return {
      get $isMobileOnly() {
        return isMobileOnly;
      }
    };
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
