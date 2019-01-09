import AudioPlayer from './audio-player'

const install = Vue => {
  Vue.component(AudioPlayer.name, AudioPlayer)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  AudioPlayer
}
