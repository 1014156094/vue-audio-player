# Vue音频播放器组件

## 线上演示
![image](https://github.com/1014156094/vue-audio-player/blob/master/public/qrcode.png)


## 特性
- 经过童星汇APP线上业务检验的组件
- 完善的文档和示例
- 支持进度条拖拽（PC 端需引入这个库模拟 Touch 事件，链接：https://github.com/hammerjs/touchemulator）

## 安装项目
```
npm install
```

### 开始开发
```
npm run serve
```

### 生产打包
```
npm run build
```

## 注意事项
组件CSS使用 `less` 预编译语言

## 快速开始
```
<template>
  <div>
    <AudiPlayer :audio-list="audioList" />
  </div>
</template>

<script>
import AudiPlayer from '@/components/audio-player'

export default {
  components: {
    AudiPlayer
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

## 组件data
| 方法 | 说明 | 回调 |
| - | - | - |
| currentPlayIndex | 当前播放的音频索引 | `0` |
| isPlaying | 音频是否正在播放 | `false` |
| duration | 音频持续时间 | - |
| currentTime | 音频当前播放时间 | - |

`更多`请自行使用 `ref` 打印组件的 `data` 查看

## 组件methods
| 方法 | 说明 | 回调 |
| - | - | - |
| play | 开始播放 | - |
| pause | 暂停播放 | - |
| playPrev | 播放上一首 | - |
| playNext | 播放下一首 | - |

`更多`请自行使用 `ref` 打印组件的 `methods` 查看

## 作者
`小七`
