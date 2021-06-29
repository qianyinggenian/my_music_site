<template>
  <div class="container">
    <div class="left">
      <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
      <div class="singer">
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
        <i class="icon iconfont icon-shangyishou1" @click="prev"></i>
        <i class="el-icon-video-pause" v-if="pause" @click="pauseFn"></i>
        <i class="el-icon-video-play" v-if="play" @click="playFn"></i>
        <i class="icon iconfont icon-xiayishou" @click="next"></i>
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
      <div class="div">标准</div>
      <div class="div"><i class="icon iconfont icon-zhuti"></i></div>
      <div class="sound">
        <i class="icon iconfont icon-laba"></i>
        <el-slider style="width: 100px" v-model="sound" @change="changeVolume"></el-slider>
      </div>
      <div class="div"><i class="icon iconfont icon-bofangliebiao" @click="clickDrawer" ></i></div>
      <div >
       <el-drawer
          class="drawer"
          ref="drawer"
          title="当前播放"
          :modal="false"
          size="25%"
          :visible.sync="$store.state.drawer"
          :with-header="false">
        <div class="currentPlaylist">
          <div class="currentPlaylist-top">
            <div class="title">当前播放</div>
            <div class="top-btn">
              <div class="total">共{{$store.state.playList.length}}首</div>
              <div class="btn">
                <span><i class="el-icon-folder-add"></i> 收藏全部</span>
                <span @click="handleClear">清空列表</span>
              </div>
            </div>
          </div>
          <div class="currentPlaylist-bottom">
            <el-table
                :data="playList"
                :row-class-name="tableRowClassName"
                @cell-dblclick="cellDblclick"
                :height="height"
                style="width: 100%">
              <el-table-column
                  prop="name"
                  label="歌曲"
                  show-overflow-tooltip
                  min-width="50%">
              </el-table-column>
              <el-table-column
                  prop="singer"
                  label="歌手"
                  show-overflow-tooltip
                  min-width="30%">
              </el-table-column>
              <el-table-column
                  prop="duration"
                  label="时长"
                  min-width="20%">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

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
        sound: 50,
        height: 550,
        Id: '',
        tableData: []
      };
    },
    watch: {
      squareUrl: {
        handler (val) {
          console.log(2222222);
          this.play = false;
          this.pause = true;
          this.$nextTick(() =>{
            this.playFn();
          });
        }
      }
    },
    computed: {
      ...mapState,
      // 返回歌曲封面url
      squareUrl () {
        return this.$store.state.squareUrl;
      },
      // 返回歌曲src
      songSrc () {
        return this.$store.state.songSrc;
      },
      // 返回歌曲名称
      songName () {
        return this.$store.state.songName;
      },
      // 返回歌手名称
      singer () {
        return this.$store.state.singer;
      },
      playList () {
        this.tableData = this.$store.state.playList;
        return this.$store.state.playList;
      }
    },
    mounted() {
      // 初始音量
      this.$refs.audio.volume = this.volume;
    },
    methods: {
      // 双击播放
      cellDblclick () {},
      // 表格样式
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'warning-row';
        } else  {
          return '';
        }
      },
      //清空列表
      handleClear () {
        this.$store.commit('clearPlayList');
      },
      // 改变音量
      changeVolume (val) {
        this.$refs.audio.volume = val/100;
      },
      // 当前播放列表触发
      clickDrawer () {
        this.$store.commit('drawerFn');
        setTimeout(() => {
          this.height = this.$refs.drawer.$el.clientHeight - 80;
        },100);
      },
      // 点击单曲循环播放按钮触发，随机播放
      singleFn () {
        this.random = true;
        this.list = false;
        this.direct = false;
        this.single = false;
      },
      // 点击随机播放按钮触发，顺序播放
      randomFn () {
        this.random = false;
        this.list = false;
        this.direct = true;
        this.single = false;
      },
      // 顺序播放按钮触发，列表播放
      directFn () {
        this.random = false;
        this.list = true;
        this.direct = false;
        this.single = false;
      },
      // 点击列表播放按钮触发，单曲循环
      listFn () {
        this.random = false;
        this.list = false;
        this.direct = false;
        this.single = true;
      },
      // 歌曲播放
      playFn () {
        this.$nextTick(() => {
          this.$refs.audio.play();
        });
        this.play = false;
        this.pause = true;
        this.progressFn();
      },
      // 歌曲暂停播放
      pauseFn () {
        this.$nextTick(() => {
          this.$refs.audio.pause();
        });
        this.play = true;
        this.pause = false;
        this.progressFn();
      },
      // 定位当前播放歌曲在列表中的位置
      handleLocate () {
        this.Id = this.$store.state.songId;
        return this.tableData.findIndex(val => val.id === this.Id);
      },
      // 播放上一首
      prev () {
        console.log(this.tableData);
        const index = this.handleLocate();
        if (index !== 0 ) {
          this.$store.commit('handleSwitch', this.tableData[index-1]);
        } else {
          this.$store.commit('handleSwitch', this.tableData[this.tableData.length - 1]);
        }
      },
      // 播放下一首
      next () {
       const index = this.handleLocate();
       if (index+1 < this.tableData.length) {
         this.$store.commit('handleSwitch', this.tableData[index+1]);
       } else {
         this.$store.commit('handleSwitch', this.tableData[0]);
       }
      },
      // 歌曲进度
      progressFn () {
        const interval = setInterval(() => {
          this.duration = this.$refs.audio.duration;
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
    width: 400px;
    display: flex;
    .singer {
      padding: 0 10px;
    }
    .singer-top {
      width: 300px;
      overflow:hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow:ellipsis;
    }
    .singer-bottom {
      color: #cccccc;
      font-size: 14px;
      padding-top: 10px;
    }
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
    .div {
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
  .currentPlaylist {
    .currentPlaylist-top {
      margin-top: 10px;
      border-bottom: 1px solid  #cccccc;
      .title {
        font-weight: bold;
        font-size: 24px;
        padding: 0 10px;
      }
      .top-btn {
        margin-top: 10px;
        display: flex;
        position: relative;
        .total {
          color: #cccccc;
          font-size: 12px;
          padding: 0 10px;
        }
        .btn {
          position: absolute;
          right: 0;
          i {
            font-size: 22px;
          }
          span {
            padding: 0 10px;
            cursor:pointer
          }
          span:nth-child(2) {
            color: #56A2E8;
            /*cursor:pointer*/
          }
        }
      }
    }
    .currentPlaylist-bottom {
      /deep/ .el-table .warning-row {
        background: oldlace;
      }
      /deep/ .el-table .red-row {
        color: #ec4141;
      }
    }
  }
}
/deep/ .drawer {
  padding: 0 !important;
  height: calc(100% - 80px) !important;
}
</style>
