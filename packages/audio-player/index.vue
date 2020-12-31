<template>
  <div class="audio-player">
    <div class="audio__btn-wrap">
      <div
        v-show="showPrevButton"
        class="audio__play-prev"
        :class="{ disable: !isLoop && currentPlayIndex === 0 }"
        @click.stop="playPrev"
      >
        <svg
          class="audio__play-icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-play-prev" />
        </svg>
      </div>

      <div
        v-if="isLoading"
        class="audio__play-loading">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <template v-else>
        <div
          v-if="!isPlaying && showPlayButton"
          @click.stop="play"
          class="audio__play-start"
        >
          <svg
            class="audio__play-icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-play" />
          </svg>
        </div>

        <div
          v-else-if="showPlayButton"
          @click.stop="pause"
          class="audio__play-pause"
        >
          <svg
            class="audio__play-icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-play-pause" />
          </svg>
        </div>
      </template>

      <div
        v-show="showNextButton"
        class="audio__play-next"
        :class="{ disable: !isLoop && currentPlayIndex === audioList.length - 1 }"
        @click.stop="playNext"
      >
        <svg
          class="audio__play-icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-play-next" />
        </svg>
      </div>

      <div
        v-if="showVolumeButton"
        class="audio__play-volume-icon-wrap"
      >
        <svg
          class="audio__play-icon"
          aria-hidden="true"
          @touchstart="handleVolumeIconTouchstart">
          <use :xlink:href="currentVolume ? `#icon-play-volume` : `#icon-play-volume-no`" />
        </svg>

        <transition name="fade-volume">
          <div
            v-show="isShowVolume"
            class="audio__play-volume-wrap"
            @touchstart="handleVolumeTouchmove"
            @touchmove="handleVolumeTouchmove"
            @touchend="handleVolumeTouchend"
            ref="playVolumeWrap">
            <div
              class="audio__play-volume"
              :style="{
                height: currentVolume * 100 + '%'
              }"
              ref="playVolume" />
          </div>
        </transition>
      </div>

      <div class="audio__play-rate">
        <span @click="isShowRates = !isShowRates">{{ playbackRate | rateFilter }}</span>
        <transition name="fade-rate">
          <ul
            class="audio__play-rate__dropdown"
            v-show="isShowRates">
            <li
              v-for="rate in playbackRates"
              :key="'pr_' + rate"
              @click="handleSetPlaybackRate(rate)"
            >
              {{ rate | rateFilter }}
            </li>
          </ul>
        </transition>
      </div>

      <div
        class="audio__notice"
        v-show="isShowNotice">
        {{ noticeMessage }}
      </div>
    </div>

    <div
      v-show="showProgressBar"
      class="audio__progress-wrap"
      ref="audioProgressWrap"
      @click="handleClickProgressWrap"
    >
      <div
        class="audio__progress"
        ref="audioProgress"
      />
      <div
        class="audio__progress-point"
        ref="audioProgressPoint"
        @touchstart="handleProgressTouchstart"
        @touchend="handleProgressTouchend"
        @touchmove="handleProgressTouchmove"
      />
    </div>

    <div
      v-show="showProgressBar"
      class="audio__time-wrap"
    >
      <div class="audio__current-time">
        {{ currentTimeFormatted }}
      </div>
      <div class="audio__duration">
        {{ durationFormatted }}
      </div>
    </div>

    <audio
      ref="audio"
      class="audio-player__audio"
      :src="audioList[currentPlayIndex]"
      @ended="onEnded"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedmetadata"
      v-on="$listeners"
      v-bind="$attrs"
    >
      浏览器太老咯，请升级浏览器吧~
    </audio>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',

  inheritAttrs: false,

  props: {
    // 音频播放列表
    audioList: {
      default: null,
      type: Array
    },

    // 是否显示播放按钮
    showPlayButton: {
      default: true,
      type: Boolean
    },

    // 是否显示上一首按钮
    showPrevButton: {
      default: true,
      type: Boolean
    },

    // 是否显示下一首按钮
    showNextButton: {
      default: true,
      type: Boolean
    },

    // 是否显示音量按钮
    showVolumeButton: {
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

    // 是否自动播放下一首
    isAutoPlayNext: {
      type: Boolean,
      default: true
    },

    // 进度更新间隔
    progressInterval: {
      default: 1000,
      type: Number
    },

    // 是否显示倍速播放速率
    showPlaybackRate: {
      type: Boolean,
      default: false
    },

    playbackRates: {
      type: Array,
      default: () => [0.5, 1, 1.5, 2]
    }
  },

  data() {
    return {
      isIOS: /iPhone|iPad|iPod/i.test(window.navigator.userAgent), // 是否是IOS设备
      isPlaying: false, // 音频是否正在播放
      isDragging: false, // 是否正在拖拽音频进度
      isDraggingVolume: false, // 是否正在拖拽音量进度
      isShowNotice: false,
      isLoading: false,
      isShowVolume: false,
      isShowRates: false,
      timer: null,
      noticeMessage: '',
      duration: '', // 音频持续时间
      currentPlayIndex: 0, // 当前播放的音频位置索引
      currentTime: '', // 音频当前播放时间
      currentVolume: 1, // 当前音量
      playbackRate: 1 // 当前播放速率
    }
  },

  computed: {
    currentTimeFormatted() {
      return this.currentTime ? this.formatTime(this.currentTime) : '00:00'
    },

    durationFormatted() {
      return this.duration ? this.formatTime(this.duration) : '00:00'
    }
  },

  filters: {
    rateFilter (rate) {
      return rate.toFixed(1) + 'x'
    }
  },

  methods: {
    handleVolumeIconTouchstart() {
      this.isShowVolume = !this.isShowVolume
    },

    handleVolumeTouchmove(event) {
      let playVolumeWrapRect = this.$refs.playVolumeWrap.getBoundingClientRect()
      let clientY = event.changedTouches[0].clientY
      let offsetTop
      let volume

      this.isDraggingVolume = true
      offsetTop = Math.round(playVolumeWrapRect.bottom - clientY)
      volume = offsetTop / this.$refs.playVolumeWrap.offsetHeight
      volume = Math.min(volume, 1)
      volume = Math.max(volume, 0)
      this.$refs.audio.volume = volume
      this.currentVolume = volume
    },

    handleVolumeTouchend() {
      if (this.isDraggingVolume) {
        this.isShowVolume = false
      }
    },

    // 设定播放速率
    handleSetPlaybackRate(rate) {
      this.playbackRate = +rate
      this.$refs.audio.playbackRate = +rate
      this.isShowRates = false
    },

    // 显示通知
    showNotice(opts = {}) {
      this.noticeMessage = opts.message
      this.isShowNotice = true

      window.setTimeout(() => {
        this.isShowNotice = false
      }, opts.duration || 3000)
    },

    // 当媒介元素的持续时间以及其它媒介已加载数据时运行脚本
    onLoadedmetadata(event) {
      this.duration = this.$refs.audio.duration
      this.$emit('loadedmetadata', event)
    },

    // 当前的播放位置发送改变时触发
    onTimeUpdate(event) {
      this.$emit('timeupdate', event)
    },

    // 格式化秒为分
    formatTime(second) {
      // 将秒数除以60，然后下舍入，既得到分钟数
      let hour
      hour = Math.floor(second / 60)
      // 取得秒%60的余数，既得到秒数
      second = Math.ceil(second % 60)
      // 将变量转换为字符串
      hour += ''
      second += ''
      // 如果只有一位数，前面增加一个0
      hour = (hour.length === 1) ? '0' + hour : hour
      second = (second.length === 1) ? '0' + second : second
      return hour + ':' + second
    },

    // 音频播放完毕
    onEnded(event) {
      window.setTimeout(() => {
        this.pause()
        this.$emit('ended', event)

        if (this.isLoop && this.isAutoPlayNext) {
          this.playNext()
        }
      }, 1000)
    },

    handleProgressTouchstart(event) {
      this.isDragging = true
    },

    handleProgressTouchend(event) {
      this.$refs.audio.currentTime = this.currentTime
      this.isDragging = false
    },

    handleProgressTouchmove(event) {
      let touch = event.changedTouches[0]
      let pageX = touch.pageX
      let bcr = event.target.getBoundingClientRect()
      let targetLeft = parseInt(getComputedStyle(event.target).left)
      let offsetLeft = targetLeft + (pageX - bcr.left)

      offsetLeft = Math.min(offsetLeft, this.$refs.audioProgressWrap.offsetWidth)
      offsetLeft = Math.max(offsetLeft, 0)
      // 设置点点位置
      this.setPointPosition(offsetLeft)
      // 设置进度条
      this.$refs.audioProgress.style.width = offsetLeft + 'px'
      // 设置当前时间
      this.currentTime = offsetLeft / this.$refs.audioProgressWrap.offsetWidth * this.duration
    },

    // 初始化音频进度的点击逻辑
    handleClickProgressWrap(event) {
      let target = event.target
      let offsetX = event.offsetX

      if (target === this.$refs.audioProgressPoint) {
        return
      }

      // 设置当前播放位置
      this.currentTime = offsetX / this.$refs.audioProgressWrap.offsetWidth * this.duration
      this.$refs.audio.currentTime = this.currentTime
      // 设置点点位置
      this.setPointPosition(offsetX)
      // 设置进度条
      this.$refs.audioProgress.style.width = offsetX + 'px'
    },

    // 设置点点位置
    setPointPosition(offsetLeft) {
      this.$refs.audioProgressPoint.style.left = offsetLeft - this.$refs.audioProgressPoint.offsetWidth / 2 + 'px'
    },

    // 播放中
    playing() {
      // 正在拖拽进度
      if (this.isDragging) {
        return
      }

      let ofsetLeft = this.$refs.audio.currentTime / this.$refs.audio.duration * this.$refs.audioProgressWrap.offsetWidth

      this.currentTime = this.$refs.audio.currentTime
      // 设置播放进度条
      this.$refs.audioProgress.style.width = ofsetLeft + 'px'
      // 设置播放进度拖拽点位置
      this.$refs.audioProgressPoint.style.left = ofsetLeft - this.$refs.audioProgressPoint.offsetWidth / 2 + 'px'
      this.$emit('playing')
    },

    // 开始播放
    play() {
      this.isLoading = true

      let handlePlay = () => {
        this.$refs.audio.play().then((event) => {
          this.$nextTick(() => {
            this.playing()
            this.timer = window.setInterval(this.playing, this.progressInterval)
            this.isPlaying = true
            this.isLoading = false
          })
        }).catch((data) => {
          if (data.code === 9) {
            this.showNotice({
              message: '加载失败，因为没有找到支持的源。'
            })

            if (this.isAutoPlayNext) {
              window.setTimeout(() => {
                this.playNext()
              }, 1000)
            }
          }
          this.isLoading = false
        })
        this.$emit('play')
      }

      // 解决 iOS 异步请求后无法播放
      if (this.isIOS) {
        console.log('下面一行的错误是解决 iOS 异步请求后无法播放问题')
        this.$refs.audio.play()
        this.$refs.audio.pause()
      }

      if (this.beforePlay) {
        this.beforePlay(state => {
          if (state !== false) {
            handlePlay()
          }
        })
        return
      }

      handlePlay()
    },

    // 暂停播放
    pause() {
      this.$refs.audio.pause()
      this.$nextTick(() => {
        this.clearTimer()
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

      this.clearTimer()

      let handlePrev = () => {
        if (this.currentPlayIndex <= 0 && this.isLoop) {
          // 列表循环
          this.currentPlayIndex = this.audioList.length - 1
        } else {
          this.currentPlayIndex--
        }

        this.$nextTick(() => {
          this.play()
          this.$emit('play-prev')
        })
      }

      if (this.beforePrev) {
        this.beforePrev(state => {
          if (state !== false) {
            handlePrev()
          }
        })
        return
      }
      handlePrev()
    },

    clearTimer() {
      window.clearInterval(this.timer)
      this.timer = null
    },

    // 播放下一首
    playNext() {
      if (this.currentPlayIndex + 1 >= this.audioList.length && !this.isLoop) {
        // 无下一首了
        return
      }

      this.clearTimer()

      let handleNext = () => {
        // 已经到达列表最后一首
        if (this.currentPlayIndex + 1 >= this.audioList.length && this.isLoop) {
          this.currentPlayIndex = 0
        } else {
          this.currentPlayIndex++
        }

        this.$nextTick(() => {
          this.play()
          this.$emit('play-next')
        })
      }

      if (this.beforeNext) {
        this.beforeNext(state => {
          if (state !== false) {
            handleNext()
          }
        })
        return
      }

      handleNext()
    }
  },

  beforeDestroy() {
    this.pause()
  }
}
</script>

<style>
@keyframes fadeVolume{
  from {
    height: 0;
  }
  to{
    height: 50px;
  }
}

@keyframes fadeRate{
  from {
    max-height: 0;
  }
  to{
    max-height: 120px;
  }
}

.fade-volume-enter-active{
  animation: fadeVolume .5s;
}

.fade-volume-leave-active {
  animation: fadeVolume .5s reverse;
}

.fade-rate-enter-active{
  animation: fadeRate .5s;
}

.fade-rate-leave-active {
  animation: fadeRate .5s reverse;
}

.audio-player {
  margin: 0 15px;
}

.audio-player .audio__btn-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio-player .audio__play-icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
  overflow: hidden;
  color: #e35924;
}

.audio-player .audio__play-volume-icon-wrap {
  position: absolute;
  width: 21px;
  height: 21px;
  cursor: pointer;
  color: #e35924;
  left: 50%;
  margin-left: 80px;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.audio-player .audio__play-volume-icon-wrap .audio__play-volume-wrap {
  position: absolute;
  width: 21px;
  height: 50px;
  bottom: 21px;
  left: 0;
  background-color: #ddd;
  border-radius: 10px;
}

.audio-player .audio__play-volume-icon-wrap .audio__play-volume-wrap .audio__play-volume {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #e35924;
  border-radius: 10px;
}

.audio-player .audio__play-rate {
  position: absolute;
  height: 21px;
  line-height: 21px;
  cursor: pointer;
  color: #e35924;
  left: 50%;
  margin-left: 120px;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 14px;
}

.audio-player .audio__play-rate__dropdown {
  list-style-type: none;
  padding: 5px 10px;
  transform: translateY(calc(-100% - 2.5em)) translateX(-10px);
  background: #fff;
  border: 1px solid #e35924;
  border-radius: 8px;
  overflow: hidden;
}

.audio-player .audio__play-rate__dropdown li:hover {
  opacity: .5;
}

.audio-player .audio__play-prev {
  width: 21px;
  height: 33px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.audio-player .audio__play-prev.disable {
  opacity: 0.5;
}

.audio-player .audio__play-start {
  width: 42px;
  height: 42px;
  margin: 0 20px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.audio-player .audio__play-pause {
  width: 42px;
  height: 42px;
  margin: 0 20px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.audio-player .audio__play-next {
  width: 21px;
  height: 33px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.audio-player .audio__play-next.disable {
  opacity: 0.5;
}

.audio__notice {
  position: absolute;
  bottom: -15px;
  color: rgb(189, 178, 178);
  border-radius: 4px;
  font-size: 12px;
}

.audio-player .audio__progress-wrap {
  position: relative;
  background: #ddd;
  height: 2px;
  margin-top: 20px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.audio-player .audio__progress {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: #e35924;
}

.audio-player .audio__progress-point {
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

.audio-player .audio__progress-point:after {
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

.audio-player .audio__time-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 7px;
}

.audio-player .audio__current-time {
  font-size: 10px;
  color: #888;
}

.audio-player .audio__duration {
  font-size: 10px;
  color: #888;
}

.audio-player .audio-player__audio {
  display: block;
  margin: 0 auto;
}

.audio__play-loading{
    width: 42px;
    height: 42px;
    position: relative;
    margin: 0 20px;
}
.audio__play-loading span{
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #e35924;
    position: absolute;
    animation: loading 1.04s ease infinite;
}

@keyframes loading{
  0%{
      opacity: 1;
  }
  100%{
      opacity: 0.2;
  }
}

.audio__play-loading span:nth-child(1){
    left: 0;
    top: 50%;
    margin-top:-4px;
    animation-delay:0.13s;
}
.audio__play-loading span:nth-child(2){
    left: 7px;
    top: 7px;
    animation-delay:0.26s;
}
.audio__play-loading span:nth-child(3){
    left: 50%;
    top: 0;
    margin-left: -4px;
    animation-delay:0.39s;
}
.audio__play-loading span:nth-child(4){
    top: 7px;
    right:7px;
    animation-delay:0.52s;
}
.audio__play-loading span:nth-child(5){
    right: 0;
    top: 50%;
    margin-top:-4px;
    animation-delay:0.65s;
}
.audio__play-loading span:nth-child(6){
    right: 7px;
    bottom:7px;
    animation-delay:0.78s;
}
.audio__play-loading span:nth-child(7){
    bottom: 0;
    left: 50%;
    margin-left: -4px;
    animation-delay:0.91s;
}
.audio__play-loading span:nth-child(8){
    bottom: 7px;
    left: 7px;
    animation-delay:1.04s;
}
</style>
