<template>
  <div>
    <AudioPlayer :audio-list="audioList"
                 @play-prev="test" />
  </div>
</template>

<script>
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
    test() {
      console.log(11111)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
