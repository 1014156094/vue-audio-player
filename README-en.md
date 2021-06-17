<h3 align="center" style="margin: 30px 0 35px;">Vue Audio Player Component</h3>

<p align="center">
    <img src="https://img.shields.io/npm/v/@liripeng/vue-audio-player.svg" />
    <img src="https://img.shields.io/bundlephobia/min/@liripeng/vue-audio-player" />
    <img src="https://img.shields.io/github/stars/1014156094/vue-audio-player" />
    <img src="https://img.shields.io/github/forks/1014156094/vue-audio-player" />
    <img src="https://img.shields.io/github/license/1014156094/vue-audio-player" />
</p>

---

## [中文](./README.md) | **English**

## <a href="https://codesandbox.io/s/liripengvue-audio-player-issue-moban-cb57s?file=/src/App.vue&resolutionWidth=320&resolutionHeight=675">Demo</a>

## Features
- Simple and practical
- Support for progress bar dragging
- Supports PC and mobile terminals
- Complete documentation and examples
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
| playing | The play fires every `progressInterval` second | - |
| timeupdate | Triggered when the current play position is sent to change | `event` |
| loadedmetadata | The run script is triggered when the duration of the media element and other media have loaded data | `event` |
| ended | Trigger after audio playback | `event` |
| progress-start | Trigger before moving the progress bar | `event` |
| progress-move | Triggered when moving the progress bar | `event` |
| progress-end | Triggered after moving the progress bar | `event` |
| progress-click | Click the progress bar to trigger | `event` |

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

### v1.2.11【2021/06/17】
- Feature：disabled-progress-drag prop
- Feature：disabled-progress-click prop
- Feature：progress-start event
- Feature：progress-move event
- Feature：progress-end event
- Feature：progress-click event
### v1.2.10【2021/05/13】
- Modify：Pause and drag the progress bar to play directly
### v1.2.9【2021/04/26】
- Fix：<a href="https://github.com/1014156094/vue-audio-player/issues/32">iOS progress bar compatibility</a>
### v1.2.8【2021/02/26】
- Feature：Button `hover` effect
### v1.2.7【2021/01/29】
- Fix：<a href="https://github.com/1014156094/vue-audio-player/issues/28">show-playback-rate="false" inoperative</a>
### v1.2.6【2021/01/27】
- Feature：Theme color attribute `theme-color`
- Improvement：<a href="https://github.com/1014156094/vue-audio-player/issues/27">The question of whether initialization of drag-and-drop point positions is necessary</a>

## License
`MIT`

## FAQ

- <a href="https://github.com/1014156094/vue-audio-player/issues/21">Background playback control is not supported?</a>

## Browser compatibility

- Internet Explorer：not support
- Firefox：`53` and above
- Chrome：`51` and above

## Last
Any problem found in the process of use can be raised `Issue`, also very welcome to mention `PR`.