<h3 align="center" style="margin: 30px 0 35px;">Vue Audio Player Component</h3>

<p align="center">
    <img src="https://img.shields.io/npm/v/@liripeng/vue-audio-player.svg" alt="npm version" />
    <img src="https://img.shields.io/bundlephobia/minzip/vue-audio-player.svg" alt="Build Status" />
</p>

---

## [中文](./README.md) | **English**

## <a href="https://codesandbox.io/s/liripengvue-audio-player-issue-moban-cb57s?file=/src/App.vue&resolutionWidth=320&resolutionHeight=675">Demo</a>

## Features
- Complete documentation and examples
- Support for progress bar dragging，Compatible with `PC` mobile terminal
- Native `CSS`, no need to introduce `Less`, `Scss` and other precompiled languages

## Use
### Step one：
```
npm i -S @liripeng/vue-audio-player
```

### Step two：
```
// global import
import AudioPlayer from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'

Vue.use(AudioPlayer)
```
or
```
// part import
import AudioPlayer from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'

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
| show-play-button | Whether to display the play button | `Boolean` | `true` |
| show-prev-button | Whether to display the previous button | `Boolean` | `true` |
| show-next-button | Whether to display the next button | `Boolean` | `true` |
| show-volume-button | Whether to display the volume button | `Boolean` | `true` |
| show-progress-bar | Whether to display a progress bar | `Boolean` | `true` |
| show-playback-rate | Whether to display the play rate button | `Boolean` | `true` |
| playback-rates | Playrate setting list | `Array<Number>` | `[0.5, 1, 1.5, 2]` |
| isLoop | Whether the list plays in a loop | `Boolean` | `true` |
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
| playing | The play fires every `progressInterval` second | - |
| timeupdate | Triggered when the current play position is sent to change | `event` |
| loadedmetadata | The run script is triggered when the duration of the media element and other media have loaded data | `event` |
| ended | Trigger after audio playback | `event` |

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

### v1.2.8【2021/02/26】
- Feature：Button `hover` effect
### v1.2.7【2021/01/29】
- Fix：<a href="https://github.com/1014156094/vue-audio-player/issues/28">#28</a>
### v1.2.6【2021/01/27】
- Feature：Theme color attribute `theme-color`
- Improvement：<a href="https://github.com/1014156094/vue-audio-player/issues/27">#27</a>
### v1.2.5【2021/01/26】
- Modify：The `PC` can be dragged without introducing a `hammer-touchemulator`
### v1.2.4【2021/01/21】
- Fix：Play event fires twice
### v1.2.3【2020/12/31】
- Fix：<a href="https://github.com/1014156094/vue-audio-player/issues/25">#25</a>
### v1.2.2【2020/12/30】
- Feature：Playback rate configuration
- Feature：`show-playback-rate` prop
### v1.2.0【2020/12/28】
- Modify：The way packages are introduced locally
### v1.1.1【2020/12/11】
- Fix：Incoming packet error
### v1.1.0【2020/12/11】
- Feature：Volume adjustment function
- Feature：`show-volume-button` prop
- Feature：`is-auto-playNext` prop
- Feature：Failure to play automatically plays the next song，`is-auto-playNext` is `false` The next song will not automatically play
- Feature：Loading `svg` animation，You can override the color with `CSS`
- Modify：`play` event
- Modify：Class Name

### v1.0.8【2020/11/17】

- Fix：<a href="https://github.com/1014156094/vue-audio-player/issues/17">#17</a>

### v1.0.7【2020/10/02】
- Fix：<a href="https://github.com/1014156094/vue-audio-player/issues/12">#12</a>

### v1.0.6【2020/04/28】
- Improvement：remove `babel-polyfill`

## License
`MIT`

## FAQ

- Background playback control is not supported?<a href="https://github.com/1014156094/vue-audio-player/issues/21">#21</a>

## Last
Any problem found in the process of use can be raised `Issue`, also very welcome to mention `PR`.