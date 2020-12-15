<h3 align="center" style="margin: 30px 0 35px;">Vue音频播放器组件</h3>

<p align="center">
    <img src="https://img.shields.io/npm/v/@liripeng/vue-audio-player.svg" alt="npm version" />
    <img src="https://img.shields.io/bundlephobia/minzip/vue-audio-player.svg" alt="Build Status" />
</p>

---

## 在线预览 Demo
<a href="https://codesandbox.io/s/liripengvue-audio-player-issue-moban-cb57s?file=/src/App.vue&resolutionWidth=320&resolutionHeight=675">点我在线预览 Demo</a>

## 特性
- 完善的文档和示例
- 支持进度条拖拽（PC 端需引入一个小小的包模拟 Touch 事件，<a href="https://github.com/1014156094/vue-audio-player/issues/10">教程</a>）
- 原生 CSS，无须引入 Less、Scss 等预编译语言

## 安装
```
npm i -S @liripeng/vue-audio-player
```

## 按需引入
```
import { AudioPlayer } from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'

components: {
  AudioPlayer
}
```

## 全局引入
```
import AudioPlayer from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'

Vue.use(AudioPlayer)
```

## 使用
```
<template>
  <div>
    {{ currentAudioName || audioList[0].name }}
    <audio-player
      ref="audioPlayer"
      :audio-list="audioList.map(elm => elm.url)"
      :before-play="handleBeforePlay"
    />
  </div>
</template>

<script>
import { AudioPlayer } from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'

export default {
  components: {
    AudioPlayer
  },

  data() {
    return {
      currentAudioName: '',
      audioList: [
        {
          name: '音频1',
          url: 'https://www.0dutv.com/upload/dance/F25F74A0B8FF82503241801D0E2CA5CD.mp3'
        },
        {
          name: '音频2',
          url: 'https://www.0dutv.com/upload/dance/20200316/C719452E3C7834080007662021EA968E.mp3'
        }
      ]
    }
  },

  methods: {
    // 播放前做的事
    handleBeforePlay(next) {
      // 这里可以做一些事情...
      this.currentAudioName = this.audioList[this.$refs.audioPlayer.currentPlayIndex].name

      next() // 开始播放
    }
  }
}
</script>
```

## Prop
| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| audio-list | 音频播放列表 | `Array` | - |
| show-play-button | 是否显示播放按钮 | `Boolean` | `true` |
| show-prev-button | 是否显示上一首按钮 | `Boolean` | `true` |
| show-next-button | 是否显示下一首按钮 | `Boolean` | `true` |
| show-volume-button | 是否显示音量按钮 | `Boolean` | `true` |
| show-progress-bar | 是否显示进度条 | `Boolean` | `true` |
| isLoop | 是否列表循环播放 | `Boolean` | `true` |
| progressInterval | 进度更新间隔 | `Number` | `1000` |
| before-play | 播放开始前的回调函数<br>调用 next() 后开始播放 | `(next)=>void` | - |
| before-prev | 播放上一首前的回调函数<br>调用 next() 后开始播放上一首 | `(next)=>void` | - |
| before-next | 播放下一首前的回调函数<br>调用 next() 后开始播放下一首 | `(next)=>void` | - |
| 其他的与原生 `audio` 一致 |

## Event
| 事件 | 说明 | 回调 |
| - | - | - |
| play | 播放开始后触发 | - |
| pause | 播放暂停后触发 | - |
| play-prev | 播放上一首后触发 | - |
| play-next | 播放下一首后触发 | - |
| playing | 播放中每 `progressInterval` 秒触发 | - |
| timeupdate | 当前的播放位置发送改变时触发 | `event` |
| loadedmetadata | 当媒介元素的持续时间以及其它媒介已加载数据时运行脚本触发 | `event` |
| ended | 音频播放结束后触发 | `event` |
| 其他的与原生 `audio` 一致 |

## Data
| 变量 | 说明 | 默认值 |
| - | - | - |
| currentPlayIndex | 当前播放的音频索引 | `0` |
| isPlaying | 音频是否正在播放 | `false` |
| duration | 音频持续时间 | - |
| currentTime | 音频当前播放时间 | - |

使用 `ref` 调用， 更多请自行查看组件 [data](https://github.com/1014156094/vue-audio-player/blob/master/packages/audio-player/index.vue)

## Method
| 方法 | 说明 | 回调 |
| - | - | - |
| play | 开始播放 | - |
| pause | 暂停播放 | - |
| playPrev | 播放上一首 | - |
| playNext | 播放下一首 | - |

使用 `ref` 调用， 更多请自行查看组件 [methods](https://github.com/1014156094/vue-audio-player/blob/master/packages/audio-player/index.vue)

## 更新日志

### v1.1.1【2020/12/11】
- 修复：引入包报错
### v1.1.0【2020/12/11】
- 新增：调节音量功能
- 新增：`show-volume-button` 属性
- 新增：`is-auto-playNext` 属性
- 新增：播放失败自动播放下一首，`is-auto-playNext` 为 `false` 则不会自动播放下一首
- 新增：音频加载中 `svg` 动画，可用 `CSS` 覆盖颜色 
- 修改：`play` 事件触发调前
- 修改：部分类名

### v1.0.8【2020/11/17】

- 修复：<a href="https://github.com/1014156094/vue-audio-player/issues/17">#17</a>

### v1.0.7【2020/10/02】
- 修复：<a href="https://github.com/1014156094/vue-audio-player/issues/12">#12</a>

### v1.0.6【2020/04/28】
- 优化：不自带 `babel-polyfill`

### v1.0.5【2019/11/21】
- 修复：<a href="https://github.com/1014156094/vue-audio-player/issues/5">#5</a>

### v1.0.4【2019/10/16】
- 修复：`isLoop` 无效
- 修改：类名
- 修改：使用原生 `CSS`

## 许可证
`MIT`

## FAQ

- 不支持后台播放控制？<a href="https://github.com/1014156094/vue-audio-player/issues/21">#21</a>

## 最后
使用过程中发现任何问题都可以提 `Issue`，也非常欢迎提 `PR`