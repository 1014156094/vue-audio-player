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
// import '@liripeng/vue-audio-player/lib/style.css'
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
          url: 'https://link.jscdn.cn/sharepoint/aHR0cHM6Ly8xZHJpdi1teS5zaGFyZXBvaW50LmNvbS86dTovZy9wZXJzb25hbC9zdG9yXzFkcml2X29ubWljcm9zb2Z0X2NvbS9FYWF6RUxSb2U0Uk5pdjJyc21JaG01SUJseF9fdXc5M1VDdHN2bExDRVI0YkRn.mp3',
        },
        {
          name: 'audio 2',
          url: 'https://link.jscdn.cn/sharepoint/aHR0cHM6Ly8xZHJpdi1teS5zaGFyZXBvaW50LmNvbS86dTovZy9wZXJzb25hbC9zdG9yXzFkcml2X29ubWljcm9zb2Z0X2NvbS9FYzM3dlRwM1JDTkV0Ry05c3FPRS1UVUJqZzBNZ0w0MDk5Z0VFREdsX0NtS0RB.mp3',
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
