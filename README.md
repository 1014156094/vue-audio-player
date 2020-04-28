<h3 align="center" style="margin: 30px 0 35px;">Vue音频播放器组件</h3>

<p align="center">
    <img src="https://img.shields.io/npm/v/@liripeng/vue-audio-player.svg" alt="npm version" />
    <img src="https://img.shields.io/bundlephobia/minzip/vue-audio-player.svg" alt="Build Status" />
</p>

---

## 线上演示
![image](https://github.com/1014156094/vue-audio-player/blob/master/public/qrcode.png?raw=true)


## 特性
- 经过童星汇 APP 线上业务检验的组件
- 完善的文档和示例
- 支持进度条拖拽（PC 端需引入一个库模拟 Touch 事件，库链接：https://github.com/hammerjs/touchemulator）
- 原生 CSS，支持 Less、Scss 等预编译语言

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
    <AudioPlayer :audio-list="audioList"
                 :before-play="onBeforePlay" />
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
      audioList: [
        'http://txh-cdn.96qbhy.com/20180817175211dtC1vE3z.mp3',
        'http://txh-cdn.96qbhy.com/20181106105737sOcozMqw.mp3'
      ]
    }
  },
  methods: {
    // 播放前做的事
    onBeforePlay(next) {
        console.log('这里可以做一些事情...')
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
| show-progress-bar | 是否显示进度条 | `Boolean` | `true` |
| isLoop | 是否列表循环播放 | `Boolean` | `true` |
| progressInterval | 进度更新间隔 | `Number` | `1000` |
| before-play | 点击播放前的回调函数<br>调用 next() 后开始播放 | `(next)=>void` | - |
| before-prev | 点击上一首前的回调函数<br>调用 next() 后开始播放上一首 | `(next)=>void` | - |
| before-next | 点击下一首前的回调函数<br>调用 next() 后开始播放下一首 | `(next)=>void` | - |

## Event
| 事件 | 说明 | 回调 |
| - | - | - |
| play | 点击播放后触发 | - |
| pause | 点击暂停后触发 | - |
| play-prev | 点击上一首后触发 | - |
| play-next | 点击下一首后触发 | - |
| playing | 播放中每 `progressInterval` 秒触发 | - |
| timeupdate | 当前的播放位置发送改变时触发 | `event` |
| loadedmetadata | 当媒介元素的持续时间以及其它媒介已加载数据时运行脚本触发 | `event` |
| ended | 音频播放结束后触发 | `event` |

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
| 版本 | 说明 | 更新时间 |
| - | - | - |
| v1.0.6 | 1. 不自带 babel-polyfill<br> | 2020-04-28 |
| v1.0.5 | 1. 修复 <a href="https://github.com/1014156094/vue-audio-player/issues/5">#5</a><br> | 2019-11-21 |
| v1.0.4 | 1. 修复 isLoop 无效<br>2. 修改类名<br>3. 支持原生 CSS | 2019-10-16 |

## 许可证
`MIT`

## 最后
使用过程中发现任何问题都可以提 `Issue`，也非常欢迎提 `PR`