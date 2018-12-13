// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueLazyload from 'vue-lazyload'
import store from './store'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'; 
import loading from './common/imgs/1.gif'
import {Button} from 'mint-ui'
import './filters'
import FastClick from 'fastclick'

FastClick.attach(document.body)

require('./mock/mockServer.js')
Vue.use(VueLazyload,{
  loading
})
Vue.use(Mint);
Vue.config.productionTip = false;
Vue.component(Button.name,Button)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  Mint
});
