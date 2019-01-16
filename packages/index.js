import './fonts'
import AudioPlayer from './audio-player/index.vue'

const components = [
  AudioPlayer
]

const install = Vue => {
  components.forEach(Component => {
    Vue.component(Component.name, Component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  AudioPlayer
}

export default {
  install
}
