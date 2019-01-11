<template>
  <div>
    <AudioPlayer :audio-list="audioList" />
  </div>
</template>

<script>
import { AudioPlayer } from '../../../packages'
// import { AudioPlayer } from '@liripeng/vue-audio-player'
// import '@liripeng/vue-audio-player/lib/vue-audio-player.css'

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
  }
}
</script>

<style lang="less" scoped>
</style>
