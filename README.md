<h3 align="center" style="margin: 30px 0 35px;">Vue 音频播放器组件</h3>

<p align="center">
    <img src="https://img.shields.io/npm/v/@liripeng/vue-audio-player.svg" />
    <img src="https://img.shields.io/bundlephobia/min/@liripeng/vue-audio-player" />
    <img src="https://img.shields.io/github/stars/1014156094/vue-audio-player" />
    <img src="https://img.shields.io/github/forks/1014156094/vue-audio-player" />
    <img src="https://img.shields.io/github/license/1014156094/vue-audio-player" />
</p>

---

## **中文** | [English](./README-en.md)

## <a href="https://codesandbox.io/s/liripengvue-audio-player-issue-moban-cb57s?file=/src/App.vue&resolutionWidth=320&resolutionHeight=675">点我在线预览 Demo</a>

## 特性
- 简单实用
- 支持进度条拖拽
- 支持 `PC` 端和移动端
- 完善的文档和示例
- 原生 `CSS`，无须引入 `Less`、`Scss` 等预编译语言

## 使用
### 第一步：
```
npm i -S @liripeng/vue-audio-player
```

### 第二步：
```
// 全局引入
import AudioPlayer from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'

Vue.use(AudioPlayer)
```
或者
```
// 局部引入
import AudioPlayer from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'

components: {
  AudioPlayer
}
```

### 第三步：
```
<template>
  <div>
    {{ currentAudioName || audioList[0].name }}
    <audio-player
      ref="audioPlayer"
      :audio-list="audioList.map(elm => elm.url)"
      :before-play="handleBeforePlay"
      theme-color="#ff2929"
    />
  </div>
</template>

<script>
export default {
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

## 属性
| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| audio-list | 音频播放列表 | `Array` | - |
| playback-rates | 播放速率设定列表 | `Array<Number>` | `[0.5, 1, 1.5, 2]` |
| show-play-button | 是否显示播放按钮 | `Boolean` | `true` |
| show-prev-button | 是否显示上一首按钮 | `Boolean` | `true` |
| show-next-button | 是否显示下一首按钮 | `Boolean` | `true` |
| show-volume-button | 是否显示音量按钮 | `Boolean` | `true` |
| show-progress-bar | 是否显示进度条 | `Boolean` | `true` |
| show-playback-rate | 是否显示播放速率按钮 | `Boolean` | `true` |
| isLoop | 是否列表循环播放 | `Boolean` | `true` |
| disabled-progress-drag | 是否禁用进度条可拖拽功能 | `Boolean` | `false` |
| disabled-progress-click | 是否禁用进度条可点击功能 | `Boolean` | `false` |
| progress-interval | 进度更新间隔 | `Number` | `1000` |
| theme-color | 主题色 | `String` | `#e35924` |
| before-play | 播放开始前的回调函数<br>调用 next() 后开始播放 | `(next)=>void` | - |
| before-prev | 播放上一首前的回调函数<br>调用 next() 后开始播放上一首 | `(next)=>void` | - |
| before-next | 播放下一首前的回调函数<br>调用 next() 后开始播放下一首 | `(next)=>void` | - |
| 其他的与原生 `audio` 一致 |

## 事件
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
| progress-start | 移动进度条前触发 | `event` |
| progress-move | 移动进度条时触发 | `event` |
| progress-end | 移动进度条后触发 | `event` |
| progress-click | 点击进度条后触发 | `event` |

## 变量
| 变量 | 说明 | 默认值 |
| - | - | - |
| currentPlayIndex | 当前播放的音频索引 | `0` |
| isPlaying | 音频是否正在播放 | `false` |
| duration | 音频持续时间 | `''` |
| currentTime | 音频当前播放时间 | `''` |
| playbackRate | 音频当前播放速率 | `1` |

使用 `ref` 调用， 更多请自行查看组件 [data](https://github.com/1014156094/vue-audio-player/blob/master/packages/audio-player/index.vue)

## 方法
| 方法 | 说明 | 回调 |
| - | - | - |
| play | 开始播放 | - |
| pause | 暂停播放 | - |
| playPrev | 播放上一首 | - |
| playNext | 播放下一首 | - |

使用 `ref` 调用， 更多请自行查看组件 [methods](https://github.com/1014156094/vue-audio-player/blob/master/packages/audio-player/index.vue)

## 更新日志

### v1.2.11【2021/06/17】
- 新增：disabled-progress-drag 属性
- 新增：disabled-progress-click 属性
- 新增：progress-start 事件
- 新增：progress-move 事件
- 新增：progress-end 事件
- 新增：progress-click 事件
### v1.2.10【2021/05/13】
- 修改：暂停状态下拖拽进度条则直接播放
### v1.2.9【2021/04/26】
- 修复：<a href="https://github.com/1014156094/vue-audio-player/issues/32">iOS 进度条兼容性</a>
### v1.2.8【2021/02/26】
- 新增：按钮 `hover` 效果
### v1.2.7【2021/01/29】
- 修复：<a href="https://github.com/1014156094/vue-audio-player/issues/28">show-playback-rate="false" 不生效</a>
### v1.2.6【2021/01/27】
- 新增：主题色属性 `theme-color`
- 优化：<a href="https://github.com/1014156094/vue-audio-player/issues/27">关于可拖拽点位置初始化是否有必要的问题</a>

## 许可证
`MIT`

## FAQ

- <a href="https://github.com/1014156094/vue-audio-player/issues/21">不支持后台播放控制？</a>

## 浏览器兼容性

- Internet Explorer：不支持
- Firefox：`53` 及以上
- Chrome：`51` 及以上

## 最后
使用过程中发现任何问题都可以提 `Issue`，也非常欢迎提 `PR`