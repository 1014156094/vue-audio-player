import AudioPlayer from './index.vue'

AudioPlayer.install = (Vue) => {
  Vue.component(AudioPlayer.name, AudioPlayer)
}

export default AudioPlayer
