<template>
  <div class="container">
    <div class="left">
      <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
    </div>
    <div class="middle">
      <div class="btn">
        <i class="icon iconfont icon-bofangduilie" v-if="direct" @click="directFn"></i>
        <i class="icon iconfont icon-suijibofang" v-if="random" @click="randomFn"></i>
        <i class="icon iconfont icon-danquxunhuan" v-if="cycle" @click="cycleFn"></i>
        <i class="icon iconfont icon-shangyishou1"></i>
        <i class="el-icon-video-pause" v-if="pause" @click="pauseFn"></i>
        <i class="el-icon-video-play" v-if="play" @click="playFn"></i>
        <i class="icon iconfont icon-xiayishou"></i>
      </div>
      <div class="progress">
        <el-slider v-model="percentage"></el-slider>
      </div>
      <audio
          :src="songSrc"
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
        play: true,
        pause: false,
        cycle: false,
        random: false,
        direct: true,
        percentage: 0, // 进度
        currentTime: 0,// 播放的当前位置
        duration: 0, // 时长
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
        songList: [],
        songs: [] // 歌曲详细信息
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
      cycleFn () {

        // cycle: false,
        this.random = false;
        // random: false,
        //   direct: true,
      },
      getInfo () {
        let data = JSON.parse(this.$route.query.res);
        const result = Object.assign({}, data);
        // 活动类型
        if (result.targetType === 3000) {
          window.open(`${result.url}`,'_blank');
        }
        this.getSongUrlFn(result.encodeId);
        this.getSongDetailFn(result.encodeId);
      },
      // 获取歌曲Url
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
      // 获取歌曲详细信息
      async getSongDetailFn (id) {
        const { data } = await this.$axios.get('/song/detail', {
          params: {
            ids: id
          }
        });
        if (data.code === 200) {
          this.songs = data.songs[0];
          this.squareUrl = this.songs.al.picUrl;
        }
      },
      playFn () {
        this.$refs.audio.play();
        this.play = false;
        this.pause = true;
        console.log('duration',this.$refs.audio.duration);
        this.duration = this.$refs.audio.duration;
        const interval = setInterval(() => {
          this.currentTime = this.$refs.audio.currentTime;
         // this.percentage =  this.$refs.audio.currentTime;
         //  console.log('currentTime', this.$refs.audio.currentTime);
          this.percentage = this.currentTime / this.duration * 100;
          // console.log('percentage', this.percentage);
          if (this.percentage === 100) {
            clearInterval(interval);
            // alert('终止')
          }
        }, 1000)
      },

      pauseFn () {
        this.$refs.audio.pause();
        this.play = true;
        this.pause = false;
      },
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
    width: 200px;
  }
  .middle {
    width: calc(100% - 450px);
    text-align: center;
    .btn {
      i {
        padding: 5px 10px 0;
        color: black;
        font-size: 24px;
      }
    }
    .progress {
      text-align: center;
      .el-slider {
        width: 350px;
        display: inline-block;
        /deep/ .el-slider__runway {
          margin: 0!important;
          .el-slider__button-wrapper {
            display: none;
          }
        }
      }
    }
  }
  .right {
    width: 250px;
    height: 20px;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #ec4141;
  }
}
</style>
