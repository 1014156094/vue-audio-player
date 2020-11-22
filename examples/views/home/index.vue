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
        'https://www.0dutv.com/upload/dance/20200316/C719452E3C7834080007662021EA968E.mp3',
        'https://www.0dutv.com/upload/dance/F25F74A0B8FF82503241801D0E2CA5CD.mp3'
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
