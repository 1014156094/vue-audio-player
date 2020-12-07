<template>
  <div>
    {{ currentAudioName || audioList[0].name }}
    <audio-player
      ref="audioPlayer"
      :audio-list="audioList.map(elm => elm.url)"
      :before-play="handleBeforePlay"
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
      currentAudioName: '',
      audioList: [
        {
          name: '音频1',
          url: 'http://txh-cdn.96qbhy.com/20180817175211dtC1vE3z.mp3'
        },
        {
          name: '音频2',
          url: 'https://www.0dutv.com/upload/dance/20200316/C719452E3C7834080007662021EA968E.mp3'
        },
        {
          name: '音频3',
          url: 'https://www.0dutv.com/upload/dance/F25F74A0B8FF82503241801D0E2CA5CD.mp3'
        }
      ]
    }
  },

  methods: {
    // 播放前做的事
    handleBeforePlay(next) {
      // 这里可以做一些事情...
      this.currentAudioName = this.audioList[this.$refs.audioPlayer.currentPlayIndex].name

      next() // 开始播放
    }
  }
}
</script>

<style>
</style>
