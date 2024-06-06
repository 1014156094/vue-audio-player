<h3 align="center" style="margin: 30px 0 35px;">Vue Audio Player Component</h3>

<p align="center">
    <img src="https://img.shields.io/npm/v/@liripeng/vue-audio-player.svg" />
    <img src="https://img.shields.io/bundlephobia/min/@liripeng/vue-audio-player" />
    <img src="https://img.shields.io/github/stars/1014156094/vue-audio-player" />
    <img src="https://img.shields.io/github/forks/1014156094/vue-audio-player" />
    <img src="https://img.shields.io/github/license/1014156094/vue-audio-player" />
</p>

---

## [中文文档](./README_CN.md) | **English Document**

## <a href="https://codesandbox.io/p/sandbox/immutable-browser-cb57s?file=%2Fsrc%2FApp.vue%3A4%2C51&resolutionHeight=675&resolutionWidth=320">Online Demo</a>

<img src="https://github.com/1014156094/vue-audio-player/blob/master/example.jpg?raw=true" width="300">

## Features

- `Vue2` and `Vue3` are supported
- Simple and practical
- High versatility
- Support for progress bar dragging
- Support PC and mobile
- Support Nuxt SSR
- Complete documentation and examples

## Use

### Step one：

```
npm i -S @liripeng/vue-audio-player
```

### Step two：

```
// global import
import VueAudioPlayer from '@liripeng/vue-audio-player'

Vue.use(VueAudioPlayer)
```

or

```
// part import
import VueAudioPlayer from '@liripeng/vue-audio-player'

components: {
  VueAudioPlayer
}
```

### Step three：

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

## Prop

| Prop                                       | Description                                                                                             | Type            | Default            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------- | --------------- | ------------------ |
| audio-list                                 | Audio playlist                                                                                          | `Array<Object>` | -                  |
| playback-rates                             | Playrate setting list                                                                                   | `Array<Number>` | `[0.5, 1, 1.5, 2]` |
| show-play-button                           | Whether to display the play button                                                                      | `Boolean`       | `true`             |
| show-prev-button                           | Whether to display the previous button                                                                  | `Boolean`       | `true`             |
| show-next-button                           | Whether to display the next button                                                                      | `Boolean`       | `true`             |
| show-volume-button                         | Whether to display the volume button                                                                    | `Boolean`       | `true`             |
| show-progress-bar                          | Whether to display a progress bar                                                                       | `Boolean`       | `true`             |
| show-playback-rate                         | Whether to display the play rate button                                                                 | `Boolean`       | `true`             |
| show-play-loading                          | Whether to display loading on playback                                                                  | `Boolean`       | `true`             |
| isLoop                                     | Whether the list plays in a loop                                                                        | `Boolean`       | `true`             |
| disabled-progress-drag                     | Disable progress bar drag functionality                                                                 | `Boolean`       | `false`            |
| disabled-progress-click                    | Disable progress bar clickable functionality                                                            | `Boolean`       | `false`            |
| progress-interval                          | Progress update interval                                                                                | `Number`        | `1000`             |
| theme-color                                | Theme color                                                                                             | `String`        | `#e35924`          |
| before-play                                | The callback function before the play starts<br>The play starts after `next()` is called                | `(next)=>void`  | -                  |
| before-prev                                | Play the previous callback function<br>After calling `next()`, the previous song starts playing         | `(next)=>void`  | -                  |
| before-next                                | Play the callback function before the next song<br>After calling `next()`, the next song starts playing | `(next)=>void`  | -                  |
| The rest is consistent with native `audio` |

## Event

| Event                                      | Description                                                                                         | Callback |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------- | -------- |
| play                                       | Triggers when the play starts                                                                       | -        |
| pause                                      | Trigger after play pause                                                                            | -        |
| play-prev                                  | Triggers after playing the previous song                                                            | -        |
| play-next                                  | Triggers after playing the next song                                                                | -        |
| play-error                                 | Triggered after play error,The parameters are the same as those of the native 'play' method         | `data`   |
| playing                                    | The play fires every `progressInterval` second                                                      | -        |
| timeupdate                                 | Triggered when the current play position is sent to change                                          | `event`  |
| loadedmetadata                             | The run script is triggered when the duration of the media element and other media have loaded data | `event`  |
| ended                                      | Trigger after audio playback                                                                        | `event`  |
| progress-start                             | Trigger before moving the progress bar                                                              | `event`  |
| progress-move                              | Triggered when moving the progress bar                                                              | `event`  |
| progress-end                               | Triggered after moving the progress bar                                                             | `event`  |
| progress-click                             | Click the progress bar to trigger                                                                   | `event`  |
| The rest is consistent with native `audio` |

## Slot

| Name       | Description                                                              |
| ---------- | ------------------------------------------------------------------------ |
| play-prev  | Play prev button,The replaceable button icon function remains unchanged  |
| play-start | Play start button,The replaceable button icon function remains unchanged |
| play-pause | Play pause button,The replaceable button icon function remains unchanged |
| play-next  | Play next button,The replaceable button icon function remains unchanged  |

## Data

| Variable         | Description                       | Default |
| ---------------- | --------------------------------- | ------- |
| currentPlayIndex | The audio index currently playing | `0`     |
| isPlaying        | Whether the audio is playing      | `false` |
| duration         | Audio duration                    | `''`    |
| currentTime      | Current playback time of audio    | `''`    |
| playbackRate     | Current playback rate of audio    | `1`     |

Call with `ref`，see the components for more [data](https://github.com/1014156094/vue-audio-player/blob/master/packages/audio-player/index.vue)

## Method

| Method   | Description | Parameters                               |
| -------- | ----------- | ---------------------------------------- |
| play     | Start       | (opts?: { currentTime: number }) => void |
| pause    | Pause       | -                                        |
| playPrev | Previous    | -                                        |
| playNext | Next        | -                                        |

Call with `ref`，see the components for more [methods](https://github.com/1014156094/vue-audio-player/blob/master/packages/audio-player/index.vue)

## [Update Log](./UPDATE_LOG.md)

## FAQ

- <a href="https://github.com/1014156094/vue-audio-player/issues/21">Background playback control is not supported?</a>
- <a href="https://github.com/1014156094/vue-audio-player/issues/46">The browser of some mobile phones is 0 after loading due to asynchronous problems</a>
- <a href="https://github.com/1014156094/vue-audio-player/issues/50">Unable to play automatically?</a>
- Realize custom play position or continue to play?

  Example:

  ```js
  this.$refs.audioPlayer.$refs.audio.currentTime = 100 // Jump to 100 seconds
  ```

## Browser compatibility

- Internet Explorer：not support
- Firefox：`53` and above
- Chrome：`51` and above

## Reward the author with milk tea

<img src="https://github.com/1014156094/vue-audio-player/blob/master/pay.jpg?raw=true" width="200">

## License

`MIT`

## Last

😘If you think it's helpful, click a 'Star',Any problem found in the process of use can be raised `Issue`, also very welcome to mention `PR`.
