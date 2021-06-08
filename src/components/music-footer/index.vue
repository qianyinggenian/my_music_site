<template>
  <div class="music">
    <audio ref="audio" class="dn"
     :src="url" :preload="audio.preload"
     @play="onPlay"
     @error="onError"
     @waiting="onWaiting"
     @pause="onPause"
     @timeupdate="onTimeupdate"
     @loadedmetadata="onLoadedmetadata"
    ></audio>
  </div>
</template>

<script>
  import vueAudio from '../vueAudio';
  export default {
    name: "index",
    components: {
      // vueAudio
    },
    data () {
      return {
        url: './music/1.mp3',
      };
    },
    mounted() {
      console.log('audio', this.$refs.audio.$el);
    }
  }
</script>

<style lang="less" scoped>
.music {
  height: 30px;
  width: 30px;
  background-color: #ec4141;
}
</style>
