import Vue from 'vue'
import App from './App'
import api from './api/index.js'
// 注册全局modal组件
import chunLeiModal from '@/components/chunLei-modal/chunLei-modal.vue';

Vue.config.productionTip = false

Vue.prototype.$api = api;

App.mpType = 'app'

const app = new Vue({
    ...App
})
Vue.component('chunLei-modal',chunLeiModal);
app.$mount()
