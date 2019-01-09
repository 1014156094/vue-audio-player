// 导入组件，组件必须声明 name
import AudioPlayer from './index.vue'

// 为组件添加 install 方法，用于按需引入
AudioPlayer.install = function (Vue) {
  Vue.component(AudioPlayer.name, AudioPlayer)
}

export default AudioPlayer
