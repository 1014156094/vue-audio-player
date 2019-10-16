<template>
  <div>
    <AudioPlayer
      :audio-list="audioList"
      :before-play="onBeforePlay"
    />
  </div>
</template>

<script>
// import { AudioPlayer } from '@liripeng/vue-audio-player'
// import '@liripeng/vue-audio-player/lib/vue-audio-player.css'
import { AudioPlayer } from '../../../packages'

export default {
  components: {
    AudioPlayer
  },
  data() {
    return {
      audioList: [
        'http://txh-cdn.96qbhy.com/20180817175211dtC1vE3z.mp3',
        'http://txh-cdn.96qbhy.com/20181106105737sOcozMqw.mp3'
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
