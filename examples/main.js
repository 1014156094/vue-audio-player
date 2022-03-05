import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Vue.use(AudioPlayer)
// import AudioPlayer from '../packages'

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
