<template>
  <div class="audio-player">
    <div class="audio__btn-wrap">
      <div
        v-show="showPrevButton"
        class="audio__play--previous"
        :class="{ disable: !isLoop && currentPlayIndex === 0 }"
        @click.stop="playPrev"
      >
        <svg
          class="audio__play__icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-play-prev" />
        </svg>
      </div>

      <div
        v-if="isLoading"
        class="audio__loading">
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
          class="audio__play--start"
        >
          <svg
            class="audio__play__icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-play" />
          </svg>
        </div>

        <div
          v-else-if="showPlayButton"
          @click.stop="pause"
          class="audio__play--pause"
        >
          <svg
            class="audio__play__icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-play-pause" />
          </svg>
        </div>
      </template>

      <div
        v-show="showNextButton"
        class="audio__play--next"
        :class="{ disable: !isLoop && currentPlayIndex === audioList.length - 1 }"
        @click.stop="playNext"
      >
        <svg
          class="audio__play__icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-play-next" />
        </svg>
      </div>

      <div
        class="audio__play-volume-icon-wrap"
        @mouseenter="handleMouseenterPlayIcon"
        @mouseleave="handleMouseleavePlayIcon"
        @touchstart="()=>{
          isShowVolume = true
        }">
        <svg
          class="audio__play__icon"
          aria-hidden="true">
          <use xlink:href="#icon-play-volume" />
        </svg>

        <div
          v-show="isShowVolume"
          class="audio__play-volume-wrap"
          @touchstart="handleVolumeTouch"
          @touchmove="handleVolumeTouch"
          @touchend="()=>{
            isShowVolume = false
          }"
          @mousedown="handleVolumeMousedown"
          ref="playVolumeWrap">
          <div
            class="audio__play-volume"
            :style="{
              width: currentVolume * 100 + '%'
            }"
            ref="playVolume" />
        </div>
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
      @click="initProgressBarPoint"
    >
      <div
        class="audio__progress"
        ref="audioProgress"
      />
      <div
        class="audio__progress-point"
        ref="audioProgressPoint"
      />
    </div>

    <div
      v-show="showProgressBar"
      class="audio__time-wrap"
    >
      <div class="audio__current-time">
        {{ currentTimeAfterFormat }}
      </div>
      <div class="audio__duration">
        {{ formatTime(duration) }}
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

    // 是否自动播放下一首
    isAutoPlayNext: {
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
      isPlaying: false, // 音频是否正在播放
      isDragging: false, // 是否正在拖拽音频进度
      isDraggingVolume: false, // 是否正在拖拽音量进度
      isShowNotice: false,
      isLoading: false,
      isShowVolume: false,
      timer: null,
      noticeMessage: '',
      duration: '', // 音频持续时间
      currentPlayIndex: 0, // 当前播放的音频位置索引
      currentTime: '', // 音频当前播放时间
      currentTimeAfterFormat: '', // 音频播放当时时间（格式化后）
      currentVolume: 1 // 当前音量
    }
  },

  methods: {
    handleMouseenterPlayIcon() {
      this.isShowVolume = true
    },

    handleMouseleavePlayIcon() {
      this.isShowVolume = false
    },

    handleVolumeTouch(event) {
      let playVolumeWrapRect = this.$refs.playVolumeWrap.getBoundingClientRect()
      let clientX = event.changedTouches[0].clientX
      let offsetLeft
      let volume

      this.isShowVolume = true
      offsetLeft = Math.round(clientX - playVolumeWrapRect.left)
      volume = offsetLeft / this.$refs.playVolumeWrap.offsetWidth
      volume = Math.min(volume, 1)
      volume = Math.max(volume, 0)
      this.$refs.audio.volume = volume
      this.currentVolume = volume
    },

    handleVolumeMousemove(event) {
      let playVolumeWrapRect = this.$refs.playVolumeWrap.getBoundingClientRect()
      let clientX = event.clientX
      let offsetLeft
      let volume

      this.isShowVolume = true
      offsetLeft = Math.round(clientX - playVolumeWrapRect.left)
      volume = offsetLeft / this.$refs.playVolumeWrap.offsetWidth
      volume = Math.min(volume, 1)
      volume = Math.max(volume, 0)
      this.$refs.audio.volume = volume
      this.currentVolume = volume
      this.isDraggingVolume = true
    },

    handleVolumeMousedown(event) {
      this.handleVolumeMousemove(event)
      document.addEventListener('mousemove', this.handleVolumeMousemove)
      document.addEventListener('mouseup', this.handleVolumeMouseup)
    },

    handleVolumeMouseup() {
      console.log(`this.isDraggingVolume = false`)
      this.isDraggingVolume = false
      if (this.isDraggingVolume) {
        this.isShowVolume = false
      }
      document.removeEventListener('mousemove', this.handleVolumeMousemove)
      document.removeEventListener('mouseup', this.handleVolumeMouseup)
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
      this.initProgressBarDrag()
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
      this.currentTimeAfterFormat = this.formatTime(
        this.$refs.audio.currentTime
      )

      window.setTimeout(() => {
        this.pause()
        this.$emit('ended', event)

        if (this.isLoop && this.isAutoPlayNext) {
          this.playNext()
        }
      }, 1000)
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
          if (touch.pageX < this.$refs.audioProgressWrap.offsetLeft) {
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
            this.$refs.audioProgressWrap.offsetLeft +
              this.$refs.audioProgressWrap.offsetWidth
          ) {
            // 设置点点
            this.$refs.audioProgressPoint.style.left =
              this.$refs.audioProgressWrap.offsetWidth -
              this.$refs.audioProgressPoint.offsetWidth +
              'px'
            // 设置进度条
            this.$refs.audioProgress.style.width =
              this.$refs.audioProgressWrap.offsetWidth + 'px'
            // 设置当前时间，0.1解决有的浏览器播放完了进度还会再走
            this.currentTime = this.duration - 0.1
            // 设置当前时间（格式化后）
            this.currentTimeAfterFormat = this.formatTime(this.currentTime)
            return
          }

          this.setPointPosition(touch.pageX)
          // 设置进度条
          this.$refs.audioProgress.style.width =
            touch.pageX - this.$refs.audioProgressWrap.offsetLeft + 'px'
          // 设置当前时间
          this.currentTime =
            (this.$refs.audioProgress.offsetWidth /
              this.$refs.audioProgressWrap.offsetWidth) *
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
        this.$refs.audioProgressWrap.offsetLeft +
        'px'
    },

    // 初始化音频进度的点击逻辑
    initProgressBarPoint(event) {
      // 设置当前时间
      this.currentTime =
        ((event.pageX - this.$refs.audioProgressWrap.offsetLeft) /
          this.$refs.audioProgressWrap.offsetWidth) *
        this.duration
      // 设置播放位置
      this.$refs.audio.currentTime = this.currentTime
      this.setPointPosition(event.pageX)
      // 设置进度条
      this.$refs.audioProgress.style.width =
        event.pageX - this.$refs.audioProgressWrap.offsetLeft + 'px'
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
          this.$refs.audioProgressWrap.offsetWidth +
        'px'
      // 设置播放进度拖拽点
      this.$refs.audioProgressPoint.style.left =
        (this.$refs.audio.currentTime / this.$refs.audio.duration) *
          (this.$refs.audioProgressWrap.offsetWidth -
            this.$refs.audioProgressPoint.offsetWidth / 2) +
        'px'
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
.audio-player {
  margin: 0 15px;
}

.audio-player .audio__btn-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio-player .audio__play__icon {
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
}

.audio-player .audio__play-volume-icon-wrap .audio__play-volume-wrap {
  position: absolute;
  width: 60px;
  height: 10px;
  top: 50%;
  right: -60px;
  margin-top: -5px;
  background-color: #ddd;
  border-radius: 4px;
}

.audio-player .audio__play-volume-icon-wrap .audio__play-volume-wrap .audio__play-volume {
  width: 10%;
  height: 100%;
  background-color: #e35924;
  border-radius: 4px;
}

.audio-player .audio__play--previous {
  width: 21px;
  height: 33px;
}

.audio-player .audio__play--previous.disable {
  opacity: 0.5;
}

.audio-player .audio__play--start {
  width: 42px;
  height: 42px;
  margin: 0 20px;
}

.audio-player .audio__play--pause {
  width: 42px;
  height: 42px;
  margin: 0 20px;
}

.audio-player .audio__play--next {
  width: 21px;
  height: 33px;
}

.audio-player .audio__play--next.disable {
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

.audio__loading{
    width: 42px;
    height: 42px;
    position: relative;
    margin: 0 20px;
}
.audio__loading span{
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

.audio__loading span:nth-child(1){
    left: 0;
    top: 50%;
    margin-top:-4px;
    animation-delay:0.13s;
}
.audio__loading span:nth-child(2){
    left: 7px;
    top: 7px;
    animation-delay:0.26s;
}
.audio__loading span:nth-child(3){
    left: 50%;
    top: 0;
    margin-left: -4px;
    animation-delay:0.39s;
}
.audio__loading span:nth-child(4){
    top: 7px;
    right:7px;
    animation-delay:0.52s;
}
.audio__loading span:nth-child(5){
    right: 0;
    top: 50%;
    margin-top:-4px;
    animation-delay:0.65s;
}
.audio__loading span:nth-child(6){
    right: 7px;
    bottom:7px;
    animation-delay:0.78s;
}
.audio__loading span:nth-child(7){
    bottom: 0;
    left: 50%;
    margin-left: -4px;
    animation-delay:0.91s;
}
.audio__loading span:nth-child(8){
    bottom: 7px;
    left: 7px;
    animation-delay:1.04s;
}
</style>
