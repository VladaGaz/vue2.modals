import Vue from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

new Vue({
  render: h => h(App),
}).$mount('#app')
