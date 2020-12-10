import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ht from 'hammer-touchemulator'
// import AudioPlayer from '../packages'

const isMobile = /(iPhone|iPad|iPod|iOS|Android)/i.test(window.navigator.userAgent)

if (!isMobile) {
  ht()
}
Vue.config.productionTip = false
// Vue.use(AudioPlayer)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
