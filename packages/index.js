import VueAudioPlayer from './index.vue'

VueAudioPlayer.install = (Vue) => {
  Vue.component(VueAudioPlayer.name, VueAudioPlayer)
}

export default VueAudioPlayer
