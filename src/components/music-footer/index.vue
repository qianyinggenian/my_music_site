<template>
  <div class="container">
    <div class="left">
      <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
    </div>
    <div class="center"></div>
    <div class="right"></div>
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
        squareUrl: '',
        audio: {
          currentTime: 0,
          maxTime: 0,
          playing: false,  //是否自动播放
          muted: false,   //是否静音
          speed: 1,
          waiting: true,
          preload: 'auto'
        },
      };
    },
    mounted() {
      // console.log('audio', this.$refs.audio.$el);
    }
  }
</script>

<style lang="less" scoped>
.container {
  .left {
    /*margin-top: 10px;*/
    position: relative;
    bottom: -10px;
  }
}
</style>
