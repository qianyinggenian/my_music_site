<template>
  <div class="container">
    <div class="left">
      <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
      <div class="singer">
<!--        <div class="singer-top" :title="`${songName}`">{{songName}}</div>-->
<!--        <div class="singer-bottom">{{singer}}</div>-->
        <div class="singer-top" :title="`${songName}`">{{songName}}</div>
        <div class="singer-bottom">{{singer}}</div>
      </div>
    </div>
    <div class="middle">
      <div class="btn">
        <i class="icon iconfont icon-bofangduilie" title="顺序播放" v-if="direct" @click="directFn"></i>
        <i class="icon iconfont icon-bofangliebiao" title="列表播放" v-if="list" @click="listFn"></i>
        <i class="icon iconfont icon-suijibofang" title="随机播放" v-if="random" @click="randomFn"></i>
        <i class="icon iconfont icon-danquxunhuan" title="单曲循环" v-if="single" @click="singleFn"></i>
        <i class="icon iconfont icon-shangyishou1"></i>
        <i class="el-icon-video-pause" v-if="pause" @click="pauseFn"></i>
        <i class="el-icon-video-play" v-if="play" @click="playFn"></i>
        <i class="icon iconfont icon-xiayishou"></i>
      </div>
      <div class="progress">
        <el-slider v-model="percentage" :show-tooltip="false"></el-slider>
      </div>
      <audio
        :src="songSrc"
        ref="audio"
      >
        您的浏览器不支持 audio 标签。
      </audio>
    </div>
    <div class="right">
      <div>标准</div>
      <div><i class="icon iconfont icon-zhuti"></i></div>
      <div class="sound">
        <i class="icon iconfont icon-laba"></i>
        <el-slider style="width: 100px" v-model="sound" @change="changeVolume"></el-slider>
      </div>
      <div><i class="icon iconfont icon-bofangliebiao" @click="clickDrawer" ></i></div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "index",
    components: {
      // vueAudio
    },
    data () {
      return {
        drawer: true,
        play: true, // 是否显示播放按钮
        pause: false,  // 是否显示暂停按钮
        list: false, // 是否显示列表循环播放按钮
        random: false, // 是否显示随机播放按钮
        single: false, // 是否显示单选循环播放按钮
        direct: true, // 是否显示顺序播放按钮
        percentage: 0, // 进度
        currentTime: 0,// 播放的当前位置
        duration: 0, // 时长
        data: {},
        volume: 0.5,
        sound: 50
      };
    },
    watch: {
      squareUrl: {
        handler (val) {
          console.log(121212);
          this.play = false;
          this.pause = true;
          this.$nextTick(() => {
            this.playFn();
          });
        },
        immediate: true
      }
    },
    computed: {
      ...mapState,
      squareUrl () {
        return this.$store.state.squareUrl;
      },
      songSrc () {
        return this.$store.state.songSrc;
      },
      songName () {
        return this.$store.state.songName;
      },
      singer () {
        return this.$store.state.singer;
      }
    },
    mounted() {
      this.$refs.audio.volume = this.volume;
    },
    methods: {
      // 改变音量
      changeVolume (val) {
        console.log(val/100);
        this.$refs.audio.volume = val/100;
      },
      // 当前播放列表触发
      clickDrawer () {
        this.$store.commit('drawerFn');
      },
      // 点击单曲循环播放按钮触发
      singleFn () {
        this.random = true;
        this.list = false;
        this.direct = false;
        this.single = false;
      },
      // 点击随机播放按钮触发
      randomFn () {
        this.random = false;
        this.list = false;
        this.direct = true;
        this.single = false;
      },
      // 顺序播放按钮触发
      directFn () {
        this.random = false;
        this.list = true;
        this.direct = false;
        this.single = false;
      },
      // 点击列表播放按钮触发
      listFn () {
        this.random = false;
        this.list = false;
        this.direct = false;
        this.single = true;
      },
      // 歌曲播放
      playFn () {
        this.$refs.audio.play();
        this.play = false;
        this.pause = true;
        this.progressFn();
        console.log(321321);
        // this.duration = this.$refs.audio.duration;
        // const interval = setInterval(() => {
        //   this.currentTime = this.$refs.audio.currentTime;
        //   this.percentage = this.currentTime / this.duration * 100;
        //   if (this.percentage === 100) {
        //     clearInterval(interval);
        //   }
        // }, 1000);
      },
      // 歌曲暂停播放
      pauseFn () {
        this.$refs.audio.pause();
        this.play = true;
        this.pause = false;
        this.progressFn();
        // this.duration = this.$refs.audio.duration;
        // const interval = setInterval(() => {
        //   this.currentTime = this.$refs.audio.currentTime;
        //   this.percentage = this.currentTime / this.duration * 100;
        //   if (this.percentage === 100) {
        //     clearInterval(interval);
        //   }
        // }, 1000);
      },
      progressFn () {
        this.duration = this.$refs.audio.duration;
        const interval = setInterval(() => {
          this.currentTime = this.$refs.audio.currentTime;
          this.percentage = this.currentTime / this.duration * 100;
          if (this.percentage === 100) {
            clearInterval(interval);
          }
        }, 1000);
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
    width: 300px;
    display: flex;
    .singer-top {
      width: 200px;
      overflow:hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow:ellipsis;
    }
    .singer-bottom {}
  }
  .middle {
    width: calc(100% - 550px);
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
          &:hover .el-slider__button-wrapper {
            display: block;
          }
        }
      }
    }
  }
  .right {
    width: 250px;
    height: 30px;
    line-height: 30px;
    position: absolute;
    right: 0;
    bottom: 10px;
    display: flex;
    div {
      color: black;
      padding: 0 10px;
    }
    .sound {
      display: flex;
      width: 100px;
      line-height: 30px;
      i {
        padding-right: 10px;
      }
      /deep/ .el-slider__button {
        width: 10px;
        height: 10px;
        border: 2px solid #409EFF;
        background-color: #FFF;
        border-radius: 50%;
        transition: .2s;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
     /deep/ .el-slider__runway {
        width: 100%;
        height: 6px;
        margin: 10px 0;
        background-color: #E4E7ED;
        border-radius: 3px;
        position: relative;
        cursor: pointer;
        vertical-align: middle;
      }
    }
  }
}
</style>
