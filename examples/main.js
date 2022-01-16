import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Vue.use(AudioPlayer)
// import AudioPlayer from '../packages'

const app = createApp(App)

app.use(router)
app.mount('#app')
