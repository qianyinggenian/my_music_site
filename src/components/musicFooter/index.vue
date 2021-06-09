<template>
  <div class="container">
    <div class="left">
      <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
    </div>
    <div class="middle">
      <div>
        <i class="el-icon-video-pause" @click="pauseFn"></i>
        <i class="el-icon-video-play" @click="playFn"></i>
      </div>
      <audio
          :src="songSrc"
          controls="controls"
          ref="audio"
      >
        您的浏览器不支持 audio 标签。
      </audio>
    </div>
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
        squareUrl: '', // 歌曲图片来源
        songSrc: '', // 歌曲来源
        audio: {
          currentTime: 0,
          maxTime: 0,
          playing: false,  //是否自动播放
          muted: false,   //是否静音
          speed: 1,
          waiting: true,
          preload: 'auto'
        },
        data: {},
        songList: []
      };
    },
    watch: {
      '$route.query.res': {
        handler () {
         this.getInfo();
        }
      }
    },
    mounted() {
      // this.fn();
    },
    methods: {
      getInfo () {
        let data = JSON.parse(this.$route.query.res);
        const result = Object.assign({}, data);
        console.log('result', result);
        this.squareUrl = result.imageUrl;
        console.log(typeof result.targetType);
        // 活动类型
        if (result.targetType === 3000) {
          window.open(`${result.url}`,'_blank');
        }
        this.getSongUrlFn(result.encodeId);
      },
      async getSongUrlFn (id) {
        const { data } = await this.$axios.get('/song/url', {
          params: {
            id: id
          }
        });
        if (data.code === 200) {
          this.songList = data.data;
          this.songSrc = this.songList[0].url;
        }
        console.log('audio', this.$refs.audio.$el);
      },
      play () {},
      onPause () {},
      playFn () {
        this.$refs.audio.play();
      },
      pauseFn () {
        this.$refs.audio.pause();
      }
    },
  }
</script>

<style lang="less" scoped>
.container {
  position: relative;
  display: flex;
  .left {
    /*margin-top: 10px;*/
    position: relative;
    bottom: -10px;
    width: 150px;
  }
  .middle {
    text-align: center;
  }
  .right {
    width: 200px;
    height: 20px;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #ec4141;
  }
}
</style>
