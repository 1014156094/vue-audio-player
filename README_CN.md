<h3 align="center" style="margin: 30px 0 35px;">Vue 音频播放器组件</h3>

<p align="center">
    <img src="https://img.shields.io/npm/v/@liripeng/vue-audio-player.svg" />
    <img src="https://img.shields.io/bundlephobia/min/@liripeng/vue-audio-player" />
    <img src="https://img.shields.io/github/stars/1014156094/vue-audio-player" />
    <img src="https://img.shields.io/github/forks/1014156094/vue-audio-player" />
    <img src="https://img.shields.io/github/license/1014156094/vue-audio-player" />
</p>

---

## **中文文档** | [English Document](./README.md)

## <a href="https://codesandbox.io/p/sandbox/immutable-browser-cb57s?file=%2Fsrc%2FApp.vue%3A4%2C51&resolutionHeight=675&resolutionWidth=320">在线预览 Demo</a>

<img src="https://github.com/1014156094/vue-audio-player/blob/master/example.jpg?raw=true" width="300">

## 特性

- 支持 `Vue2` 和 `Vue3`
- 简单实用
- 通用性高
- 支持进度条拖拽
- 支持 `PC` 端和移动端
- 支持 `Nuxt SSR`
- 完善的文档和示例

## 使用

### 第一步：

```
npm i -S @liripeng/vue-audio-player
```

### 第二步：

```
// 全局引入
import VueAudioPlayer from '@liripeng/vue-audio-player'

Vue.use(VueAudioPlayer)
```

或者

```
// 局部引入
import VueAudioPlayer from '@liripeng/vue-audio-player'

components: {
  VueAudioPlayer
}
```

### 第三步：

```
<template>
  <div>
    <div class="name">
      {{ currentAudioName || audioList[0].title }}
    </div>
    <audio-player
      ref="audioPlayer"
      :audio-list="audioList"
      :before-play="handleBeforePlay"
      :show-play-loading="false"
    >
    </audio-player>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentAudioName: '',
      audioList: [
        {
          src: 'http://music.163.com/song/media/outer/url?id=317151.mp3', // Required
          title: 'Audio Title 1', // Optional，Phone lock screen music player display
          artist: 'Artist Name 1', // Optional，Phone lock screen music player display
          album: 'Album Name 1', // Optional，Phone lock screen music player display
          artwork: [
            {
              src: 'https://upload.jianshu.io/users/upload_avatars/1696356/c358e43854eb?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp',
              sizes: '512x512',
              type: 'image/jpg',
            },
          ], // Optional，Phone lock screen music player display
        },
        {
          src: 'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3', // Required
          title: 'Audio Title 2', // Optional，Phone lock screen music player display
        },
      ],
    }
  },

  methods: {
    // Use this function if you want to do something before you start playing
    handleBeforePlay(next) {
      this.currentAudioName =
        this.audioList[this.$refs.audioPlayer.currentPlayIndex].title

      next() // Start play
    },
  },
}
</script>
```

## 属性

| 参数                      | 说明                                                   | 类型            | 默认值             |
| ------------------------- | ------------------------------------------------------ | --------------- | ------------------ |
| audio-list                | 音频播放列表                                           | `Array<Object>` | -                  |
| playback-rates            | 播放速率设定列表                                       | `Array<Number>` | `[0.5, 1, 1.5, 2]` |
| show-play-button          | 是否显示播放按钮                                       | `Boolean`       | `true`             |
| show-prev-button          | 是否显示上一首按钮                                     | `Boolean`       | `true`             |
| show-next-button          | 是否显示下一首按钮                                     | `Boolean`       | `true`             |
| show-volume-button        | 是否显示音量按钮                                       | `Boolean`       | `true`             |
| show-progress-bar         | 是否显示进度条                                         | `Boolean`       | `true`             |
| show-playback-rate        | 是否显示播放速率按钮                                   | `Boolean`       | `true`             |
| show-play-loading         | 是否显示播放时的 loading                               | `Boolean`       | `true`             |
| isLoop                    | 是否列表循环播放                                       | `Boolean`       | `true`             |
| disabled-progress-drag    | 是否禁用进度条可拖拽功能                               | `Boolean`       | `false`            |
| disabled-progress-click   | 是否禁用进度条可点击功能                               | `Boolean`       | `false`            |
| progress-interval         | 进度更新间隔                                           | `Number`        | `1000`             |
| theme-color               | 主题色                                                 | `String`        | `#e35924`          |
| before-play               | 播放开始前的回调函数<br>调用 next() 后开始播放         | `(next)=>void`  | -                  |
| before-prev               | 播放上一首前的回调函数<br>调用 next() 后开始播放上一首 | `(next)=>void`  | -                  |
| before-next               | 播放下一首前的回调函数<br>调用 next() 后开始播放下一首 | `(next)=>void`  | -                  |
| 其他的与原生 `audio` 一致 |

## 事件

| 事件                      | 说明                                                     | 回调参数 |
| ------------------------- | -------------------------------------------------------- | -------- |
| play                      | 播放开始后触发                                           | -        |
| pause                     | 播放暂停后触发                                           | -        |
| play-prev                 | 播放上一首后触发                                         | -        |
| play-next                 | 播放下一首后触发                                         | -        |
| play-error                | 播放出错后触发，回调参数为原生 `play` 方法的一致         | `data`   |
| playing                   | 播放中每 `progressInterval` 秒触发                       | -        |
| timeupdate                | 当前的播放位置发送改变时触发                             | `event`  |
| loadedmetadata            | 当媒介元素的持续时间以及其它媒介已加载数据时运行脚本触发 | `event`  |
| ended                     | 音频播放结束后触发                                       | `event`  |
| progress-start            | 移动进度条前触发                                         | `event`  |
| progress-move             | 移动进度条时触发                                         | `event`  |
| progress-end              | 移动进度条后触发                                         | `event`  |
| progress-click            | 点击进度条后触发                                         | `event`  |
| 其他的与原生 `audio` 一致 |

## 插槽

| 名称       | 说明                                   |
| ---------- | -------------------------------------- |
| play-prev  | 播放上一首按钮，可替换按钮图标功能不变 |
| play-start | 播放开始按钮，可替换按钮图标功能不变   |
| play-pause | 播放暂停按钮，可替换按钮图标功能不变   |
| play-next  | 播放下一首按钮，可替换按钮图标功能不变 |

## 变量

| 变量             | 说明               | 默认值  |
| ---------------- | ------------------ | ------- |
| currentPlayIndex | 当前播放的音频索引 | `0`     |
| isPlaying        | 音频是否正在播放   | `false` |
| duration         | 音频持续时间       | `''`    |
| currentTime      | 音频当前播放时间   | `''`    |
| playbackRate     | 音频当前播放速率   | `1`     |

使用 `ref` 调用， 更多请自行查看组件 [data](https://github.com/1014156094/vue-audio-player/blob/master/packages/audio-player/index.vue)

## 方法

| 方法     | 说明       | 参数                                     |
| -------- | ---------- | ---------------------------------------- |
| play     | 开始播放   | (opts?: { currentTime: number }) => void |
| pause    | 暂停播放   | -                                        |
| playPrev | 播放上一首 | -                                        |
| playNext | 播放下一首 | -                                        |

使用 `ref` 调用， 更多请自行查看组件 [methods](https://github.com/1014156094/vue-audio-player/blob/master/packages/audio-player/index.vue)

## [更新日志](./UPDATE_LOG_CN.md)

## 常见疑问解答

- <a href="https://github.com/1014156094/vue-audio-player/issues/21">不支持后台播放控制？</a>
- <a href="https://github.com/1014156094/vue-audio-player/issues/46">部分手机的自带浏览器因为异步的问题导致加载完成后时长为 0</a>
- <a href="https://github.com/1014156094/vue-audio-player/issues/50">无法自动播放？</a>
- 怎么实现自定义播放位置或续播？

  例如：

  ```js
  this.$refs.audioPlayer.$refs.audio.currentTime = 100 // 跳到 100 秒
  ```

## 浏览器兼容性

- Internet Explorer：不支持
- Firefox：`53` 及以上
- Chrome：`51` 及以上

## 奖励作者喝奶茶

<img src="https://github.com/1014156094/vue-audio-player/blob/master/pay.jpg?raw=true" width="200">

## 许可证

`MIT`

## 最后

😘觉得有帮助点个 `Star` 吧，使用过程中发现任何问题都可以提 `Issue`，也非常欢迎提 `PR`
