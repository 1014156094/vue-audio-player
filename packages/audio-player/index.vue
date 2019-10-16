<template>
  <section class="audio-wrap">
    <div class="audio__btn-container">
      <div
        v-show="showPrevButton"
        class="audio__play__btn--previous"
        :class="{ disable: !isLoop && currentPlayIndex === 0 }"
        @click="playPrev"
      >
        <svg
          class="audio__play__btn__icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-play-prev" />
        </svg>
      </div>

      <div
        v-if="!isPlaying && showPlayButton"
        @click="play"
        class="audio__play__btn--start"
      >
        <svg
          class="audio__play__btn__icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-play" />
        </svg>
      </div>

      <div
        v-else-if="showPlayButton"
        @click="pause"
        class="audio__play__btn--pause"
      >
        <svg
          class="audio__play__btn__icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-play-pause" />
        </svg>
      </div>

      <div
        v-show="showNextButton"
        class="audio__play__btn--next"
        :class="{ disable: !isLoop && currentPlayIndex === audioList.length - 1 }"
        @click="playNext"
      >
        <svg
          class="audio__play__btn__icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-play-next" />
        </svg>
      </div>
    </div>

    <div
      v-show="showProgressBar"
      class="audio__progress-container"
      ref="audioProgressContainer"
      @click="initProgressBarPoint"
    >
      <div
        class="audio__progress"
        ref="audioProgress"
      />
      <div
        class="audio__progress__point"
        ref="audioProgressPoint"
      />
    </div>

    <div
      v-show="showProgressBar"
      class="audio__time-container"
    >
      <div class="audio__time--current">
        {{ currentTimeAfterFormat }}
      </div>
      <div class="audio__duration">
        {{ formatTime(duration) }}
      </div>
    </div>

    <audio
      ref="audio"
      class="audio__player"
      :src="audioList[currentPlayIndex]"
      @ended="onEnded"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedmetadata"
    >
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
      type: Boolean,
      default: true
    },
    // 进度更新间隔
    progressInterval: {
      default: 1000,
      type: Number
    }
  },

  data() {
    return {
      isIOS: /iPhone|iPad|iPod/i.test(window.navigator.userAgent), // 是否是IOS设备
      timer: null,
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
      this.$emit('loadedmetadata', event)
    },
    // 当前的播放位置发送改变时触发
    onTimeUpdate(event) {
      this.$emit('timeupdate', event)
    },
    // 格式化秒为分
    formatTime(second) {
      return [parseInt((second / 60) % 60), parseInt(second % 60)]
        .join(':')
        .replace(/\b(\d)\b/g, '0$1')
    },
    // 音频播放完毕
    onEnded(event) {
      this.pause()
      this.currentTimeAfterFormat = this.formatTime(
        this.$refs.audio.currentTime
      )
      this.$emit('ended', event)

      if (this.isLoop) {
        this.playNext()
        this.play()
      }
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

          // 超出左边
          if (touch.pageX < this.$refs.audioProgressContainer.offsetLeft) {
            // 设置点点
            this.$refs.audioProgressPoint.style.left = 0
            // 设置进度条
            this.$refs.audioProgress.style.width = 0
            // 设置当前时间
            this.currentTime = 0
            // 设置当前时间（格式化后）
            this.currentTimeAfterFormat = this.formatTime(this.currentTime)
            return
          }

          // 超出右边
          if (
            touch.pageX >
            this.$refs.audioProgressContainer.offsetLeft +
              this.$refs.audioProgressContainer.offsetWidth
          ) {
            // 设置点点
            this.$refs.audioProgressPoint.style.left =
              this.$refs.audioProgressContainer.offsetWidth -
              this.$refs.audioProgressPoint.offsetWidth +
              'px'
            // 设置进度条
            this.$refs.audioProgress.style.width =
              this.$refs.audioProgressContainer.offsetWidth + 'px'
            // 设置当前时间，0.1解决有的浏览器播放完了进度还会再走
            this.currentTime = this.duration - 0.1
            // 设置当前时间（格式化后）
            this.currentTimeAfterFormat = this.formatTime(this.currentTime)
            return
          }

          this.setPointPosition(touch.pageX)
          // 设置进度条
          this.$refs.audioProgress.style.width =
            touch.pageX - this.$refs.audioProgressContainer.offsetLeft + 'px'
          // 设置当前时间
          this.currentTime =
            (this.$refs.audioProgress.offsetWidth /
              this.$refs.audioProgressContainer.offsetWidth) *
            this.duration
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
    // 设置点点位置
    setPointPosition(pageX) {
      // 设置点点
      this.$refs.audioProgressPoint.style.left =
        pageX -
        this.$refs.audioProgressPoint.offsetWidth / 2 -
        this.$refs.audioProgressContainer.offsetLeft +
        'px'
    },
    // 初始化音频进度的点击逻辑
    initProgressBarPoint(event) {
      // 设置当前时间
      this.currentTime =
        ((event.pageX - this.$refs.audioProgressContainer.offsetLeft) /
          this.$refs.audioProgressContainer.offsetWidth) *
        this.duration
      // 设置播放位置
      this.$refs.audio.currentTime = this.currentTime
      this.setPointPosition(event.pageX)
      // 设置进度条
      this.$refs.audioProgress.style.width =
        event.pageX - this.$refs.audioProgressContainer.offsetLeft + 'px'
      // 设置当前时间（格式化后）
      this.currentTimeAfterFormat = this.formatTime(this.currentTime)
    },
    // 播放中
    playing() {
      // 正在拖拽进度
      if (this.isDragging) {
        return
      }

      this.currentTimeAfterFormat = this.formatTime(
        this.$refs.audio.currentTime
      )
      // 设置播放进度条
      this.$refs.audioProgress.style.width =
        (this.$refs.audio.currentTime / this.$refs.audio.duration) *
          this.$refs.audioProgressContainer.offsetWidth +
        'px'
      // 设置播放进度拖拽点
      this.$refs.audioProgressPoint.style.left =
        (this.$refs.audio.currentTime / this.$refs.audio.duration) *
          (this.$refs.audioProgressContainer.offsetWidth -
            this.$refs.audioProgressPoint.offsetWidth / 2) +
        'px'
      this.$emit('playing')
    },
    // 开始播放
    play() {
      let playHandle = () => {
        this.$refs.audio.play()
        this.$nextTick(() => {
          this.playing()
          this.timer = setInterval(this.playing, this.progressInterval)
          this.isPlaying = true
          this.$emit('play')
        })
      }

      // 解决 iOS 异步请求后无法播放
      if (this.isIOS) {
        this.$refs.audio.play()
        this.$refs.audio.pause()
      }

      if (this.beforePlay) {
        this.beforePlay(state => {
          if (state !== false) {
            playHandle()
          }
        })
        return
      }

      playHandle()
    },
    // 暂停播放
    pause() {
      this.$refs.audio.pause()
      this.$nextTick(() => {
        clearInterval(this.timer)
        this.isPlaying = false
        this.$emit('pause')
      })
    },
    // 播放上一首
    playPrev() {
      if (this.currentPlayIndex <= 0 && !this.isLoop) {
        // 无上一首了
        return
      }

      let prevHandle = () => {
        if (this.currentPlayIndex <= 0 && this.isLoop) {
          // 列表循环
          this.currentPlayIndex = this.audioList.length - 1
        } else {
          this.currentPlayIndex--
        }

        this.$nextTick(() => {
          this.play()
          this.isPlaying = true
          this.$emit('play-prev')
        })
      }

      if (this.beforePrev) {
        this.beforePrev(state => {
          if (state !== false) {
            prevHandle()
          }
        })
        return
      }
      prevHandle()
    },
    // 播放下一首
    playNext() {
      if (this.currentPlayIndex + 1 >= this.audioList.length && !this.isLoop) {
        // 无下一首了
        return
      }

      let nextHandle = () => {
        // 已经到达列表最后一首
        if (this.currentPlayIndex + 1 >= this.audioList.length && this.isLoop) {
          this.currentPlayIndex = 0
        } else {
          this.currentPlayIndex++
        }

        this.$nextTick(() => {
          this.play()
          this.isPlaying = true
          this.$emit('play-next')
        })
      }

      if (this.beforeNext) {
        this.beforeNext(state => {
          if (state !== false) {
            nextHandle()
          }
        })
        return
      }

      nextHandle()
    }
  },

  beforeDestroy() {
    this.pause()
  }
}
</script>

<style>
.audio-wrap {
  margin: 0 15px;
}

.audio-wrap .audio__btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio-wrap .audio__btn-container .audio__play__btn__icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
  overflow: hidden;
  color: #e35924;
}

.audio-wrap .audio__btn-container .audio__play__btn--previous {
  width: 21px;
  height: 33px;
}

.audio-wrap .audio__btn-container .audio__play__btn--previous.disable {
  opacity: 0.5;
}

.audio-wrap .audio__btn-container .audio__play__btn--start {
  width: 42px;
  height: 42px;
  margin: 0 20px;
}

.audio-wrap .audio__btn-container .audio__play__btn--pause {
  width: 42px;
  height: 42px;
  margin: 0 20px;
}

.audio-wrap .audio__btn-container .audio__play__btn--next {
  width: 21px;
  height: 33px;
}

.audio-wrap .audio__btn-container .audio__play__btn--next.disable {
  opacity: 0.5;
}

.audio-wrap .audio__progress-container {
  position: relative;
  background: #ddd;
  height: 2px;
  margin-top: 20px;
}

.audio-wrap .audio__progress-container .audio__progress {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: #e35924;
}

.audio-wrap .audio__progress-container .audio__progress__point {
  position: absolute;
  left: 0;
  top: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-top: -8px;
  background: #e35924;
  box-shadow: 0 0 10px 1px rgba(227, 89, 36, 0.5);
}

.audio-wrap .audio__progress-container .audio__progress__point:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  background: #fff;
  border-radius: 50%;
}

.audio-wrap .audio__time-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 7px;
}

.audio-wrap .audio__time-container .audio__time--current {
  font-size: 10px;
  color: #888;
}

.audio-wrap .audio__time-container .audio__duration {
  font-size: 10px;
  color: #888;
}

.audio-wrap .audio__player {
  display: block;
  margin: 0 auto;
}
</style>
