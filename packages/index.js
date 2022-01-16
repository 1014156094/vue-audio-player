import "./fonts";
import AudioPlayer from "./audio-player/index.vue";

AudioPlayer.install = (Vue) => {
  Vue.component(AudioPlayer.name, AudioPlayer);
};

export default AudioPlayer;
