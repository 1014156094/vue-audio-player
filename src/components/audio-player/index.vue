<template>
  <section class="audio-conatiner">
    <div class="audio-name">
      {{ audioName }}
    </div>
    <div class="audio-btn-container">
      <!-- <img class="play-previous-btn"
           src="./icon-play-previous.png"
           @click="audioPrevHandler"> -->
      <img class="play-start-btn"
           src="./icon-play-start.png"
           v-if="!audioPlay"
           @click="audioPlayHandler">
      <img class="play-start-btn"
           src="./icon-play-pause.png"
           v-else
           @click="audioPlayHandler">
      <!-- <img class="play-next-btn"
           src="./icon-play-next.png"
           @click="audioNextHandler"> -->
    </div>
    <div class="audio-progress-container"
         ref="audioProgressContainer">
      <div class="audio-progress"
           ref="audioProgress" />
      <img class="audio-progress-point"
           src="./icon-play-progress-point.png"
           ref="audioProgressPoint">
    </div>
    <div class="audio-time-container">
      <div class="audio-current-time">
        {{ audioCurrentTimeFormatAfter || '00:00' }}
      </div>
      <div class="audio-duration">
        {{ audioDurationFormatAfter }}
      </div>
    </div>
    <audio ref="audio"
           :src="audioUrl"
           @ended="onEnded"
           @timeupdate="onTimeUpdate"
           @loadedmetadata="onLoadedmetadata">
      浏览器太老咯，请升级浏览器吧~
    </audio>
  </section>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
    // 音频地址
    audioUrl: {
      required: true,
      default: '',
      type: String
    },
    // 音频名称
    audioName: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      audioPlay: false, // 音频是否正在播放
      audioDuration: '', // 音频持续时间
      audioDurationFormatAfter: '', // 音频持续时间（格式化后）
      audioCurrentTime: '', // 音频播放当时时间
      audioCurrentTimeFormatAfter: '', // 音频播放当时时间（格式化后）
      audioDragging: false // 是否正在拖拽音频进度
    }
  },
  methods: {
    // 当媒介元素的持续时间以及其它媒介已加载数据时运行脚本
    onLoadedmetadata() {
      console.dir(this.$refs.audio)
      this.audioDuration = this.$refs.audio.duration
      this.initAudioProgressDrag()
    },
    // 正在播放音频中
    onTimeUpdate(val) {
      this.progressValue = this.$refs.audio.currentTime / (this.$refs.audio.duration / 100)
      this.audioCurrentTimeFormatAfter = this.formatTime(this.$refs.audio.currentTime)

      // 正在拖拽进度
      if (this.audioDragging) {
        return
      }

      // 设置播放进度条
      this.$refs.audioProgress.style.width =
        this.$refs.audio.currentTime / this.$refs.audio.duration * this.$refs.audioProgressContainer.offsetWidth + 'px'
      // 设置播放进度拖拽点
      this.$refs.audioProgressPoint.style.left =
        this.$refs.audio.currentTime /
        this.$refs.audio.duration *
        (this.$refs.audioProgressContainer.offsetWidth - this.$refs.audioProgressPoint.offsetWidth / 2) +
        'px'
    },
    // 格式化时间
    formatTime(second) {
      return [parseInt((second / 60) % 60), parseInt(second % 60)].join(':').replace(/\b(\d)\b/g, '0$1')
    },
    // 播放音频完毕执行事件
    onEnded() {
      this.pause()
    },
    // 初始化音频进度的拖拽逻辑
    initAudioProgressDrag() {
      this.$refs.audioProgressPoint.addEventListener(
        'touchstart',
        event => {
          // 设置拖拽中
          this.audioDragging = true
        },
        false
      )
      this.$refs.audioProgressPoint.addEventListener(
        'touchmove',
        event => {
          let touch = event.touches[0]

          // 超出范围
          if (
            touch.pageX < this.$refs.audioProgressContainer.offsetLeft ||
            touch.pageX > this.$refs.audioProgressContainer.offsetLeft + this.$refs.audioProgressContainer.offsetWidth
          ) {
            return
          }
          // 设置点点
          this.$refs.audioProgressPoint.style.left =
            touch.pageX - this.$refs.audioProgressPoint.offsetWidth / 2 - this.$refs.audioProgressContainer.offsetLeft + 'px'
          // 设置进度条
          this.$refs.audioProgress.style.width = touch.pageX - this.$refs.audioProgressContainer.offsetLeft + 'px'
          // 设置当前时间
          this.audioCurrentTime =
            this.$refs.audioProgress.offsetWidth / this.$refs.audioProgressContainer.offsetWidth * this.audioDuration
          // 设置当前时间（格式化后）
          this.audioCurrentTimeFormatAfter = this.formatTime(this.audioCurrentTime)
        },
        false
      )
      this.$refs.audioProgressPoint.addEventListener(
        'touchend',
        event => {
          // 设置播放位置
          this.$refs.audio.currentTime = this.audioCurrentTime
          // 设置未拖拽
          this.audioDragging = false
        },
        false
      )

      this.initAudioProgressClick()
    },
    // 初始化音频进度的点击逻辑
    initAudioProgressClick() {
      this.$refs.audioProgressContainer.addEventListener('click', event => {
        let touch = event

        // 设置点点
        this.$refs.audioProgressPoint.style.left =
          touch.pageX - this.$refs.audioProgressPoint.offsetWidth / 2 - this.$refs.audioProgressContainer.offsetLeft + 'px'
        // 设置进度条
        this.$refs.audioProgress.style.width = touch.pageX - this.$refs.audioProgressContainer.offsetLeft + 'px'
        // 设置当前时间
        this.audioCurrentTime =
          this.$refs.audioProgress.offsetWidth / this.$refs.audioProgressContainer.offsetWidth * this.audioDuration
        // 设置当前时间（格式化后）
        this.audioCurrentTimeFormatAfter = this.formatTime(this.audioCurrentTime)
        // 设置播放位置
        this.$refs.audio.currentTime = this.audioCurrentTime
      })
    },
    // 开始播放
    play() {
      this.$refs.audio.play()
      this.audioPlay = true
    },
    // 暂停播放
    pause() {
      this.$refs.audio.pause()
      this.audioPlay = false
    },
    // 点击播放or暂停
    audioPlayHandler() {
      if (!this.audioPlay) {
        this.play()
      } else {
        this.pause()
      }
    },
    // 切换上一首
    audioPrevHandler() {
    },
    // 切换下一首
    audioNextHandler() {
    }
  }
}
</script>

<style lang="less" scoped>
section.audio-conatiner {
  margin: 0 15px;
  .audio-name {
    font-size: 18px;
    padding: 15px 10px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .audio-btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    .play-previous-btn {
      width: 21px;
    }
    .play-start-btn {
      width: 42px;
      margin: 0 45px;
    }
    .play-next-btn {
      width: 21px;
    }
  }
  .audio-progress-container {
    position: relative;
    background: #eee;
    height: 2px;
    margin-top: 22.5px;
    .audio-progress {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 0;
      background: #e35924;
    }
    .audio-progress-point {
      position: absolute;
      left: 0;
      top: 50%;
      width: 12px;
      margin-top: -6px;
    }
  }
  .audio-time-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 7px;
    .audio-current-time {
      font-size: 10px;
      color: #888;
    }
    .audio-duration {
      font-size: 10px;
      color: #888;
    }
  }
  audio {
    display: block;
    margin: 0 auto;
  }
}
</style>
