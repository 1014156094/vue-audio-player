<template>
  <section class="audio-conatiner">
    <div class="audio-name">{{ audioName }}</div>
    <div class="audio-btn-container">
      <!-- openAppAudioDetail -->
      <img class="play-previous-btn"
           src="./icon-play-previous.png"
           @click="audioPrevHandler">
      <img class="play-start-btn"
           src="./icon-play-start.png"
           v-if="!audioPlay"
           @click="audioPlayHandler">
      <img class="play-start-btn"
           src="./icon-play-pause.png"
           v-else
           @click="audioPlayHandler">
      <!-- openAppAudioDetail -->
      <img class="play-next-btn"
           src="./icon-play-next.png"
           @click="audioNextHandler">
    </div>
    <!-- 滑动进度条 -->
    <div class="audio-progress-container">
      <div class="audio-progress" />
      <img class="audio-progress-point"
           src="./icon-play-progress-point.png">
    </div>
    <div class="audio-time-container">
      <div class="audio-current-time">{{ audioCurrentTimeFormatAfter || '00:00' }}</div>
      <div class="audio-duration">{{ audioDurationFormatAfter }}</div>
    </div>
    <!-- 播放器控件 -->
    <!-- <audio-control id="audioControl"
                   ref="audioControl"
                   :url="audioUrl"
                   @onPlaying="onPlaying"
                   @onTimeUpdate="onTimeUpdate"
                   @onEnded="onEnded"
                   @onCanplay="onCanplay" /> -->
    <audio id="audioControl"
           preload="metadata"
           ref="audio"
           :src="audioUrl"
           @ended="onEnded"
           @playing="onPlaying"
           @timeupdate="onTimeUpdate">浏览器太老咯，请升级浏览器吧~</audio>
  </section>
</template>

<script>
export default {
  name: 'audio-player',
  props: {
    // 音频地址
    audioUrl: {
      default: '',
      type: String
    },
    // 音频名字
    audioName: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      audioDOM: '', // 音频DOM
      audioPlay: false, // 音频是否正在播放
      audioDuration: '', // 音频持续时间
      audioDurationFormatAfter: '', // 音频持续时间（格式化后）
      audioTimer: '', // 音频播放计时器
      audioCurrentTime: '', // 音频播放当时时间
      audioCurrentTimeFormatAfter: '', // 音频播放当时时间（格式化后）
      audioDetail: '', // 音频详情
      audioControl: null, // 音频控件
      audioDragProgress: false // 是否正在拖拽音频进度
    }
  },
  created () {
    // 初始化音频
    this.$nextTick(() => {
      console.dir(this.$refs.audio)
      console.log(this.$refs.audio.duration)
      this.audioDuration = this.$refs.audio.duration
      this.initAudioProgressDrag()
    })
  },
  methods: {
    // 正在播放音频中
    onTimeUpdate (val) {
      this.progressValue = this.audioControl.currentTime / (this.audioControl.duration / 100)
      this.audioCurrentTimeFormatAfter = this.formatTime(this.audioControl.currentTime)

      // 正在拖拽进度
      if (this.audioDragProgress) {
        return
      }
      let audioProgressContainer = document.querySelector('.audio-progress-container')
      let audioProgress = document.querySelector('.audio-progress')
      let audioProgressPoint = document.querySelector('.audio-progress-point')

      // 设置播放进度条
      audioProgress.style.width =
        this.audioControl.currentTime / this.audioControl.duration * audioProgressContainer.offsetWidth + 'px'
      // 设置播放进度拖拽点
      audioProgressPoint.style.left =
        this.audioControl.currentTime /
        this.audioControl.duration *
        (audioProgressContainer.offsetWidth - audioProgressPoint.offsetWidth / 2) +
        'px'
    },
    // 格式化时间
    formatTime (second) {
      return [parseInt((second / 60) % 60), parseInt(second % 60)].join(':').replace(/\b(\d)\b/g, '0$1')
    },
    // 音频播放
    onPlaying (val) {
      if (this.canAddView) {
        this.addViews()
        this.canAddView = false
      }
      console.log(' onPlaying')
    },
    // 播放音频完毕执行事件
    onEnded () {
      this.audioNextHandler()
    },
    // 初始化音频进度的拖拽逻辑
    initAudioProgressDrag () {
      let audioProressPoint = document.querySelector('.audio-progress-point')
      let audioProgress = document.querySelector('.audio-progress')
      let audioProgressContainer = document.querySelector('.audio-progress-container')

      audioProressPoint.addEventListener(
        'touchstart',
        event => {
          // 设置拖拽中
          this.audioDragProgress = true
        },
        false
      )
      audioProressPoint.addEventListener(
        'touchmove',
        event => {
          let touch = event.touches[0]

          // 超出范围
          if (
            touch.pageX < audioProgressContainer.offsetLeft ||
            touch.pageX > audioProgressContainer.offsetLeft + audioProgressContainer.offsetWidth
          ) {
            return
          }
          // 设置点点
          audioProressPoint.style.left =
            touch.pageX - audioProressPoint.offsetWidth / 2 - audioProgressContainer.offsetLeft + 'px'
          // 设置进度条
          audioProgress.style.width = touch.pageX - audioProgressContainer.offsetLeft + 'px'
          // 设置当前时间
          this.audioCurrentTime =
            audioProgress.offsetWidth / audioProgressContainer.offsetWidth * this.audioDuration
          // 设置当前时间（格式化后）
          this.audioCurrentTimeFormatAfter = this.formatTime(this.audioCurrentTime)
        },
        false
      )
      audioProressPoint.addEventListener(
        'touchend',
        event => {
          // 设置播放位置
          if (this.audioDOM) {
            this.audioDOM.currentTime = this.audioCurrentTime
          }
          // 设置未拖拽
          this.audioDragProgress = false
        },
        false
      )

      this.initAudioProgressClick()
      console.log('初始化音频进度的拖拽逻辑', this.audioPlay)
    },
    // 初始化音频进度的点击逻辑
    initAudioProgressClick () {
      let audioProressPoint = document.querySelector('.audio-progress-point')
      let audioProgress = document.querySelector('.audio-progress')
      let audioProgressContainer = document.querySelector('.audio-progress-container')

      audioProgressContainer.addEventListener('click', event => {
        let touch = event
        debugger

        // 设置点点
        audioProressPoint.style.left =
          touch.pageX - audioProressPoint.offsetWidth / 2 - audioProgressContainer.offsetLeft + 'px'
        // 设置进度条
        audioProgress.style.width = touch.pageX - audioProgressContainer.offsetLeft + 'px'
        // 设置当前时间
        this.audioCurrentTime =
          audioProgress.offsetWidth / audioProgressContainer.offsetWidth * this.audioDuration
        // 设置当前时间（格式化后）
        this.audioCurrentTimeFormatAfter = this.formatTime(this.audioCurrentTime)
        // 设置播放位置
        if (this.audioDOM) {
          this.audioDOM.currentTime = this.audioCurrentTime
        }
      })
      console.log('初始化音频进度的点击逻辑', this.audioPlay)
    },
    // 权限判断播放
    validateAudioPlay () {
      this.audioDOM = document.getElementById('audioControl')
      this.audioControl = document.getElementById('audioControl')
    },
    // 点击播放or暂停
    audioPlayHandler () {
      if (!this.audioPlay) {
        this.$refs.audio.play()
        this.audioPlay = true
        this.validateAudioPlay()
        console.log('开始', this.audioPlay)
      } else {
        this.$refs.audio.pause()
        this.audioPlay = false
        console.log('暂停', this.audioPlay)
      }
    },
    // 切换上一首
    audioPrevHandler () {
      let index = 0
      if (this.performList.length > 0) {
        for (let i in this.performList) {
          if (this.performList[i].file.url === this.audioUrl) { index = i }
        }
      }
      let currentIndex = index - 1 < 0 ? this.performList.length - 1 : --index
      this.audioUrl = this.performList[currentIndex].file.url
      this.audioName = this.performList[currentIndex].title
      this.audioDetail = this.performList[currentIndex]
      this.currentPerform = this.performList[currentIndex]

      this.progressValue = 0
      setTimeout(() => { this.validateAudioPlay() }, 500)

      console.log('切换上一首', this.audioName)
    },
    // 切换下一首
    audioNextHandler () {
      let index = 0
      if (this.performList.length > 0) {
        for (let i in this.performList) {
          if (this.performList[i].file.url === this.audioUrl) { index = i }
        }
      }
      let currentIndex = index < (this.performList.length - 1) ? ++index : 0
      this.audioUrl = this.performList[currentIndex].file.url
      this.audioName = this.performList[currentIndex].title
      this.audioDetail = this.performList[currentIndex]
      this.currentPerform = this.performList[currentIndex]

      this.progressValue = 0
      setTimeout(() => { this.validateAudioPlay() }, 500)

      console.log('切换下一首', this.audioName)
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
