<template>
  <section class="audio-conatiner">
    <div class="audio-btn-container">
      <img class="play-previous-btn"
           src="./icon-play-previous.png"
           @click="playPrev">
      <img class="play-start-btn"
           src="./icon-play-start.png"
           v-if="!audioPlay"
           @click="play">
      <img class="play-start-btn"
           src="./icon-play-pause.png"
           v-else
           @click="pause">
      <img class="play-next-btn"
           src="./icon-play-next.png"
           @click="playNext">
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
        {{ audioCurrentTimeFormatAfter }}
      </div>
      <div class="audio-duration">
        {{ formatTime(audioDuration) }}
      </div>
    </div>
    <audio ref="audio"
           :src="audioList[currentAudioIndex]"
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
    audioList: {
      default: null,
      type: Array
    },
    // 播放之前要做些什么
    beforePlay: {
      default: null,
      type: Function
    },
    // 上一首之前要做些什么
    beforePrev: {
      default: null,
      type: Function
    },
    // 下一首之前要做些什么
    beforeNext: {
      default: null,
      type: Function
    },
    // 是否列表循环播放
    isLoop: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      currentAudioIndex: 0, // 当前播放的音频位置索引
      audioPlay: false, // 音频是否正在播放
      audioDuration: '', // 音频持续时间
      audioCurrentTime: '', // 音频播放当时时间
      audioCurrentTimeFormatAfter: '', // 音频播放当时时间（格式化后）
      audioDragging: false // 是否正在拖拽音频进度
    }
  },
  methods: {
    // 当媒介元素的持续时间以及其它媒介已加载数据时运行脚本
    onLoadedmetadata() {
      console.dir(this.$refs.audio.duration)
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
    // 音频播放完毕
    onEnded() {
      this.pause()
      this.$emit('ended')
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
      if (this.beforePlay) {
        this.beforePlay((state) => {
          if (state !== false) {
            this.$refs.audio.play()
            this.audioPlay = true
          }
        })
        return
      }
      this.$refs.audio.play()
      this.audioPlay = true
    },
    // 暂停播放
    pause() {
      this.$refs.audio.pause()
      this.audioPlay = false
    },
    // 切换上一首
    playPrev() {
      if (this.currentAudioIndex <= 0 && !this.isLoop) {
        // 无上一首了
        alert('已是第一首！')
        return
      }

      let prev = () => {
        if (this.currentAudioIndex <= 0 && this.isLoop) {
          // 列表循环
          this.currentAudioIndex = this.audioList.length - 1
        } else {
          this.currentAudioIndex--
        }

        this.$nextTick(() => {
          this.$refs.audio.play()
          this.audioPlay = true
        })
      }

      if (this.beforePrev) {
        this.beforePrev((state) => {
          if (state !== false) {
            prev()
          }
        })
        return
      }
      prev()
    },
    // 切换下一首
    playNext() {
      if (this.currentAudioIndex + 1 >= this.audioList.length && !this.isLoop) {
        // 无下一首了
        alert('已是最后一首！')
        return
      }

      let next = () => {
        if (this.currentAudioIndex + 1 >= this.audioList.length && this.isLoop) {
          // 列表循环
          this.currentAudioIndex = 0
        } else {
          this.currentAudioIndex++
        }
        this.$nextTick(() => {
          this.$refs.audio.play()
          this.audioPlay = true
        })
      }

      if (this.beforeNext) {
        this.beforeNext((state) => {
          if (state !== false) {
            next()
          }
        })
        return
      }
      next()
    }
  }
}
</script>

<style lang="less" scoped>
section.audio-conatiner {
  margin: 0 15px;
  .audio-btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    .play-previous-btn {
      width: 21px;
    }
    .play-start-btn {
      width: 42px;
      margin: 0 40px;
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
