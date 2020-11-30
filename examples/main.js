import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ht from 'hammer-touchemulator'
// import AudioPlayer from '../packages'

ht()
Vue.config.productionTip = false
// Vue.use(AudioPlayer)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
