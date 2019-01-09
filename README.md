# Vue音频播放器组件

## 线上演示
![image](https://github.com/1014156094/vue-audio-player/blob/master/public/qrcode.png?raw=true)


## 特性
- 经过童星汇APP线上业务检验的组件
- 完善的文档和示例
- 支持进度条拖拽（PC 端需引入一个库模拟 Touch 事件，库链接：https://github.com/hammerjs/touchemulator）

## 安装
```
npm i -S @liripeng/vue-audio-player
```

## 注意事项
组件CSS使用 `less` 预编译语言

## 使用
```
<template>
  <div>
    <AudioPlayer :audio-list="audioList" />
  </div>
</template>

<script>
import AudioPlayer from '@/components/audio-player'

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
  }
}
</script>
```

## Props
| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| audio-list | 音频播放列表 | `Array` | - |
| before-play | 播放前的回调函数<br>调用 done() 后开始播放 | `(done)=>void` | - |
| before-prev | 上一首前的回调函数<br>调用 done() 后开始播放上一首 | `(done)=>void` | - |
| before-next | 下一首前的回调函数<br>调用 done() 后开始播放下一首 | `(done)=>void` | - |
| isLoop | 是否列表循环播放 | `Boolean` | `true` |

## Event
| 事件 | 说明 | 回调 |
| - | - | - |
| ended | 音频播放结束后触发 | - |

## Data
| 变量 | 说明 | 默认值 |
| - | - | - |
| currentPlayIndex | 当前播放的音频索引 | `0` |
| isPlaying | 音频是否正在播放 | `false` |
| duration | 音频持续时间 | - |
| currentTime | 音频当前播放时间 | - |

`更多`请自行查看组件的 `data`

## Methods
| 方法 | 说明 | 回调 |
| - | - | - |
| play | 开始播放 | - |
| pause | 暂停播放 | - |
| playPrev | 播放上一首 | - |
| playNext | 播放下一首 | - |

`更多`请自行查看组件的 `methods`

##使用过程中发现任何问题都可以提 Issue or PR

## LICENSE
`MIT`
