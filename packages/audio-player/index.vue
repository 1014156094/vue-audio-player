<template>
  <section class="audio-section">
    <div class="audio-section__btn-container">
      <div v-show="showPrevButton"
           class="audio-section__play__btn--previous"
           :class="{ disable: !isLoop && currentPlayIndex === 0 }"
           @click="playPrev">
        <svg class="audio-section__play__btn__icon"
             aria-hidden="true">
          <use xlink:href="#icon-play-prev" />
        </svg>
      </div>

      <div v-if="!isPlaying && showPlayButton"
           @click="play"
           class="audio-section__play__btn--start">
        <svg class="audio-section__play__btn__icon"
             aria-hidden="true">
          <use xlink:href="#icon-play" />
        </svg>
      </div>

      <div v-else-if="showPlayButton"
           @click="pause"
           class="audio-section__play__btn--pause">
        <svg class="audio-section__play__btn__icon"
             aria-hidden="true">
          <use xlink:href="#icon-play-pause" />
        </svg>
      </div>

      <div v-show="showNextButton"
           class="audio-section__play__btn--next"
           :class="{ disable: !isLoop && currentPlayIndex === audioList.length - 1 }"
           @click="playNext">
        <svg class="audio-section__play__btn__icon"
             aria-hidden="true">
          <use xlink:href="#icon-play-next" />
        </svg>
      </div>
    </div>
    <div v-show="showProgressBar"
         class="audio-section__progress-container"
         ref="audioProgressContainer">
      <div class="audio-section__progress"
           ref="audioProgress" />
      <div class="audio-section__progress__point"
           ref="audioProgressPoint" />
    </div>
    <div v-show="showProgressBar"
         class="audio-section__time-container">
      <div class="audio-section__time--current">
        {{ currentTimeAfterFormat }}
      </div>
      <div class="audio-section__duration">
        {{ formatTime(duration) }}
      </div>
    </div>
    <audio ref="audio"
           class="audio-section__player"
           :src="audioList[currentPlayIndex]"
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
    // 音频播放列表
    audioList: {
      default: null,
      type: Array
    },
    // 显示播放按钮
    showPlayButton: {
      default: true,
      type: Boolean
    },
    // 显示上一首按钮
    showPrevButton: {
      default: true,
      type: Boolean
    },
    // 显示下一首按钮
    showNextButton: {
      default: true,
      type: Boolean
    },
    // 显示进度条
    showProgressBar: {
      default: true,
      type: Boolean
    },
    // 播放前的回调函数
    beforePlay: {
      default: null,
      type: Function
    },
    // 上一首前的回调函数
    beforePrev: {
      default: null,
      type: Function
    },
    // 下一首前的回调函数
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
      currentPlayIndex: 0, // 当前播放的音频位置索引
      isPlaying: false, // 音频是否正在播放
      duration: '', // 音频持续时间
      currentTime: '', // 音频当前播放时间
      currentTimeAfterFormat: '', // 音频播放当时时间（格式化后）
      isDragging: false // 是否正在拖拽音频进度
    }
  },
  methods: {
    // 当媒介元素的持续时间以及其它媒介已加载数据时运行脚本
    onLoadedmetadata(event) {
      this.duration = this.$refs.audio.duration
      this.initProgressBarDrag()
      this.initProgressBarPoint()
      this.$emit('loadedmetadata', event)
    },
    // 正在播放音频中
    onTimeUpdate(event) {
      this.progressValue = this.$refs.audio.currentTime / (this.$refs.audio.duration / 100)

      // 正在拖拽进度
      if (this.isDragging) {
        return
      }

      this.currentTimeAfterFormat = this.formatTime(this.$refs.audio.currentTime)
      // 设置播放进度条
      this.$refs.audioProgress.style.width =
        this.$refs.audio.currentTime / this.$refs.audio.duration * this.$refs.audioProgressContainer.offsetWidth + 'px'
      // 设置播放进度拖拽点
      this.$refs.audioProgressPoint.style.left =
        this.$refs.audio.currentTime /
        this.$refs.audio.duration *
        (this.$refs.audioProgressContainer.offsetWidth - this.$refs.audioProgressPoint.offsetWidth / 2) +
        'px'
      this.$emit('timeupdate', event)
    },
    // 格式化秒为分
    formatTime(second) {
      return [parseInt((second / 60) % 60), parseInt(second % 60)].join(':').replace(/\b(\d)\b/g, '0$1')
    },
    // 音频播放完毕
    onEnded(event) {
      this.pause()
      this.$emit('ended', event)
    },
    // 初始化音频进度的拖拽逻辑
    initProgressBarDrag() {
      this.$refs.audioProgressPoint.addEventListener(
        'touchstart',
        event => {
          // 设置拖拽中
          this.isDragging = true
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
          this.currentTime =
            this.$refs.audioProgress.offsetWidth / this.$refs.audioProgressContainer.offsetWidth * this.duration
          // 设置当前时间（格式化后）
          this.currentTimeAfterFormat = this.formatTime(this.currentTime)
        },
        false
      )
      this.$refs.audioProgressPoint.addEventListener(
        'touchend',
        event => {
          // 设置播放位置
          this.$refs.audio.currentTime = this.currentTime
          // 设置未拖拽
          this.isDragging = false
        },
        false
      )
    },
    // 初始化音频进度的点击逻辑
    initProgressBarPoint() {
      this.$refs.audioProgressContainer.addEventListener('click', event => {
        let touch = event

        // 设置点点
        this.$refs.audioProgressPoint.style.left =
          touch.pageX - this.$refs.audioProgressPoint.offsetWidth / 2 - this.$refs.audioProgressContainer.offsetLeft + 'px'
        // 设置进度条
        this.$refs.audioProgress.style.width = touch.pageX - this.$refs.audioProgressContainer.offsetLeft + 'px'
        // 设置当前时间
        this.currentTime =
          this.$refs.audioProgress.offsetWidth / this.$refs.audioProgressContainer.offsetWidth * this.duration
        // 设置当前时间（格式化后）
        this.currentTimeAfterFormat = this.formatTime(this.currentTime)
        // 设置播放位置
        this.$refs.audio.currentTime = this.currentTime
      })
    },
    // 开始播放
    play() {
      let play = () => {
        this.$refs.audio.play()
        this.isPlaying = true
        this.$emit('play')
      }

      if (this.beforePlay) {
        this.beforePlay((state) => {
          if (state !== false) {
            play()
          }
        })
        return
      }
      play()
    },
    // 暂停播放
    pause() {
      this.$refs.audio.pause()
      this.isPlaying = false
      this.$emit('pause')
    },
    // 播放上一首
    playPrev() {
      if (this.currentPlayIndex <= 0 && !this.isLoop) {
        // 无上一首了
        return
      }

      let prev = () => {
        if (this.currentPlayIndex <= 0 && this.isLoop) {
          // 列表循环
          this.currentPlayIndex = this.audioList.length - 1
        } else {
          this.currentPlayIndex--
        }

        this.$nextTick(() => {
          this.$refs.audio.play()
          this.isPlaying = true
          this.$emit('play-prev')
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
    // 播放下一首
    playNext() {
      if (this.currentPlayIndex + 1 >= this.audioList.length && !this.isLoop) {
        // 无下一首了
        return
      }

      let next = () => {
        if (this.currentPlayIndex + 1 >= this.audioList.length && this.isLoop) {
          // 列表循环
          this.currentPlayIndex = 0
        } else {
          this.currentPlayIndex++
        }
        this.$nextTick(() => {
          this.$refs.audio.play()
          this.isPlaying = true
          this.$emit('play-next')
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

<style lang="less">
section.audio-section {
  margin: 0 15px;
  .audio-section__btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    .audio-section__play__btn__icon {
      width: 100%;
      height: 100%;
      fill: currentColor;
      overflow: hidden;
      color: #e35924;
    }
    .audio-section__play__btn--previous {
      width: 21px;
      height: 33px;
      &.disable {
        opacity: 0.5;
      }
    }
    .audio-section__play__btn--start {
      width: 42px;
      height: 42px;
      margin: 0 40px;
    }
    .audio-section__play__btn--pause {
      width: 42px;
      height: 42px;
      margin: 0 40px;
    }
    .audio-section__play__btn--next {
      width: 21px;
      height: 33px;
      &.disable {
        opacity: 0.5;
      }
    }
  }
  .audio-section__progress-container {
    position: relative;
    background: #eee;
    height: 2px;
    margin-top: 22.5px;
    .audio-section__progress {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 0;
      background: #e35924;
    }
    .audio-section__progress__point {
      position: absolute;
      left: 0;
      top: 50%;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-top: -6px;
      background: #e35924;
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 6px;
        margin: -3px 0 0 -3px;
        background: #fff;
        border-radius: 50%;
      }
    }
  }
  .audio-section__time-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 7px;
    .audio-section__time--current {
      font-size: 10px;
      color: #888;
    }
    .audio-section__duration {
      font-size: 10px;
      color: #888;
    }
  }
  .audio-section__player {
    display: block;
    margin: 0 auto;
  }
}
</style>
