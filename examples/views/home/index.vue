<template>
  <div>
    <AudioPlayer
      :audio-list="audioList"
      :before-play="onBeforePlay"
    />
  </div>
</template>

<script>
import { AudioPlayer } from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'
// import { AudioPlayer } from '../../../packages'

export default {
  components: {
    AudioPlayer
  },
  data() {
    return {
      audioList: [
        'http://up_mp4.t57.cn/2018/1/03m/13/396131229550.m4a',
        'http://up_mp4.t57.cn/2017/1/11m/11/304112004168.m4a'
      ]
    }
  },
  methods: {
    // 播放前做的事
    onBeforePlay(next) {
      // 这里可以做一些事情...

      next() // 开始播放
    }
  }
}
</script>

<style>
</style>
