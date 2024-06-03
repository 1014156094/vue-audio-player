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
    >
    </audio-player>
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
          src: 'http://music.163.com/song/media/outer/url?id=317151.mp3',
          title: 'Audio Title 1',
          artist: 'Artist Name 1',
          album: 'Album Name 1',
          artwork: [
            {
              src: 'https://upload.jianshu.io/users/upload_avatars/1696356/c358e43854eb?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp',
              sizes: '512x512',
              type: 'image/jpg',
            },
          ],
        },
        {
          src: 'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3',
          title: 'Audio Title 2',
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
  },
}
</script>

<style scoped>
.name {
  text-align: center;
  line-height: 80px;
}
</style>
