import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {Utils} from './mixins/utils.js'
import axios from 'axios'

Vue.use(BootstrapVue);

Vue.config.productionTip = false


Vue.mixin(Utils)

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

window.axios = axios.create({
  baseURL: 'http://coop.api.netlor.fr/api',
  params : { token : false },
  headers: { Authorization : 'Token token=248b41df759045a8b0d15f61af192e52'}
});
//bc5ae055cf864a4a83758d7104b0a516
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.commit('initialiseStore');
  }
}).$mount('#app')
