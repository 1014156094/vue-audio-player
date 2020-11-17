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
        'http://m10.music.126.net/20201117235352/d9042931a5e6fe6d14db56258e43b255/ymusic/b5ed/e931/2942/b7e5c41046192910e989967718df0c4c.mp3',
        'http://m10.music.126.net/20201117235638/a13167f688f03a85a6658015f33518a5/ymusic/0b4f/eaf3/4aed/151e586840e80d03ac834e6639601c0b.mp3'
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
