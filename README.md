<h3 align="center" style="margin: 30px 0 35px;">Vue Audio Player Component</h3>

<p align="center">
    <img src="https://img.shields.io/npm/v/@liripeng/vue-audio-player.svg" />
    <img src="https://img.shields.io/bundlephobia/min/@liripeng/vue-audio-player" />
    <img src="https://img.shields.io/github/stars/1014156094/vue-audio-player" />
    <img src="https://img.shields.io/github/forks/1014156094/vue-audio-player" />
    <img src="https://img.shields.io/github/license/1014156094/vue-audio-player" />
</p>

---

## [中文文档](./README-cn.md) | **English Document**

## <a href="https://codesandbox.io/s/liripengvue-audio-player-issue-moban-cb57s?file=/src/App.vue&resolutionWidth=320&resolutionHeight=675">Online Demo</a>

## Features
- `Vue2` and `Vue3` are supported
- Simple and practical
- High versatility
- Support for progress bar dragging
- Supports PC and mobile terminals
- Complete documentation and examples

## Use
### Step one：
```
npm i -S @liripeng/vue-audio-player
```

### Step two：
```
// global import
import AudioPlayer from '@liripeng/vue-audio-player'

Vue.use(AudioPlayer)
```
or
```
// part import
import AudioPlayer from '@liripeng/vue-audio-player'

components: {
  AudioPlayer
}
```

### Step three：
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
          name: 'audio1',
          url: 'https://www.0dutv.com/upload/dance/F25F74A0B8FF82503241801D0E2CA5CD.mp3'
        },
        {
          name: 'audio2',
          url: 'https://www.0dutv.com/upload/dance/20200316/C719452E3C7834080007662021EA968E.mp3'
        }
      ]
    }
  },

  methods: {
    // Something to do before playing
    handleBeforePlay(next) {
      // There are a few things you can do here...
      this.currentAudioName = this.audioList[this.$refs.audioPlayer.currentPlayIndex].name

      next() // Start playing
    }
  }
}
</script>
```

## Prop
| Prop | Explain | Type | Default |
| - | - | - | - |
| audio-list | Audio playlist | `Array` | - |
| playback-rates | Playrate setting list | `Array<Number>` | `[0.5, 1, 1.5, 2]` |
| show-play-button | Whether to display the play button | `Boolean` | `true` |
| show-prev-button | Whether to display the previous button | `Boolean` | `true` |
| show-next-button | Whether to display the next button | `Boolean` | `true` |
| show-volume-button | Whether to display the volume button | `Boolean` | `true` |
| show-progress-bar | Whether to display a progress bar | `Boolean` | `true` |
| show-playback-rate | Whether to display the play rate button | `Boolean` | `true` |
| isLoop | Whether the list plays in a loop | `Boolean` | `true` |
| disabled-progress-drag | Disable progress bar drag functionality | `Boolean` | `false` |
| disabled-progress-click | Disable progress bar clickable functionality | `Boolean` | `false` |
| progress-interval | Progress update interval | `Number` | `1000` |
| theme-color | Theme color | `String` | `#e35924` |
| before-play | The callback function before the play starts<br>The play starts after `next()` is called | `(next)=>void` | - |
| before-prev | Play the previous callback function<br>After calling `next()`, the previous song starts playing | `(next)=>void` | - |
| before-next | Play the callback function before the next song<br>After calling `next()`, the next song starts playing | `(next)=>void` | - |
| The rest is consistent with native `audio` |

## Event
| Event | Explain | Callback |
| - | - | - |
| play | Triggers when the play starts | - |
| pause | Trigger after play pause | - |
| play-prev | Triggers after playing the previous song | - |
| play-next | Triggers after playing the next song | - |
| play-error | Triggered after play error,The parameters are the same as those of the native 'play' method | `data` |
| playing | The play fires every `progressInterval` second | - |
| timeupdate | Triggered when the current play position is sent to change | `event` |
| loadedmetadata | The run script is triggered when the duration of the media element and other media have loaded data | `event` |
| ended | Trigger after audio playback | `event` |
| progress-start | Trigger before moving the progress bar | `event` |
| progress-move | Triggered when moving the progress bar | `event` |
| progress-end | Triggered after moving the progress bar | `event` |
| progress-click | Click the progress bar to trigger | `event` |

## Slot
| Name | Explain |
| - | - |
| play-prev | Play prev button,The replaceable button icon function remains unchanged |
| play-start | Play start button,The replaceable button icon function remains unchanged |
| play-pause | Play pause button,The replaceable button icon function remains unchanged |
| play-next | Play next button,The replaceable button icon function remains unchanged |

## Data
| Variable | Explain | Default |
| - | - | - |
| currentPlayIndex | The audio index currently playing | `0` |
| isPlaying | Whether the audio is playing | `false` |
| duration | Audio duration | `''` |
| currentTime | Current playback time of audio | `''` |
| playbackRate | Current playback rate of audio | `1` |

Call with `ref`，see the components for more [data](https://github.com/1014156094/vue-audio-player/blob/master/packages/audio-player/index.vue)

## Method
| Method | Explain | Callback |
| - | - | - |
| play | Start | - |
| pause | Pause | - |
| playPrev | Previous | - |
| playNext | Next | - |

Call with `ref`，see the components for more [methods](https://github.com/1014156094/vue-audio-player/blob/master/packages/audio-player/index.vue)

## Update log

### v1.5.0【2022/03/20】
- Feature：`Vue2` and `Vue3` work fine
- Feature：Don't need import `CSS` file
### v1.4.0【2022/03/05】
- Feature：Slot `play-prev`、`play-start`、`play-pause` and `play-next`
- Feature：`play-error` event
- Improvement：Appearance and layout
### v1.3.0【2022/01/25】
- Improvement：Reduced package volume
- Modify：Style import changed to `import '@liripeng/vue-audio-player/lib/style.css'`
### v1.2.11【2021/06/17】
- Feature：`disabled-progress-drag` prop
- Feature：`disabled-progress-click` prop
- Feature：`progress-start` event
- Feature：`progress-move` event
- Feature：`progress-end` event
- Feature：`progress-click` event

## FAQ

- <a href="https://github.com/1014156094/vue-audio-player/issues/21">Background playback control is not supported?</a>
- <a href="https://github.com/1014156094/vue-audio-player/issues/46">The browser of some mobile phones is 0 after loading due to asynchronous problems</a>
- Realize custom play position or continue to play?

  Example:
  ```js
  this.$refs.audioPlayer.$refs.audio.currentTime = 100 // Jump to 100 seconds
  ```

## Browser compatibility

- Internet Explorer：not support
- Firefox：`53` and above
- Chrome：`51` and above

## License
`MIT`

## Last
😘If you think it's helpful, click a 'Star',Any problem found in the process of use can be raised `Issue`, also very welcome to mention `PR`.
