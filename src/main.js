import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import AudioPlayer from '../packages'
// import AudioPlayer from '@liripeng/vue-audio-player'
// import '@liripeng/vue-audio-player/lib/vue-audio-player.css'

Vue.config.productionTip = false

// Vue.use(AudioPlayer)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
