<template>
  <div class="vue-audio-player">
    <div class="vue-audio-player__btn-wrap">
      <div
        v-if="showPlaybackRate"
        class="vue-audio-player__play-rate"
        :style="{
          color: themeColor,
        }"
      >
        <span @click.stop="isShowRates = !isShowRates">{{
          playbackRate.toFixed(1) + 'x'
        }}</span>
        <transition name="fade-rate">
          <div
            v-show="isShowRates"
            class="vue-audio-player__play-rate__dropdown"
            :style="{
              backgroundColor: themeColor,
            }"
          >
            <div
              v-for="rate in playbackRates"
              :key="'pr_' + rate"
              @click.stop="handleSetPlaybackRate(rate)"
            >
              {{ rate.toFixed(1) + 'x' }}
            </div>
          </div>
        </transition>
      </div>

      <div
        v-if="showPrevButton"
        class="vue-audio-player__play-prev"
        :class="{ disable: !isLoop && currentPlayIndex === 0 }"
        @click.stop="playPrev"
        :style="{
          color: themeColor,
        }"
      >
        <slot name="play-prev">
          <svg
            t="1717510776733"
            class="vue-audio-player__play-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3657"
            width="200"
            height="200"
          >
            <path
              d="M744.4353125 43.919375L280.94 425.3525 280.94 104.4359375a38.5096875 38.5096875 0 1 0-77.47875-0.916875l0 816.5034375a38.5096875 38.5096875 0 1 0 77.47875 0L280.94 596.35625l463.4953125 383.7253125a45.845625 45.845625 0 0 0 76.1034375-33.92625L820.53875 77.845625a45.845625 45.845625 0 0 0-76.1034375-33.92625z"
              p-id="3658"
            ></path>
          </svg>
        </slot>
      </div>

      <div
        v-if="isLoading && showPlayLoading"
        class="vue-audio-player__play-loading"
      >
        <span
          v-for="item in 8"
          :key="item"
          :style="{
            backgroundColor: themeColor,
          }"
        />
      </div>

      <template v-else>
        <div
          v-if="!isPlaying && showPlayButton"
          class="vue-audio-player__play-start"
          @click.stop="play"
          :style="{
            color: themeColor,
          }"
        >
          <slot name="play-start">
            <svg
              class="vue-audio-player__play-icon"
              t="1717510855219"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3799"
              width="200"
              height="200"
            >
              <path
                d="M512 8.97941504c277.81531056 0 503.02058496 225.20527562 503.02058496 503.02058496s-225.20527562 503.02058496-503.02058496 503.02058496S8.97941504 789.81531056 8.97941504 512 234.18468944 8.97941504 512 8.97941504z m-70.12698734 325.48390806c-26.63050141 0-48.23079685 21.60029545-48.23079807 48.23079686v253.81827015a48.23079685 48.23079685 0 0 0 74.26951062 40.56712988l199.46245688-128.1518906a48.23079685 48.23079685 0 0 0-0.35507283-81.37097702l-199.46245689-125.66637833a48.23079685 48.23079685 0 0 0-25.71322921-7.42695094z"
                p-id="3800"
              ></path>
            </svg>
          </slot>
        </div>

        <div
          v-else-if="showPlayButton"
          class="vue-audio-player__play-pause"
          @click.stop="pause"
          :style="{
            color: themeColor,
          }"
        >
          <slot name="play-pause">
            <svg
              t="1717510886292"
              class="vue-audio-player__play-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3945"
              width="200"
              height="200"
            >
              <path
                d="M512 1012.62222187C234.38222187 1012.62222187 11.37777813 789.61777813 11.37777813 512S234.38222187 11.37777813 512 11.37777813s500.62222187 223.0044448 500.62222187 500.62222187-223.0044448 500.62222187-500.62222187 500.62222187z m136.53333333-682.66666667c-27.30666667 0-45.51111147 18.2044448-45.51111146 45.51111147v273.06666666c0 27.30666667 18.2044448 45.51111147 45.51111146 45.51111147s45.51111147-18.2044448 45.51111147-45.51111147V375.46666667c0-27.30666667-18.2044448-45.51111147-45.51111147-45.51111147zM375.46666667 329.9555552c-27.30666667 0-45.51111147 18.2044448-45.51111147 45.51111147v273.06666666c0 27.30666667 18.2044448 45.51111147 45.51111147 45.51111147s45.51111147-18.2044448 45.51111146-45.51111147V375.46666667c0-27.30666667-18.2044448-45.51111147-45.51111146-45.51111147z"
                p-id="3946"
              ></path>
            </svg>
          </slot>
        </div>
      </template>

      <div
        v-if="showNextButton"
        class="vue-audio-player__play-next"
        :class="{
          disable: !isLoop && currentPlayIndex === audioList.length - 1,
        }"
        @click.stop="playNext"
        :style="{
          color: themeColor,
        }"
      >
        <slot name="play-next">
          <svg
            t="1717510922648"
            class="vue-audio-player__play-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4091"
            width="200"
            height="200"
          >
            <path
              d="M279.5646875 980.080625L743.06 598.6475 743.06 919.5640625a38.5096875 38.5096875 0 1 0 77.47875 0.916875l0-816.5034375a38.5096875 38.5096875 0 1 0-77.47875 0L743.06 427.64375l-463.4953125-383.7253125a45.845625 45.845625 0 0 0-76.1034375 33.92625L203.46125 946.154375a45.845625 45.845625 0 0 0 76.1034375 33.92625z"
              p-id="4092"
            ></path>
          </svg>
        </slot>
      </div>

      <div
        v-if="showVolumeButton"
        class="vue-audio-player__play-volume-icon-wrap"
      >
        <svg
          t="1717511047008"
          class="vue-audio-player__play-icon"
          :style="{
            color: themeColor,
          }"
          @click.stop="handleVolumeIconTouchstart"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4233"
          width="200"
          height="200"
        >
          <path
            d="M1009.6852389 501.04265842v72.84551793c-12.28886699 137.14708366-93.42867683 254.45999047-208.60559588 317.12488904L762.68733667 817.14116381A318.92799715 318.92799715 0 0 0 928.10158763 537.46541682a319.0112165 319.0112165 0 0 0-175.15102891-284.80766635l38.33682717-73.87190158c120.33657856 61.22241365 205.74836509 181.25385159 218.39785301 322.25680953z m-165.69165255 27.96202667a248.96745017 248.96745017 0 0 1-120.17013874 213.51559395l-38.55874617-74.0660827a165.77487189 165.77487189 0 0 0 75.50856761-139.44951125 165.77487189 165.77487189 0 0 0-78.03291762-141.08617842l38.44778667-74.01060238a248.96745017 248.96745017 0 0 1 122.80544825 215.0967808zM625.26285255 162.75206827V872.89877618c0 56.72851683-70.04376747 84.24670094-109.29601764 42.94168462l-182.44667619-166.55159523H110.71162937a83.2203173 83.2203173 0 0 1-83.2203173-83.2203173V388.44556857a83.2203173 83.2203173 0 0 1 78.31031808-83.0816165l5.60350208-0.1387008 224.9167781 3.74491478 179.67266474-189.13204224c39.22451001-41.33275762 109.2960165-13.78683221 109.29601764 42.94168348z"
            p-id="4234"
          ></path>
        </svg>

        <transition name="fade-volume">
          <div
            v-show="isShowVolume"
            ref="playVolumeWrap"
            class="vue-audio-player__play-volume-wrap"
            @click.stop="handleVolumePanmove"
          >
            <div
              ref="playVolume"
              class="vue-audio-player__play-volume"
              :style="{
                height: currentVolume * 100 + '%',
                backgroundColor: themeColor,
              }"
            />
          </div>
        </transition>
      </div>

      <div v-show="isShowErrorMessage" class="vue-audio-player__notice">
        {{ noticeMessage }}
      </div>
    </div>

    <div
      v-show="showProgressBar"
      ref="audioProgressWrap"
      class="vue-audio-player__progress-wrap"
      :style="{
        cursor: disabledProgressClick ? 'auto' : 'pointer',
      }"
      @click.stop="handleClickProgressWrap"
    >
      <div
        ref="audioProgress"
        class="vue-audio-player__progress"
        :style="{
          backgroundColor: themeColor,
        }"
      />
      <div
        ref="audioProgressPoint"
        class="vue-audio-player__progress-point"
        :style="{
          backgroundColor: themeColor,
          boxShadow: `0 0 10px 0 ${themeColor}`,
          cursor: disabledProgressDrag ? 'auto' : 'pointer',
        }"
      />
    </div>

    <div v-show="showProgressBar" class="vue-audio-player__time-wrap">
      <div class="vue-audio-player__current-time">
        {{ currentTimeFormatted }}
      </div>
      <div class="vue-audio-player__duration">
        {{ durationFormatted }}
      </div>
    </div>

    <audio
      ref="audio"
      class="vue-audio-player__audio"
      :src="audioList?.[currentPlayIndex]?.src || audioList?.[currentPlayIndex]"
      v-bind="$attrs"
      @ended="onEnded"
      @durationchange="onDurationchange"
    >
      浏览器太老咯，请升级浏览器吧~
    </audio>
  </div>
</template>

<script>
export default {
  name: 'VueAudioPlayer',

  inheritAttrs: false,

  props: {
    // 音频播放列表
    audioList: {
      require: true,
      default: () => [],
      type: Array,
    },

    // 是否显示播放按钮
    showPlayButton: {
      default: true,
      type: Boolean,
    },

    // 是否显示上一首按钮
    showPrevButton: {
      default: true,
      type: Boolean,
    },

    // 是否显示下一首按钮
    showNextButton: {
      default: true,
      type: Boolean,
    },

    // 是否显示音量按钮
    showVolumeButton: {
      default: true,
      type: Boolean,
    },

    // 显示进度条
    showProgressBar: {
      default: true,
      type: Boolean,
    },

    // 播放前的回调函数
    beforePlay: {
      default: null,
      type: Function,
    },

    // 上一首前的回调函数
    beforePrev: {
      default: null,
      type: Function,
    },

    // 下一首前的回调函数
    beforeNext: {
      default: null,
      type: Function,
    },

    // 是否列表循环播放
    isLoop: {
      type: Boolean,
      default: true,
    },

    // 是否自动播放下一首
    isAutoPlayNext: {
      type: Boolean,
      default: true,
    },

    // 进度更新间隔
    progressInterval: {
      default: 500,
      type: Number,
    },

    // 是否显示倍速播放速率
    showPlaybackRate: {
      type: Boolean,
      default: true,
    },

    // 是否显示播放时的 loading
    showPlayLoading: {
      type: Boolean,
      default: true,
    },

    playbackRates: {
      type: Array,
      default: () => [0.5, 1, 1.5, 2],
    },

    themeColor: {
      type: String,
      default: '#EC4141',
    },

    // 是否禁用进度条可拖拽功能
    disabledProgressDrag: {
      type: Boolean,
      default: false,
    },

    // 是否禁用进度条可点击功能
    disabledProgressClick: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'pause',
    'play-prev',
    'play-next',
    'timeupdate',
    'durationchange',
    'ended',
    'progress-start',
    'progress-end',
    'progress-move',
    'progress-click',
    'playing',
    'play',
    'play-error',
  ],

  data() {
    return {
      isIOS: /iPhone|iPad|iPod/i.test(navigator?.userAgent), // 是否是IOS设备
      isPlaying: false, // 音频是否正在播放
      isDragging: false, // 是否正在拖拽音频进度
      isDraggingVolume: false, // 是否正在拖拽音量进度
      isShowErrorMessage: false,
      isLoading: false,
      isShowVolume: false,
      isShowRates: false,
      timer: null,
      noticeMessage: '',
      duration: 0, // 音频持续时间
      currentPlayIndex: 0, // 当前播放的音频位置索引
      currentTime: '', // 音频当前播放时间
      currentVolume: 1, // 当前音量
      playbackRate: 1, // 当前播放速率
      canProgressDrag: true,
    }
  },

  computed: {
    currentTimeFormatted() {
      return this.currentTime ? this.formatTime(this.currentTime) : '00:00'
    },

    durationFormatted() {
      return this.duration ? this.formatTime(this.duration) : '00:00'
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.audioProgressPoint?.addEventListener?.(
        'mousedown',
        this.handleProgressPanstart,
      )

      document?.addEventListener?.('mousemove', this.handleProgressPanmove)
      document?.addEventListener?.('mouseup', this.handleProgressPanend)

      this.$refs.playVolumeWrap?.addEventListener?.(
        'touchmove',
        this.handleVolumePanmove,
      )

      this.$refs.audioProgressPoint?.addEventListener?.(
        'touchstart',
        this.handleProgressPanstart,
      )

      document?.addEventListener?.('touchmove', this.handleProgressPanmove)
      document?.addEventListener?.('touchend', this.handleProgressPanend)

      this.$refs.audio.load() // 强制加载音频元数据，否则第一次加载有的浏览器或 Next 框架导致 audio durationchange 事件不执行
    })
  },

  beforeUnmount() {
    this.pause()

    this.$refs.audioProgressPoint.removeEventListener(
      'mousedown',
      this.handleProgressPanstart,
    )

    document.removeEventListener('mousemove', this.handleProgressPanmove)
    document.removeEventListener('mouseup', this.handleProgressPanend)

    this.$refs.playVolumeWrap.removeEventListener(
      'mousemove',
      this.handleVolumePanmove,
    )

    this.$refs.audioProgressPoint.removeEventListener(
      'touchstart',
      this.handleProgressPanstart,
    )

    document.removeEventListener('touchmove', this.handleProgressPanmove)
    document.removeEventListener('touchend', this.handleProgressPanend)
  },

  methods: {
    updateMediaMetadata() {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: this.audioList[this.currentPlayIndex].title,
          artist: this.audioList[this.currentPlayIndex].artist,
          album: this.audioList[this.currentPlayIndex].album,
          artwork: this.audioList[this.currentPlayIndex].artwork,
        })

        navigator.mediaSession.setActionHandler('play', () => {
          this.play()
        })

        navigator.mediaSession.setActionHandler('pause', () => {
          this.pause()
        })

        navigator.mediaSession.setActionHandler('previoustrack', () => {
          this.playPrev()
        })

        navigator.mediaSession.setActionHandler('nexttrack', () => {
          this.playNext()
        })
      }
    },

    handleVolumeIconTouchstart() {
      this.isShowVolume = !this.isShowVolume
    },

    handleVolumePanmove(event) {
      let playVolumeWrapRect = this.$refs.playVolumeWrap.getBoundingClientRect()
      let pageY = event.pageY || event.touches[0].pageY
      let offsetTop
      let volume

      offsetTop = Math.round(playVolumeWrapRect.bottom - pageY)
      volume = offsetTop / this.$refs.playVolumeWrap.offsetHeight
      volume = Math.min(volume, 1)
      volume = Math.max(volume, 0)
      this.$refs.audio.volume = volume
      this.currentVolume = volume
    },

    // 设定播放速率
    handleSetPlaybackRate(rate) {
      this.playbackRate = +rate
      this.$refs.audio.playbackRate = +rate
      this.isShowRates = false
    },

    // 错误消息处理
    handleShowErrorMessage(opts = {}) {
      this.noticeMessage = opts.message
      this.isShowErrorMessage = true

      setTimeout(() => {
        this.isShowErrorMessage = false
      }, opts.duration || 3000)
    },

    // 当音频/视频的时长已更改时触发
    onDurationchange(event) {
      this.duration = this.$refs.audio.duration // 需要用 durationchange 事件拿 duration，不能用 loadedmetadata 拿，因为 loadedmetadata 事件在小米等自带浏览器拿不到 duration

      this.$emit('durationchange', event)
    },

    // 格式化秒为分
    formatTime(second) {
      let minute = 0

      minute = Math.floor(second / 60) // 将秒数除以60，然后下舍入，既得到分钟数
      second = Math.ceil(second % 60) // 取得秒%60的余数，既得到秒数

      // 秒数为 60 时分钟 +1，秒数重置
      if (second >= 60) {
        minute++
        second = 0
      }

      // 转换为字符串
      minute = String(minute)
      second = String(second)

      // 如果只有一位数，前面增加一个0
      minute = minute.length === 1 ? '0' + minute : minute
      second = second.length === 1 ? '0' + second : second

      return minute + ':' + second
    },

    // 音频播放完毕
    onEnded(event) {
      // 等待最后一次的 currentTime 更新进度条后再停止播放
      setTimeout(() => {
        this.pause()

        if (this.isLoop && this.isAutoPlayNext) {
          this.playNext()
        }

        this.$emit('ended', event)
      }, this.progressInterval)
    },

    handleProgressPanstart(event) {
      this.canProgressDrag = false // 点点拖拽的时候为了不执行点击进度条的逻辑

      if (this.disabledProgressDrag) return

      this.isDragging = true

      this.$emit('progress-start', event)
    },

    handleProgressPanend(event) {
      if (this.disabledProgressDrag || !this.isDragging) return

      this.isDragging = false

      this.play({
        currentTime: this.currentTime,
      })

      this.$emit('progress-end', event)
    },

    handleProgressPanmove(event) {
      if (this.disabledProgressDrag || !this.isDragging) return

      let pageX = event.pageX || event.touches[0].pageX
      let bcr = this.$refs.audioProgressPoint.getBoundingClientRect()

      let targetLeft = parseInt(
        getComputedStyle(this.$refs.audioProgressPoint).left,
      )

      let offsetLeft = targetLeft + (pageX - bcr.left)

      offsetLeft = Math.min(
        offsetLeft,
        this.$refs.audioProgressWrap.offsetWidth,
      )

      offsetLeft = Math.max(offsetLeft, 0)

      this.setPointPosition(offsetLeft) // 设置点点位置

      this.$refs.audioProgress.style.width = offsetLeft + 'px' // 设置进度条

      this.currentTime =
        (offsetLeft / this.$refs.audioProgressWrap.offsetWidth) * this.duration // 设置当前时间

      this.$emit('progress-move', event)
    },

    // 初始化音频进度的点击逻辑
    handleClickProgressWrap(event) {
      // 如果是禁用状态或者一开始点击的是进度条的点点
      if (this.disabledProgressClick || !this.canProgressDrag) {
        this.canProgressDrag = true
        return
      }

      let target = event.target
      let pageX = event.pageX || event.touches[0].pageX
      let bcr = target.getBoundingClientRect()
      let targetLeft = parseInt(getComputedStyle(target).left)
      let offsetLeft = targetLeft + (pageX - bcr.left)

      if (target === this.$refs.audioProgressPoint) {
        return
      }

      this.currentTime =
        (offsetLeft / this.$refs.audioProgressWrap.offsetWidth) * this.duration // 设置当前播放位置

      this.play({
        currentTime: this.currentTime,
      })

      this.setPointPosition(offsetLeft) // 设置点点位置

      this.$refs.audioProgress.style.width = offsetLeft + 'px' // 设置进度条
      this.canProgressDrag = true

      this.$emit('progress-click', event)
    },

    // 设置点点位置
    setPointPosition(offsetLeft) {
      this.$refs.audioProgressPoint.style.left =
        offsetLeft - this.$refs.audioProgressPoint.offsetWidth / 2 + 'px'
    },

    // 播放中
    playing() {
      // 正在拖拽进度
      if (this.isDragging) {
        return
      }

      let offsetLeft =
        (this.$refs.audio.currentTime / this.$refs.audio.duration) *
        this.$refs.audioProgressWrap.offsetWidth

      this.currentTime = this.$refs.audio.currentTime
      this.$refs.audioProgress.style.width = offsetLeft + 'px' // 设置播放进度条
      this.setPointPosition(offsetLeft) // 设置播放进度拖拽点位置
      this.$emit('playing')
    },

    // 开始播放
    play(opts = {}) {
      return new Promise((resolve, reject) => {
        this.isLoading = true

        let handlePlay = () => {
          this.$refs.audio
            .play()
            .then(() => {
              this.$nextTick(() => {
                if (opts?.currentTime) {
                  this.$refs.audio.currentTime = opts.currentTime
                }

                if (this.timer) {
                  this.currentTime = this.$refs.audio.currentTime
                } else {
                  this.timer = setInterval(this.playing, this.progressInterval)
                }

                this.isPlaying = true
                this.isLoading = false
                this.$refs.audio.playbackRate = this.playbackRate

                this.$emit('play')

                resolve(this.$refs.audio)
              })
            })
            .catch((data) => {
              this.handleShowErrorMessage({
                message: data.message,
              })

              // Failed to load because no supported source was found.
              if (data.code === 9) {
                if (this.isAutoPlayNext) {
                  setTimeout(() => {
                    this.playNext()
                  }, 3000)
                }
              }

              this.isLoading = false
              this.$emit('play-error', data)
              reject(data)
            })

          this.updateMediaMetadata()
        }

        // 解决 iOS 异步请求后无法播放
        if (this.isIOS) {
          console.log(
            '为了解决 iOS 设备接口异步请求后出现无法播放问题，请无视 The play() request was interrupted by a call to pause() 错误',
          )
          this.$refs.audio.play()
          this.$refs.audio.pause()
        }

        if (this.beforePlay) {
          this.beforePlay((state) => {
            if (state !== false) {
              handlePlay()
            }
          })
          return
        }

        handlePlay()
      })
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
      this.duration = 0

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
        this.beforePrev((state) => {
          if (state !== false) {
            handlePrev()
          }
        })
        return
      }
      handlePrev()
    },

    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },

    // 播放下一首
    playNext() {
      if (this.currentPlayIndex + 1 >= this.audioList.length && !this.isLoop) {
        // 无下一首了
        return
      }

      this.clearTimer()
      this.duration = 0

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
        this.beforeNext((state) => {
          if (state !== false) {
            handleNext()
          }
        })
        return
      }

      handleNext()
    },
  },
}
</script>

<style>
@keyframes fadeVolume {
  from {
    height: 0;
  }
  to {
    height: 50px;
  }
}

@keyframes fadeRate {
  from {
    max-height: 0;
  }
  to {
    max-height: 120px;
  }
}

.fade-volume-enter-active {
  animation: fadeVolume 0.3s;
}

.fade-volume-leave-active {
  animation: fadeVolume 0.3s reverse;
}

.fade-rate-enter-active {
  animation: fadeRate 0.3s;
}

.fade-rate-leave-active {
  animation: fadeRate 0.3s reverse;
}

.vue-audio-player .vue-audio-player__btn-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vue-audio-player .vue-audio-player__play-icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
  overflow: hidden;
}

.vue-audio-player .vue-audio-player__play-volume-icon-wrap {
  position: relative;
  width: 21px;
  height: 21px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
  margin-left: 16px;
}

.vue-audio-player
  .vue-audio-player__play-volume-icon-wrap
  .vue-audio-player__play-volume-wrap {
  position: absolute;
  width: 14px;
  height: 50px;
  bottom: 21px;
  left: 0;
  background-color: #ddd;
  border-radius: 10px;
}

.vue-audio-player
  .vue-audio-player__play-volume-icon-wrap
  .vue-audio-player__play-volume-wrap
  .vue-audio-player__play-volume {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 10px;
}

.vue-audio-player .vue-audio-player__play-rate {
  position: relative;
  height: 21px;
  line-height: 21px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
  font-size: 14px;
  margin-right: 16px;
}

.vue-audio-player .vue-audio-player__play-rate__dropdown {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px;
  color: #fff;
  border-radius: 15px;
  font-size: 12px;
  overflow: hidden;
}

.vue-audio-player .vue-audio-player__play-prev {
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
}

.vue-audio-player .vue-audio-player__play-prev svg {
  display: block;
  width: 21px;
  height: 33px;
}

.vue-audio-player .vue-audio-player__play-prev.disable {
  opacity: 0.5;
}

.vue-audio-player .vue-audio-player__play-start {
  margin: 0 16px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
}

.vue-audio-player .vue-audio-player__play-start svg {
  display: block;
  width: 42px;
  height: 42px;
}

.vue-audio-player .vue-audio-player__play-pause {
  margin: 0 16px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
}

.vue-audio-player .vue-audio-player__play-pause svg {
  display: block;
  width: 42px;
  height: 42px;
}

.vue-audio-player .vue-audio-player__play-next {
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
}

.vue-audio-player .vue-audio-player__play-next svg {
  display: block;
  width: 21px;
  height: 33px;
}

.vue-audio-player .vue-audio-player__play-next.disable {
  opacity: 0.5;
}

.vue-audio-player__notice {
  position: absolute;
  bottom: -15px;
  color: rgb(189, 178, 178);
  border-radius: 4px;
  font-size: 12px;
}

.vue-audio-player .vue-audio-player__progress-wrap {
  position: relative;
  background: #ddd;
  height: 4px;
  border-radius: 3px;
  margin-top: 20px;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.vue-audio-player .vue-audio-player__progress {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  border-radius: 3px;
}

.vue-audio-player .vue-audio-player__progress-point {
  position: absolute;
  left: -8px;
  top: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-top: -8px;
}

.vue-audio-player .vue-audio-player__progress-point:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  background: #fff;
  border-radius: 50%;
}

.vue-audio-player .vue-audio-player__time-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 7px;
}

.vue-audio-player .vue-audio-player__current-time {
  font-size: 10px;
  color: #888;
}

.vue-audio-player .vue-audio-player__duration {
  font-size: 10px;
  color: #888;
}

.vue-audio-player .vue-audio-player__audio {
  display: block;
  margin: 0 auto;
}

@media (any-hover: hover) {
  .vue-audio-player .vue-audio-player__play-rate:hover > span {
    opacity: 0.7;
  }

  .vue-audio-player .vue-audio-player__play-rate__dropdown > div:hover,
  .vue-audio-player__play-icon:hover {
    opacity: 0.7;
  }
}

.vue-audio-player__play-loading {
  width: 42px;
  height: 42px;
  position: relative;
  margin: 0 16px;
}

.vue-audio-player__play-loading span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  animation: loading 1.04s ease infinite;
}

@keyframes loading {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

.vue-audio-player__play-loading span:nth-child(1) {
  left: 0;
  top: 50%;
  margin-top: -4px;
  animation-delay: 0.13s;
}

.vue-audio-player__play-loading span:nth-child(2) {
  left: 7px;
  top: 7px;
  animation-delay: 0.26s;
}

.vue-audio-player__play-loading span:nth-child(3) {
  left: 50%;
  top: 0;
  margin-left: -4px;
  animation-delay: 0.39s;
}

.vue-audio-player__play-loading span:nth-child(4) {
  top: 7px;
  right: 7px;
  animation-delay: 0.52s;
}

.vue-audio-player__play-loading span:nth-child(5) {
  right: 0;
  top: 50%;
  margin-top: -4px;
  animation-delay: 0.65s;
}

.vue-audio-player__play-loading span:nth-child(6) {
  right: 7px;
  bottom: 7px;
  animation-delay: 0.78s;
}

.vue-audio-player__play-loading span:nth-child(7) {
  bottom: 0;
  left: 50%;
  margin-left: -4px;
  animation-delay: 0.91s;
}

.vue-audio-player__play-loading span:nth-child(8) {
  bottom: 7px;
  left: 7px;
  animation-delay: 1.04s;
}
</style>
