import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/app/App'

import DefaultStyles from '@/styles/default.scss'

Vue.use(Vuex);

import store from '@/store/index';


const vm = new Vue({
  el: '#app',
  store,
  components: {
    App
  },
});

export default vm
