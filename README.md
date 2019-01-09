# Vue音频播放器组件

## 概述
因为之前项目做过，为了方便以后使用，所以抽空弄成了组件。

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

## 特性
- 经过童星汇APP线上业务检验的组件
- 支持进度条拖拽（PC 端需引入这个库模拟 Touch 事件，链接：https://github.com/hammerjs/touchemulator）

## 线上演示
![image](https://github.com/1014156094/vue-audio-player/blob/master/public/qrcode.png)


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

## 作者
`小七`
