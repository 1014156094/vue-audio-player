<template>
  <div>
    <div class="name">
      {{ currentAudioName || audioList[0].name }}
    </div>
    <audio-player
      ref="audioPlayer"
      :audio-list="audioList.map((elm) => elm.url)"
      :before-play="handleBeforePlay"
    >
    </audio-player>
  </div>
</template>

<script>
import AudioPlayer from '@liripeng/vue-audio-player'
// import AudioPlayer from '../../packages/index.js'

export default {
  components: {
    AudioPlayer,
  },

  data() {
    return {
      currentAudioName: '',
      audioList: [
        {
          name: 'audio 1',
          url: 'http://music.163.com/song/media/outer/url?id=317151.mp3',
        },
        {
          name: 'audio 2',
          url: 'http://music.163.com/song/media/outer/url?id=281951.mp3',
        },
      ],
    }
  },

  methods: {
    // Use this function if you want to do something before you start playing
    handleBeforePlay(next) {
      this.currentAudioName =
        this.audioList[this.$refs.audioPlayer.currentPlayIndex].name

      next() // Start play
    },
  },
}
</script>

<style scoped>
.name {
  text-align: center;
  line-height: 80px;
}
</style>
