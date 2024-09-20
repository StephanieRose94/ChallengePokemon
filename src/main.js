import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router from './router'; 
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';

Vue.config.productionTip = false
Vue.use(Vuetify);

const vuetify = new Vuetify(
  {
    theme: {
      themes: {
        light: {
          primary: '#F22539',
          secondary: '#353535',
          accent: '#C00E20',
          info: '#BFBFBF',
          warning: '#ECA539',
        },
      },
    },
  }
);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
