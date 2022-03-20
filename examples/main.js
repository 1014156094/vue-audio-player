import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import AudioPlayer from '@liripeng/vue-audio-player';

const app = createApp(App)

// app.use(AudioPlayer)
app.use(router)
app.mount('#app')
