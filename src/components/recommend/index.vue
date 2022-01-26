<template>
  <div class="recommend">
    <div class="container">
      <div class="carousel">
        <carousel
            :type="carouselType"
            :carouselHeight="carouselHeight"
            :imgList="banners"
        >
        </carousel>
      </div>
      <!--    推荐歌单开始-->
      <div @click="songListFn">
        <span class="title">推荐歌单 <i class="el-icon-arrow-right"></i></span>
      </div>
      <div class="list">
        <div class="listOne" v-for="(item,index) in list" :key="index"  @click="playListDetail(item.id)">
          <div class="container" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'contain'}">
            <div class="top">
              <div class="title">{{item.copywriter}}</div>
              <div class="playCount"><i class="el-icon-caret-right "></i>{{item.playCount}}</div>
            </div>
            <div class="playBtn">
              <i class="el-icon-caret-right "></i>
            </div>
          </div>
          <div class="name">{{item.name}}</div>
        </div>
      </div>
      <!--    推荐歌单结束-->
      <!--    独家放送开始-->
      <div><span class="title">独家放送 <i class="el-icon-arrow-right"></i></span></div>
      <div class="sole">
        <div class="soleList"  v-for="(item,index) in soleList" :key="index"  @click="soleListDetail(item.id)">
          <div class="soleListImg" :style="{background: 'url(' + item.sPicUrl +')', backgroundSize:'contain'}">
            <div class="solePlayBtn">
              <i class="el-icon-caret-right "></i>
            </div>
          </div>
          <div class="soleListTitle">{{item.name}}</div>
        </div>
      </div>
      <!--    独家放送结束-->
      <!--    最新音乐开始-->
      <div >
        <span class="title">最新音乐<i class="el-icon-arrow-right"></i></span>
      </div>
      <div class="latestMusic">
        <div class="latestMusicList" v-for="(item,index) in newSongList" :key="index"  @click="musicPlayListDetail(item)">
          <div class="musicImg" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'contain'}">
            <div class="musicPlayBtn">
              <i class="el-icon-caret-right "></i>
            </div>
          </div>
          <div class="musicContent">
            <div class="top">
              <span :title="item.name">{{item.name}}</span>
              <span class="span" v-if="item.song.alias.length > 0" :title="`${(item.song.alias[0])}`">
              ({{item.song.alias[0]}})
              </span>
            </div>
            <div class="bottom">
              <div class="author">
              <span v-if="item.song.artists.length > 1">
                <span v-for="(val,valIndex) in item.song.artists" :key="valIndex" :title="val.name">
                  <span :title="`${val.name}/`"></span>{{val.name}}
                  <span v-if="valIndex < item.song.artists.length - 1">/</span>
                </span>
              </span>
                <span v-else>{{item.song.artists[0].name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--    最新音乐结束-->
      <!--    推荐MV 开始-->
      <div><span class="title">推荐MV <i class="el-icon-arrow-right"></i></span></div>
      <div class="MV">
        <div class="MVList"  v-for="(item,index) in mvList" :key="index"  @click="MVPlayListDetail(item.id)">
          <div class="MVImg" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'cover'}">
            <div class="copywriter">{{item.copywriter}}</div>
            <div class="btn">
              <i class="el-icon-caret-right "></i>{{item.playCount}}
            </div>
          </div>
          <div class="title" :title="item.name">{{item.name}}</div>
          <div class="name" :title="item.artistName">{{item.artistName}}</div>
        </div>
      </div>
      <!--    推荐MV 结束-->
      <!--    主播电台 开始-->
      <div><span class="title">主播电台 <i class="el-icon-arrow-right"></i></span></div>
      <div class="radio">
        <div class="radioList" v-for="(item,index) in radioList" :key="index"  @click="MVPlayListDetail(item.id)">
          <div class="bgImg" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'cover'}">
          </div>
          <div class="title" :title="item.name">{{item.name}}</div>
        </div>
      </div>
      <!--    主播电台 结束-->
      <div class="listen"></div>
      <div class="read"></div>
    </div>
  </div>
</template>

<script>
  import carousel from '../carousel';
  export default {
    name: "index",
    components: {
      carousel
    },
    data () {
      return {
        carouselType: 'card',
        carouselHeight: '230px',
        list: [], // 推荐歌单
        banners: [], // 轮播图信息
        soleList: [], // 独家放送信息
        newSongList: [], // 最新音乐
        mvList: [], // MV 信息
        radioList: [], // 主播电台信息
        playList: [] // 歌单详情
      };
    },
    mounted() {
      this.getListFn();
    },
    methods: {
      getListFn () {
        this.getList();
        this.getBanner();
        this.getSoleList();
        this.getNewSongList();
        this.getMvList();
        this.getRadioList();
      },
      songListFn () {
        this.$router.push(`/mainContent?type=music&val=second`);
      },
      /**
       * @Description
       * @author wangkangzhang
       * @date 2021/5/31
      */
      async getBanner () {
        const { data: data } = await this.$axios.get('/banner');
        if (data.code === 200) {
          this.banners = data.banners;
        }
      },
      /**
       * @Description 获取推荐歌单
       * @author wangkangzhang
       * @date 2021/5/31
      */
      async getList () {
        const { data } = await this.$axios.get('/personalized', {
          params: {
            // 获取的数据量
            limit: 10,
          },
        });
        if (data.code === 200) {
          this.list = data.result;
        }
      },
      // 获取每日推荐歌单
      async getRecommendResource () {
        const { data } = await this.$axios.get('/recommend/resource');
      },

      // 获取每日推荐歌曲
      async getRecommendSongs () {
        const { data } = await this.$axios.get('/recommend/songs');
      },
      /**
       * @Description 获取独家放送歌单
       * @author wangkangzhang
       * @date 2021/6/1
      */
      async getSoleList () {
        const { data } = await this.$axios.get('/personalized/privatecontent');
        if (data.code === 200) {
          this.soleList = data.result;
        }
      },
      /**
       * @Description 获取最新音乐
       * @author wangkangzhang
       * @date 2021/6/1
      */
      async getNewSongList () {
        const { data } = await this.$axios.get('/personalized/newsong', {
          params: {
            // 获取的数据量
            limit: 12,
          },
        });
        if (data.code === 200) {
          this.newSongList = data.result;
        }
      },
      /**
       * @Description 获取MV信息
       * @author wangkangzhang
       * @date 2021/6/1
      */
      async getMvList () {
        const { data } = await this.$axios.get('/personalized/mv');
        if (data.code === 200) {
          this.mvList = data.result;
        }
      },
      /**
       * @Description 获取主播电台信息
       * @author wangkangzhang
       * @date 2021/6/1
      */
      async getRadioList () {
        const { data } = await this.$axios.get('/personalized/djprogram');
        if (data.code === 200) {
          this.radioList = data.result;
        }
      },
      /**
       * @Description 推荐歌单详细信息
       * @author wangkangzhang
       * @date 2021/5/31
      */
      async playListDetail (id) {
        this.$router.push(`/playListDetail?id=${id}`);
      },
      /**
       * @Description 独家放送详细信息
       * @author wangkangzhang
       * @date 2021/6/1
      */
      soleListDetail (id) {},
      /**
       * @Description 最新音乐详细信息
       * @author wangkangzhang
       * @date 2021/6/1
      */
      musicPlayListDetail (item) {
        this.$store.dispatch('getSongUrlFn', item.id);
        this.$store.dispatch('getSongDetailFn', item.id);
      },
      /**
       * @Description 推荐详细信息
       * @author wangkangzhang
       * @date 2021/6/1
       */
      MVPlayListDetail (id) {}
    }
  }
</script>

<style lang="less" scoped>
  .recommend {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
  }
.container {
  width: 1200px;
  height: 100%;
  overflow-y: auto;
  .title {
    cursor:pointer;
    margin: 0 10px;
  }
  .carousel {
    margin: 0 10px;
  }
  .list {
    display: flex;
    flex-flow:wrap;
    width: 100%;
    .listOne {
      width: 218px;
      margin: 10px;
      .container {
        width: 218px;
        height: 218px;
        border-radius: 10px;
        position: relative;
        .top {
          margin: 5px;
          display: flex;
          font-size: 18px;
          .title {
          }
          .playCount {
            position: absolute;
            color: #ffffff;
            right: 5px;
          }
        }
        .playBtn {
          display: none;
          position: absolute;
          right: 10px;
          bottom: 10px;
          background-color: white;
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 15px;
          i {
            font-size: 18px;
            color: red;
          }
        }
        &:hover .playBtn {
          display: block;
        }
      }
    }
  }

  .sole {
    width: 100%;
    height: 250px;
    display: flex;
    flex-flow:wrap;
    margin: 10px 0;
    .soleList {
      width: 374px;
      margin: 0 10px;
      .soleListImg {
        width: 373px;
        height: 195px;
        border-radius: 10px;
        padding: 5px;
        background-repeat: no-repeat;
      }
      .soleListTitle {
        font-size: 16px;
        margin-top: 5px;
      }
      .solePlayBtn {
        width: 25px;
        height: 25px;
        line-height: 25px;
        border-radius: 15px;
        text-align: center;
        border: 1px solid #ffffff;
        color: #ffffff;
      }
    }
  }
  .latestMusic {
    width: 100%;
    flex-flow:wrap;
    display: flex;
    margin-bottom: 10px;
    .latestMusicList {
      height: 50px;
      width: 375px;
      display: flex;
      margin: 10px;
      .musicImg {
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        .musicPlayBtn {
          i {
            width: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 15px;
            background-color: #ffffff;
            opacity: 0.8;
            color: #ec4141;
          }
        }
      }
      .musicContent {
        width: 315px;
        height: 50px;
        .top {
          padding-left: 10px;
          width: 315px;
          height: 25px;
          font-size: 14px;
          overflow:hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow:ellipsis;
          .span {
            color: #9f9f9f;
          }
        }
        .bottom {
          padding-left: 10px;
          width: 305px;
          height: 25px;
          display: flex;
          .author {
            color: #9f9f9f;
            font-size: 14px;
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow:ellipsis;
          }
        }
      }
    }
  }
  .MV {
    width: 100%;
    display: flex;
    height: 230px;
    margin-top: 10px;
    .MVList {
      position: relative;
      width: 278px;
      height: 150px;
      margin: 10px;
      .MVImg {
        width: 100%;
        border-radius: 10px;
        height: 150px;
        font-size: 18px;
        .copywriter {
          background-color: #182d36;
          border-radius: 10px 10px 0 0;
          opacity: 0.5;
          color: #ffffff;
          padding: 5px;
          display: none;
        }
        &:hover .copywriter {
          display: block;
        }
        .btn {
          position: absolute;
          right: 10px;
          top: 5px;
          opacity: 0.5;
          color: #ffffff;
        }
        &:hover .btn {
          display: none;
        }
      }
      .title {
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow:ellipsis;
        margin: 5px 0 0 0 !important;

      }
      .name {
        color: #9f9f9f;
        font-size: 14px;
      }
    }
  }
  .radio {
    height: 250px;
    display: flex;
    flex-flow:wrap;
    .radioList {
      width: 180px;
      margin: 10px;
      .bgImg {
        height: 175px;
        width: 175px;
        border-radius: 10px;
      }
      .title {
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow:ellipsis;
        margin: 5px 0 0 0 !important;
      }
    }
  }
}
</style>
