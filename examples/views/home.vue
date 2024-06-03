<template>
  <div>
    <div class="name">
      {{ currentAudioName || audioList[0].title }}
    </div>
    <audio-player
      ref="audioPlayer"
      :audio-list="audioList?.map((item) => item.src)"
      :before-play="handleBeforePlay"
      :show-play-loading="false"
      @ended="handleEnded"
    >
    </audio-player>

    <button @click="handlePlaySpecify">Play the second audio</button>
  </div>
</template>

<script>
// import AudioPlayer from '@liripeng/vue-audio-player'
import AudioPlayer from '../../packages/index.js'

export default {
  components: {
    AudioPlayer,
  },

  data() {
    return {
      currentAudioName: '',
      audioList: [
        {
          src: 'http://music.163.com/song/media/outer/url?id=317151.mp3', // Required
          title: 'Audio Title 1', // Optional，Phone lock screen music player display
          artist: 'Artist Name 1', // Optional，Phone lock screen music player display
          album: 'Album Name 1', // Optional，Phone lock screen music player display
          artwork: [
            {
              src: 'https://upload.jianshu.io/users/upload_avatars/1696356/c358e43854eb?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp',
              sizes: '512x512',
              type: 'image/jpg',
            },
          ], // Optional，Phone lock screen music player display
        },
        {
          src: 'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3', // Required
          title: 'Audio Title 2', // Optional，Phone lock screen music player display
        },
      ],
    }
  },

  methods: {
    // Use this function if you want to do something before you start playing
    handleBeforePlay(next) {
      this.currentAudioName =
        this.audioList[this.$refs.audioPlayer.currentPlayIndex].title

      next() // Start play
    },

    handlePlaySpecify() {
      this.$refs.audioPlayer.currentPlayIndex = 1
      this.$nextTick(() => {
        this.$refs.audioPlayer.play()
        this.title =
          this.audioList[this.$refs.audioPlayer.currentPlayIndex].name
      })
    },

    handleEnded() {
      console.log('ended')
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
